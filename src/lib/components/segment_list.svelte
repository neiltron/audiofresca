<script type="ts">
  import { createEventDispatcher } from 'svelte';
  import { spriteDefinition } from '../../audio_store';
  
  const dispatch = createEventDispatcher();
  
  function playSegment(sprite) {
      dispatch('playSegment', { sprite });
  }
</script>

<ul>
  {#each Object.entries($spriteDefinition.spritemap) as [filename, sprite]}
    <li>
      <span title='{filename}'>{filename}</span>
      <span title='{sprite.start.toString()}'>{Math.floor(sprite.start * 10000) / 10000}</span>
      <span title='{sprite.end.toString()}'>{Math.floor(sprite.end * 10000) / 10000}</span>
      <span>
        <button
          on:click={() => playSegment(sprite)}
          on:keydown={() => playSegment(sprite)}
        >
          Play
        </button>
      </span>
    </li>
  {/each}
</ul>

<style>
ul {
  padding: 0;
  margin: 0;
}
  ul li {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

    ul li span {
      min-width: 10rem;
      text-align: right;
    }
    
    ul li span:first-child {
      flex: 1;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
</style>