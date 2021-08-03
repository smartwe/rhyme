<script lang="ts">
  export let artistName: string;
  export let songName: string;
  export let imgSrc: string;
  export let normalSong = true;
  import { songs, songsPlayer, inAlbum, currentTheme } from "../store";
  import { PlayCircleFilled, UnknownSong } from "rhyme-icons";
  const onClick = () => {
    $songsPlayer.songs = $songs;
    let index = $songsPlayer.songs.findIndex((song) => {
      if (
        song["song"] === songName &&
        song["artist"] === artistName &&
        song["imgSrc"] === imgSrc
      ) {
        return true;
      }
    });
    $songsPlayer.start(index);
    inAlbum.set(false);
  };
</script>

<main
  style="background-color: {normalSong
    ? 'var(--panels-color)'
    : 'var(--background-color'}"
  on:click={onClick}
>
  <img src={imgSrc} style="display:{imgSrc ? 'block' : 'none'}" alt="" />
  {#if !imgSrc}
    <UnknownSong
      size="100"
      firstFill={$currentTheme["textColor"]}
      secondFill={$currentTheme["panelsColor"]}
    />
  {/if}
  <div class="hover">
    <PlayCircleFilled fill={$currentTheme["accentColor"]} size="50" />
  </div>
  <div class="titles">
    <h4>{songName}</h4>
    <p>{artistName}</p>
  </div>
</main>

<style lang="scss">
  .hover {
    display: none;
    width: 100px;
    height: 100px;
    position: absolute;
    transform: translateY(-19%);
    background-color: #1212125c;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  main {
    display: flex;
    flex-shrink: 0;
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
      text-align: center;
    }
    p {
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      color: var(--titles-color);
      font-size: 1em;
    }
  }

  main:hover {
    .hover {
      display: flex;
    }
  }
</style>
