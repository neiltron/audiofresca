<script lang="ts">
	import { onMount } from 'svelte';
  import { spriteDefinition, spriteData, howlerJSON } from '../audio_store';
	import ProgressBar from '$lib/components/progress_bar.svelte';
	import SegmentList from '$lib/components/segment_list.svelte';
	import DropZone from '$lib/components/drop_zone.svelte';

  const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.3/dist/esm'
  
  let ffmpeg: any = null;
  let ffmpegLoaded: boolean = false;

  let audioData: Uint8Array | null = null;
  let hasAudio: boolean = false;
  let audioFile: File | null = null;
  let oggFile: File | null = null;
  let audioSrc: string | null = null;

  let spriteFile: File | null = null;
  let totalDuration:number = 0;
  let audioElement: HTMLAudioElement | null = null;
  let audioTimeout: ReturnType<typeof setTimeout> | null = null;

  let processingProgress: number = 0;
  type ProcessingStep = 'IDLE' | 'LOADING' | 'PROCESSING' | 'CONCATENATING' | 'COMPLETE';
  let processingStep: ProcessingStep = 'IDLE';

  let processingSteps = {
    idle: 'IDLE',
    loading: 'LOADING',
    processing: 'PROCESSING',
    concatenating: 'CONCATENATING',
    complete: 'COMPLETE',
  } as const;
  
  onMount(async () => {
    console.log('loading ffmpeg')
    
    if (!ffmpegLoaded) {
      await loadFFmpeg();
    }

    ffmpegLoaded = true;
    console.log('loaded ffmpeg')
  });

  const loadFFmpeg = async () => {
    const { FFmpeg } = await import('@ffmpeg/ffmpeg');
    const { toBlobURL } = await import('@ffmpeg/util');

    ffmpeg = new FFmpeg();

    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'applicaiton/wasm'),
    });
  }

  const processFiles = async (files: FileList) => {
    console.log(files);
    processingStep = processingSteps.processing;

    const inputPaths = [];
    const fileReader = new FileReader();
    let data: Uint8Array | null = null;
    let file: File | null = null
    let durations: number[] = [];
    let completed = 0;

    const onComplete = async () => {
      completed += 1;
      processingProgress = completed / files.length * 100;

      if (completed === files.length) {
        await allComplete();

        processingStep = processingSteps.complete;

        setTimeout(() => {
          processingStep = processingSteps.idle;
        }, 1000);
      }
    }

    const allComplete = async () => {
      processingStep = processingSteps.concatenating;
      await ffmpeg.writeFile('concat_list.txt', inputPaths.join("\n"));
      await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'concat_list.txt', 'outputAll.mp3']);
      await ffmpeg.exec(['-i', 'outputAll.mp3', 'outputAll.ogg']);

      $spriteDefinition.resources.forEach((filename, i) => {
        $spriteDefinition.spritemap[filename] = {
          start: totalDuration,
          end: totalDuration + durations[i],
        };

        totalDuration += durations[i];
      });

      // console.log('audio data', $spriteDefinition)
      audioData = await ffmpeg.readFile('outputAll.mp3');
      audioFile = new File([audioData.buffer], 'audio.mp3', { type: 'audio/mpeg' });
      oggFile = new File([audioData.buffer], 'audio.ogg', { type: 'audio/ogg' });
      audioSrc = URL.createObjectURL(audioFile);
      hasAudio = true;
    }

    for (let i = 0; i < files.length; i += 1) {
      file = files[i];
      $spriteDefinition.resources.push(file.name);
      $spriteDefinition.spritemap[file.name] = { start: 0, end: 0 };
      data = new Uint8Array(await file.arrayBuffer());

      await ffmpeg.writeFile(file.name, data);
      inputPaths.push(`file 'item${i}.mp3'`);

      fileReader.onloadend = (e) => {
        console.log(typeof e.target.result, e.target.result)
        const audioContext = new AudioContext();
        // play e.target.result using web audio
        audioContext.decodeAudioData(e.target.result as ArrayBuffer, async (buffer) => {
          durations[i] = buffer.duration;
          console.log(i, durations[i], file.name)

          await ffmpeg.exec(['-i', $spriteDefinition.resources[i], '-af', `afade=in:st=0:d=0.01,afade=out:st=${durations[i] - .01}:d=0.01`, `item${i}.mp3`]);
          await ffmpeg.deleteFile($spriteDefinition.resources[i]);

          onComplete();
        });
      }

      await fileReader.readAsArrayBuffer(file);
    }
  };

  const downloadFiles = async () => {
    spriteFile = new File([$howlerJSON], 'sprite.json', { type: 'application/json' });
    
    [audioFile, oggFile, spriteFile].forEach(file => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      a.click();
      a.remove();
    });
  }

  const handleSpriteClick = (e) => {
    const { start, end } = e.detail.sprite;

    audioElement.currentTime = start;
    audioElement.play();

    if (audioTimeout) { clearTimeout(audioTimeout); }
    audioTimeout = setTimeout(() => {
      audioElement.pause();
    }, (end - start) * 1000);
  }
</script>

{#if !ffmpegLoaded}
  <p>Loading ffmpeg...</p>
{:else if processingStep !== processingSteps.idle}
  <p>{processingStep}</p>

  <ProgressBar progress={processingProgress} />
{:else if !hasAudio}
  <DropZone on:drop={e => processFiles(e.detail)}>
    <p>Drop audio files here</p>
  </DropZone>
{/if}

{#if $spriteDefinition.resources.length > 0}
  <div class='audio_container'>
    <audio controls src={audioSrc} bind:this={audioElement} />
    <button on:click={downloadFiles}>Download</button>
  </div>

  <SegmentList on:playSegment={handleSpriteClick} />
{/if}

<style lang="postcss">
  .audio_container {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
    .audio_container audio {
      flex: 1;
    }
</style>