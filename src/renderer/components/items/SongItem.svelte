<script type="ts">
  import { currentTheme } from '@/renderer/services/store';
  import { Song } from '@/share/interfaces';
  import { UnknownSong } from 'rhyme-icons';

  export let song: Song;
  export let isARecentlyPlayed = false;

  // Tool Tip
  import { createPopperActions } from 'svelte-popperjs';
  const [popperRef, popperContent] = createPopperActions();
  const popperOptions = {
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  };

  let showTooltip = false;
</script>

<main
  style={isARecentlyPlayed ? 'background-color:var(--background-color)' : ''}
  use:popperRef
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}
>
  <div class="art">
    {#if song.image}
      <img src={song.image} alt="" />
    {:else}
      <UnknownSong
        backgroundColor={isARecentlyPlayed ? $currentTheme.colors.panelsColor : $currentTheme.colors.backgroundColor}
        iconColor={$currentTheme.colors.textColor}
      />
    {/if}
  </div>
  <div class="info">
    <h4 class="ellipsis-text">{song.name}</h4>
    <p class="ellipsis-text">{song.artist}</p>
  </div>
  <!-- ToolTip -->
  {#if showTooltip && !isARecentlyPlayed}
    <div id="tooltip" use:popperContent={popperOptions}>
      <p>{song.name}</p>
      <p>{song.artist}</p>
    </div>
  {/if}
</main>

<style type="scss">
  main {
    display: flex;
    background-color: var(--panels-color);
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 8px;
    width: 140px;
    height: 180px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 6px;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 7px;
    }
    h4,
    p {
      max-width: 100px;
      text-align: center;
    }
    p {
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      color: var(--titles-color);
      font-size: 1em;
    }
  }

  #tooltip {
    background-color: var(--panels-color);
    padding: 0.5em;
    border-radius: 0.5em;
    box-shadow: 0px 0px 10px 1px var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    animation: fade 0.7s;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
