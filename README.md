# audiofresca

An in-browser app to convert audio files into audio spritesheets. Currently supports howlerjs JSON format but can easily be adapter for other formats.

Inspired by [audiosprite](https://github.com/tonistiigi/audiosprite) with an intention of using ffmpeg.wasm and web APIs.

## Usage


```bash
npm install
npm run dev
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

# TODO
- [] Allow for adding files in multiple drag inputs
- [] Allow for config options like gaps between audio, etc.
- [] Add more export types
- [] Allow editing/removing samples and re-encoding
- [] Allow import via spritesheet and combined audio file