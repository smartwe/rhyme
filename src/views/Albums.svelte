<script lang="ts">
  import AlbumItem from "../components/AlbumItem.svelte";
  import { songs, albumsList } from "../store";
  import SearchBar from "../controls/SearchBar.svelte";
  $: albums = $albumsList;
  let searchVal = "";

  import { onMount } from "svelte";
  import Scrollbar from "smooth-scrollbar";
  onMount(() => {
    Scrollbar.initAll();
  });
</script>

<main id="albums" data-scrollbar>
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
  main {
    padding: 1em;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
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
</style>
