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
<Scrollable>
  <main>
    {#each $songs as song, key}
      {#if key < 15}
        <SongItem {song} isARecentlyPlayed={true} />
      {/if}
    {/each}
  </main>
</Scrollable>

<style lang="scss">
  h2 {
    font-weight: 500;
  }
  main {
    margin-top: 10px;
    height: 220px;
    border-radius: 10px;
    width: max-content;
    min-width: 100%;
    padding: 0.8em;
    background-color: var(--panels-color);
    align-items: center;
    gap: 10px;
    display: flex;
  }
</style>
