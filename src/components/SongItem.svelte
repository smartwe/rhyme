<script lang="ts">
  export let artistName: string;
  export let songName: string;
  export let imgSrc: string;
  export let normalSong = true;
  import { settings, songsPlayer } from "../store";
  import { PlayCircleFilled } from "rhyme-icons";
  let mainBG = $settings["useDarkTheme"]
    ? normalSong
      ? "#121212"
      : "black"
    : normalSong
    ? "#ededed"
    : "white";
  const onClick = () => {
    let index = $songsPlayer.songs.findIndex((song) => {
      console.log(song);
      if (
        song["song"] === songName &&
        song["artist"] === artistName &&
        song["imgSrc"] === imgSrc
      ) {
        return true;
      }
    });
    $songsPlayer.start(index);
  };
</script>

<main
  class:dark={$settings["useDarkTheme"]}
  style="background-color: {mainBG}"
  on:click={onClick}
>
  <!-- TODO: Use not found image here -->
  <img src={imgSrc} style="display:{imgSrc ? 'block' : 'none'}" alt="" />
  <div class="hover">
    <PlayCircleFilled fill="#ef005f" size="50" />
  </div>
  <div class="titles">
    <h4>{songName}</h4>
    <p>{artistName}</p>
  </div>
</main>

<style lang="scss">
  @import "../variables";
  .hover {
    display: none;
    width: 100px;
    height: 100px;
    position: absolute;
    transform: translateY(-22%);
    background-color: #1212125c;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  main {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 140px;
    height: 180px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 6px;
    position: relative;
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

  main:hover {
    .hover {
      display: flex;
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
