<script type="ts">
  import { currentTheme } from '@/renderer/services/store';
  import { Song } from '@/share/interfaces';
  import { UnknownSong } from 'rhyme-icons';

  export let song: Song;
  export let isARecentlyPlayed = false;
</script>

<main style={isARecentlyPlayed ? 'background-color:var(--background-color)' : ''}>
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
</style>
