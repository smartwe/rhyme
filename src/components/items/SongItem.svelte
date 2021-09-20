<script lang="ts">
  export let artistName: string;
  export let songName: string;
  export let imgSrc: string;
  export let normalSong = true;
  import { songs, songsPlayer, inAlbum, currentTheme } from "../../store";
  import { PlayCircleFilled, UnknownSong } from "rhyme-icons";
  import Item from "./Item.svelte";
</script>

{#if imgSrc}
  <Item
    firstTitle={songName}
    secondTitle={artistName}
    image={imgSrc}
    bgColor={!normalSong ? "#fff" : null}
  />
{:else}
  <Item
    firstTitle={songName}
    secondTitle={artistName}
    component={UnknownSong}
    bgColor={!normalSong ? "#fff" : null}
  />
{/if}
