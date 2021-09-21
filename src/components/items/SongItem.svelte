<script lang="ts">
  export let artistName: string;
  export let songName: string;
  export let imgSrc: string;
  export let normalSong = true;
  export let file: string;
  import {
    songs,
    songsPlayer,
    inAlbum,
    currentTheme,
    currentSong,
  } from "../../store";
  import { PlayCircleFilled, UnknownSong } from "rhyme-icons";
  import Item from "./Item.svelte";
  const isSongPlaying = $currentSong && $currentSong["file"] === file;
  function onClick() {
    $songsPlayer.play(
      $songs.findIndex((song) => {
        return song["file"] === file;
      })
    );
  }
</script>

<main>
  <div class="floating hover">
    <PlayCircleFilled size="48" fill={$currentTheme["accentColor"]} />
  </div>
  {#if imgSrc}
    <Item
      firstTitle={songName}
      secondTitle={artistName}
      image={imgSrc}
      bgColor={!normalSong ? $currentTheme["backgroundColor"] : null}
      {onClick}
    />
  {:else}
    <Item
      firstTitle={songName}
      secondTitle={artistName}
      component={UnknownSong}
      bgColor={!normalSong ? $currentTheme["backgroundColor"] : null}
      {onClick}
    />
  {/if}
</main>

<style lang="scss">
  main {
    flex-shrink: 0;
    position: relative;
    &:hover {
      .hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  .floating {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 20px;
    left: 20px;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s;
    background-color: #7f7f7fa5;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
