<script lang="ts">
  export let artistName: string;
  export let songName: string;
  export let imgSrc: string;
  export let normalSong = true;
  import { settings } from "../store";
  let mainBG = $settings["useDarkTheme"] ? (normalSong ? "#121212" : "black") : normalSong ? "#ededed" : "white";
</script>

<main class:dark={$settings["useDarkTheme"]} style="background-color: {mainBG}">
  <!-- TODO: Use not found image here -->
  <img src={imgSrc} style="display:{imgSrc ? 'block' : 'none'}" alt="" />
  <div class="titles">
    <h4>{songName}</h4>
    <p>{artistName}</p>
  </div>
</main>

<style lang="scss">
  @import "../variables";
  main {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 140px;
    height: 180px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 7px;
    }
    h4,
    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100px;
      color: black;
      text-align: center;
    }
    p {
      color: $gray_theme_light;
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      font-size: 1em;
    }
  }
  .dark {
    h4 {
      color: white;
    }
    p {
      color: $light_gray_theme_dark;
    }
  }
</style>
