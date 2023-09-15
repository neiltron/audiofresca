import { get, writable } from "svelte/store";
import { ffmpeg } from "./ffmpeg";
import { spriteDefinition } from './audio';

export let hasAudio: boolean = false;
export let audioFile: File | null = null;
export let oggFile: File | null = null;
export let audioSrc = writable<string | null>(null);

let audioData: Uint8Array | null = null;
let totalDuration:number = 0;
let durations: number[] = [];
let data: Uint8Array | null = null;
let completed = 0;

export enum ProcessingStep {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Processing = 'PROCESSING',
  Concatenating = 'CONCATENATING',
  Complete = 'COMPLETE',
}

export const processingStep = writable<ProcessingStep>(ProcessingStep.Idle);
export const processingProgress = writable<number>(0)
export const processFiles = async (files: FileList) => {
  console.log(files);
  processingStep.set(ProcessingStep.Processing);

  const filePromises = getFilePromises(files);
  const inputPaths = await Promise.all(filePromises);
  processingStep.set(ProcessingStep.Concatenating);

  await ffmpeg.writeFile('concat_list.txt', inputPaths.join("\n"));
  await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'concat_list.txt', 'outputAll.mp3']);
  writeDurations();

  // TODO use ffmpeg to export filetypes that File API cannot handle

  // store data for display/export
  audioData = await ffmpeg.readFile('outputAll.mp3');
  audioFile = new File([audioData.buffer], 'audio.mp3', { type: 'audio/mpeg' });
  oggFile = new File([audioData.buffer], 'audio.ogg', { type: 'audio/ogg' });
  audioSrc.set(URL.createObjectURL(audioFile));
  hasAudio = true;

  processingStep.set(ProcessingStep.Complete);

  // when in doubt
  // actually just for dramatic effect because our progress bar is too fast
  setTimeout(() => {
    processingStep.set(ProcessingStep.Idle);
  }, 1000);
};

const writeDurations = () => {
  let spriteDef = get(spriteDefinition);
  console.log('spritedef', spriteDef);

  spriteDef.resources.forEach((filename, i) => {
    console.log('what', filename);

    spriteDef.spritemap[filename] = {
      start: totalDuration,
      end: totalDuration + durations[i],
    };

    totalDuration += durations[i];
  });
  
  spriteDefinition.set(spriteDef);
};

const getFilePromises = (files: FileList) => {
  const spriteDef = get(spriteDefinition);
  const audioContext = new AudioContext();

  return Array.from(files).map(async (file, i) => {
    let fileReader = new FileReader();

    return new Promise<string>(async (resolve, reject) => {
      spriteDef.resources.push(file.name);
      spriteDef.spritemap[file.name] = { start: 0, end: 0 };

      // store our initial file in ffmpegs file system
      data = new Uint8Array(await file.arrayBuffer());
      await ffmpeg.writeFile(file.name, data);

      fileReader.onloadend = async (e) => {
        // use webaudio buffer to get duration
        const audioBuffer = await audioContext.decodeAudioData(e.target.result as ArrayBuffer);
        durations[i] = audioBuffer.duration;

        // write file to disk with fade in/out and then delete original
        await ffmpeg.exec(['-i', spriteDef.resources[i], '-af', `afade=in:st=0:d=0.01,afade=out:st=${durations[i] - .01}:d=0.01`, `item${i}.mp3`]);
        await ffmpeg.deleteFile(spriteDef.resources[i]);
    
        // increment progress
        processingProgress.set(++completed / files.length * 100);

        // resolve with filename for the concat list
        resolve(`file 'item${i}.mp3'`);
      };

      fileReader.readAsArrayBuffer(file);
    });
  });
};