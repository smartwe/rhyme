<script lang="ts">
  import { songsPlayer, settings, currentSong } from "../store";
</script>

<main class:dark={$settings["useDarkTheme"]}>
  {#if $currentSong}
    <div class="song-info">
      <img src={$currentSong["imgSrc"]} style="display:{$currentSong['imgSrc'] ? 'block' : 'none'}" alt="" />
      <div class="titles">
        <span><p>{$currentSong["song"]}</p></span>
        <p>{$currentSong["artist"]}</p>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
  @import "../variables";
  $height: 70px;
  main {
    min-height: $height;
    display: flex;
    box-shadow: #5c5c5c5c 1px -15px 15px;
    z-index: 10;
    background-color: white;
    .song-info {
      display: flex;
      align-items: center;
      gap: 15px;
      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 150px;
      }
      p {
        color: #818181;
        font-size: 0.8em;
      }
      span > p {
        font-size: 0.9em;
        color: black;
      }
    }
    img {
      max-width: $height;
      max-height: $height;
      min-width: $height;
      min-height: $height;
      object-fit: cover;
    }
  }
  .dark {
    background-color: $gray_theme_dark;
    .song-info > .titles > span > p {
      color: white;
    }
  }
</style>
