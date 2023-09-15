import { writable } from "svelte/store";

const BASE_URL = 'https://unpkg.com/@ffmpeg/core@0.12.3/dist/esm'
const logVerbose = false;
const logProgress = false;

export let ffmpeg: any = null;
export const ffmpegLoaded = writable<boolean>(false);
export const loadFFmpeg = async () => {
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { toBlobURL } = await import('@ffmpeg/util');

  ffmpeg = new FFmpeg();

  if (logVerbose) {
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
  }

  if (logProgress) {
    ffmpeg.on("progress", (message) => {
      console.log(message);
    });
  }

  await ffmpeg.load({
    coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'applicaiton/wasm'),
  });

  ffmpegLoaded.set(true);
}