<script lang="ts">
  import AlbumItem from "../components/AlbumItem.svelte";
  import { settings, songs, albumsList } from "../store";
  import SearchBar from "../controls/SearchBar.svelte";
  let albums: object[] = [];
  let searchVal = "";

  function albumExists(song): boolean {
    let exists = false;
    albums.forEach((album) => {
      if (album["name"] == song["album"]) {
        exists = true;
      }
    });
    return exists;
  }

  songs.subscribe((value) => {
    albums = [];
    for (let i = 0; i < value.length; i++) {
      const song = value[i];

      if (albumExists(song)) {
        for (let i = 0; i < albums.length; i++) {
          const element = albums[i];
          if (song["album"] === element["name"]) {
            element["songs"].push(song);
            albums[i] = element;
            break;
          }
        }
        continue;
      }

      albums.push({
        name: song["album"],
        songs: [song],
      });
    }
    albums = albums;
    albumsList.set(albums);
  });
  import { onMount } from "svelte";
  import Scrollbar from "smooth-scrollbar";
  onMount(() => {
    Scrollbar.initAll({
      damping: 0.03,
    });
  });
</script>

<main id="albums" class:dark={$settings["useDarkTheme"]} data-scrollbar>
  <SearchBar bind:searchVal />
  <div class="albums">
    {#if $songs}
      {#each albums as album, key}
        {#if searchVal !== ""}
          {#if album["name"].toLowerCase().includes(searchVal.toLowerCase())}
            <AlbumItem {album} {key} />
          {/if}
        {:else}
          <AlbumItem {album} {key} />
        {/if}
      {/each}
    {/if}
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
  .albums {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 140px);
    justify-content: space-between;
    row-gap: 20px;
    column-gap: 10px;
    margin-bottom: 50px;
  }
  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
  }
</style>
