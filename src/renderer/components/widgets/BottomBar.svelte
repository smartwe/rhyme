<script>
  import playingManager, { playerIndex } from '@/managers/playing-manager';
  import { songs } from '@/managers/songs-manager';
  import { isPaused } from '@/renderer/services/store';

  // import { SkipPrevious, SkipNext, PlayCircleFilled } from 'rhyme-icons';

  $: currentSong = $songs[$playerIndex];
</script>

{#if $playerIndex >= 0}
  <main>
    <div class="song-info">
      {#if currentSong.image}
        <img src={currentSong.image} alt="" />
      {/if}
      <div class="info">
        <h4 class="ellipsis-text song-name">{currentSong.name}</h4>
        <p class="ellipsis-text song-artist">by {currentSong.artist}</p>
      </div>
    </div>

    <div class="controls" />
  </main>
{/if}

<style lang="scss">
  main {
    height: 75px;
    z-index: 2;
    display: flex;
    box-shadow: 0px -15px 30px -10px var(--text-color);
  }

  img {
    width: 75px;
    height: 75px;
    object-fit: cover;
  }

  .song-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .info {
    max-width: 170px;
  }

  .song-name {
    color: var(--title-color);
    font-size: 17px;
    font-weight: 400;
  }
</style>
