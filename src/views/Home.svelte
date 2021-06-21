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

<style lang="scss">
  @import "../variables";
  main {
    padding: 1em;
    width: 100%;
    height: 100%;
    color: $gray_theme_light;
    background-color: white;
  }
  .songs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: space-between;
    row-gap: 20px;
    column-gap: 10px;
    margin-top: 25px;
  }
  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
  }
</style>
