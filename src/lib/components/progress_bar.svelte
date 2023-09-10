<script lang="ts">
	import { onMount } from 'svelte';

  export let progress: number = 0;
</script>

<div class="progress_bar">
  <div style="width: {progress}%;"></div>
</div>

<style>
.progress_bar {
  width: 100%;
  height: .2rem;
  background-color: #eee;
  border-radius: 0.1rem;
  overflow: hidden;
  margin-bottom: 1rem;
}
  .progress_bar div {
    width: 0%;
    height: 100%;
    background-color: #000;
    border-radius: 0.1rem;
    transition: width 1s ease-in-out;
  }
</style>