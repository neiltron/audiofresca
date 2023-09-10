<script lang="ts">
  import { createEventDispatcher } from "svelte";
  
  let inputFile: FileList | null = null;
  let isOver: boolean = false;

  const dispatch = createEventDispatcher();

  function handleFileDrop(event) {
    console.log(event);
    const files = event.target.files;
    dispatch('drop', inputFile);
  }
</script>

<div
  class="dropzone"
  class:over={isOver}
  on:dragover|preventDefault={e => isOver = true}
  on:dragleave|preventDefault={e => isOver = false}
  role="button"
  tabindex="0"
>
  <input type="file" multiple accept="audio/*" bind:files={inputFile} on:change={handleFileDrop} />
</div>

<style>
  .dropzone {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #eee;
    border: 2px dashed #ccc;
    border-radius: 0.5rem;
    padding: 1rem 0;
    margin-bottom: 1rem;
  }

  .dropzone:before {
    content: 'Drop files here';
  }

  .dropzone.over {
    border-color: #000;
    background-color: #ded;
  }
  
  .dropzone.over:before {
    content: 'Drop!';
  }

  .dropzone input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>