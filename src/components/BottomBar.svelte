<script lang="ts">
  import { songsPlayer, settings, currentSong, songPlaying, shuffle, repeat } from "../store";
  import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext, Repeat, Shuffle } from "rhyme-icons";
</script>

{#if $currentSong}
  <main class:dark={$settings["useDarkTheme"]}>
    <div class="song-info">
      <img src={$currentSong["imgSrc"]} style="display:{$currentSong['imgSrc'] ? 'block' : 'none'}" alt="" />
      <div class="titles">
        <span><p>{$currentSong["song"]}</p></span>
        <p>{$currentSong["artist"]}</p>
      </div>
    </div>
    <div class="controls-seekbar">
      <div class="controls">
        <div
          on:click={() => {
            shuffle.set(!$shuffle);
          }}
        >
          <Shuffle fill={$shuffle ? "#ef005f" : $settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
        </div>
        <div
          on:click={() => {
            $songsPlayer.previous();
          }}
        >
          <SkipPrevious size="28" fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
        </div>
        <div class="play-pause">
          {#if !$songPlaying}
            <div
              on:click={() => {
                $songsPlayer.resume();
              }}
            >
              <PlayCircleFilled size="36" fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
            </div>
          {:else}
            <div
              on:click={() => {
                $songsPlayer.pause();
              }}
            >
              <PauseCircleFilled size="36" fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
            </div>
          {/if}
        </div>
        <div
          on:click={() => {
            $songsPlayer.next();
          }}
        >
          <SkipNext size="28" fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
        </div>
        <div
          on:click={() => {
            repeat.set(!$repeat);
          }}
        >
          <Repeat fill={$repeat ? "#ef005f" : $settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
        </div>
      </div>
      <div class="seekbar" />
    </div>
  </main>
{/if}

<style lang="scss">
  @import "../variables";
  $height: 70px;
  main {
    min-height: $height;
    display: flex;
    box-shadow: #5c5c5c5c 1px -15px 15px;
    z-index: 10;
    background-color: white;
    transition: 0.3s;
    align-items: center;

    .controls {
      display: flex;
      align-items: center;
      gap: 10px;
      * {
        display: flex;
      }
    }
    .controls-seekbar {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .song-info {
      display: flex;
      align-items: center;
      gap: 15px;
      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 150px;
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
