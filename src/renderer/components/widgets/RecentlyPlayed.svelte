<script>
  import { songs } from '@/managers/songs-manager';
  import Scrollable from '../controls/Scrollable.svelte';
  import SongItem from '../items/SongItem.svelte';
  let i = 0;
  $: songy = $songs.filter((v) => {
    return i < 10;
  });
</script>

<h2>Recently Played</h2>
<main>
  <Scrollable>
    <div class="songs">
      {#each $songs as song}
        <SongItem {song} isARecentlyPlayed={true} />
      {/each}
    </div>
  </Scrollable>
</main>

<style lang="scss">
  h2 {
    font-weight: 500;
  }
  .songs {
    height: 220px;
    width: max-content;
    align-items: center;
    gap: 10px;
    display: flex;
    padding: 0.8em;
  }

  main {
    border-radius: 10px;
    background-color: var(--panels-color);
    margin-top: 10px;
  }
</style>
