<script lang="ts">
  import AlbumItem from "../components/AlbumItem.svelte";
  import { settings, songs, albumsList } from "../store";
  import SearchBar from "../controls/SearchBar.svelte";
  $: albums = $albumsList;
  let searchVal = "";

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
