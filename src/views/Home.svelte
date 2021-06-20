<script>
  import SearchBar from "../controls/SearchBar.svelte";
  import SongItem from "../components/SongItem.svelte";
  let searchVal = "";
  import { songs, settings } from "../store";
</script>

<main id="home" class:dark={$settings["useDarkTheme"]}>
  <SearchBar bind:searchVal />
  <div class="songs">
    {#each $songs as song}
      <SongItem artistName={song["artist"]} songName={song["song"]} imgSrc={song["imgSrc"]} />
    {/each}
  </div>
</main>

<style>
  main {
    padding: 1em;
    width: 100%;
    height: 100%;
  }
  .songs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: space-between;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 25px;
  }
  main.dark {
    background-color: black;
  }
</style>
