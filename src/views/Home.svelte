<script>
  import SearchBar from "../controls/SearchBar.svelte";
  import SongItem from "../components/SongItem.svelte";
  let searchVal = "";
  import { songs, settings, recentlyPlayed } from "../store";
</script>

<main id="home" class:dark={$settings["useDarkTheme"]}>
  <SearchBar bind:searchVal />
  {#if $recentlyPlayed}
    <h2 style="margin-top:15px;font-weight:500">Recently Played</h2>
    <div class="recentlyPlayed">
      {#each $recentlyPlayed as song}
        <SongItem
          artistName={song["artist"]}
          songName={song["song"]}
          imgSrc={song["imgSrc"]}
          normalSong={false}
        />
      {/each}
    </div>
  {/if}
  <div class="songs">
    {#each $songs as song}
      {#if searchVal !== ""}
        {#if song["artist"].includes(searchVal) || song["song"].includes(searchVal)}
          <SongItem
            artistName={song["artist"]}
            songName={song["song"]}
            imgSrc={song["imgSrc"]}
          />
        {/if}
      {:else}
        <SongItem
          artistName={song["artist"]}
          songName={song["song"]}
          imgSrc={song["imgSrc"]}
        />
      {/if}
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

  .recentlyPlayed {
    background-color: $light_gray_theme_light;
    display: flex;
    height: 220px;
    border-radius: 10px;
    margin-top: 15px;
    gap: 10px;
    padding: 0.8em;
    &::-webkit-scrollbar-thumb {
      border: 6px solid transparent;
    }
    &::-webkit-scrollbar {
      width: 30px;
    }
  }
  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
    .recentlyPlayed {
      background-color: $gray_theme_dark;
    }
  }
</style>
