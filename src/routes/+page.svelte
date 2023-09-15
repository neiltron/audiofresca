<script lang="ts">
	import { onMount } from 'svelte';
	import { spriteDefinition, howlerJSON } from '../lib/stores/audio';
	import { loadFFmpeg, ffmpegLoaded } from '$lib/stores/ffmpeg';
	import {
		audioFile,
		oggFile,
		hasAudio,
		audioSrc,
		ProcessingStep,
		processingStep,
		processingProgress,
		processFiles
	} from '$lib/stores/process';

	import ProgressBar from '$lib/components/progress_bar.svelte';
	import SegmentList from '$lib/components/segment_list.svelte';
	import DropZone from '$lib/components/drop_zone.svelte';

	let audioElement: HTMLAudioElement | null = null;
	let audioTimeout: ReturnType<typeof setTimeout> | null = null;
	let spriteFile: File | null = null;

	onMount(async () => {
		if (!$ffmpegLoaded) {
			await loadFFmpeg();
		}
	});

	const downloadFiles = async () => {
		spriteFile = new File([$howlerJSON], 'sprite.json', { type: 'application/json' });

		[audioFile, oggFile, spriteFile].forEach((file) => {
      console.log(file);
			const a = document.createElement('a');
			a.href = URL.createObjectURL(file);
			a.download = file.name;
			a.click();
			a.remove();
		});
	};

	const handleSpriteClick = (e) => {
		const { start, end } = e.detail.sprite;

		audioElement.currentTime = start;
		audioElement.play();

		if (audioTimeout) {
			clearTimeout(audioTimeout);
		}
		audioTimeout = setTimeout(() => {
			audioElement.pause();
		}, (end - start) * 1000);
	};
</script>

{#if !ffmpegLoaded}
	<p>Loading ffmpeg...</p>
{:else if $processingStep !== ProcessingStep.Idle}
	<p>{$processingStep}</p>

	<ProgressBar progress={$processingProgress} />
{:else if !hasAudio}
	<DropZone on:drop={(e) => processFiles(e.detail)}>
		<p>Drop audio files here</p>
	</DropZone>
{/if}

{#if $spriteDefinition.resources.length > 0}
	<div class="audio_container">
		<audio controls src={$audioSrc} bind:this={audioElement} />
		<button on:click={downloadFiles}>Download</button>
	</div>

	<SegmentList on:playSegment={handleSpriteClick} />
{/if}

<style>
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
