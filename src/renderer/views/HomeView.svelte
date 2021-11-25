<script lang="ts">
  import { songs } from '@/managers/songs-manager';
  import Scrollable from '../components/controls/Scrollable.svelte';
  import SongItem from '../components/items/SongItem.svelte';
  import RecentlyPlayed from '../components/widgets/RecentlyPlayed.svelte';
</script>

<Scrollable>
  <main class="page">
    <RecentlyPlayed />
    <div class="songs">
      {#each $songs as song}
        <SongItem {song} />
      {/each}
    </div>
  </main>
</Scrollable>

<style lang="scss">
  .songs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: space-between;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 25px;
  }
</style>
