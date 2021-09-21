<script lang="ts">
  export let album = {};
  export let key;
  import { UnknownAlbum } from "rhyme-icons";
  import Item from "./Item.svelte";
  import { push } from "svelte-spa-router";
  function onClick() {
    push(`/album-view?id=${key}`);
  }
</script>

{#if album["songs"].length === 1}
  <Item firstTitle={album["name"]} secondTitle={album["songs"].length + " Song" + (album["songs"].length > 1 ? "s" : "")} image={album["songs"][0].imgSrc} {onClick} />
{:else}
  <Item firstTitle={album["name"]} secondTitle={album["songs"].length + " Song" + (album["songs"].length > 1 ? "s" : "")} component={UnknownAlbum} {onClick} />
{/if}
