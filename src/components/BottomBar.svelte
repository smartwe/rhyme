<script lang="ts">
  import { songsPlayer, inAlbum, currentTheme, currentSong, songPlaying, shuffle, repeat, volume } from "../store";
  import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext, Repeat, Shuffle, VolumeOff, VolumeUp } from "rhyme-icons";
  import SeekBar from "../controls/SeekBar.svelte";

  let currentTime = "";
  let duration = "";

  let barSize = {};

  songsPlayer.subscribe((val) => {
    if (val) {
      $songsPlayer.on("seek", () => {
        let songDuration = $songsPlayer.sound.duration();
        let seek = $songsPlayer.sound.seek();
        barSize["size"] = songDuration;
        barSize["current"] = seek;
        duration = $songsPlayer.formatTime(songDuration);
        currentTime = $songsPlayer.formatTime(seek);
      });
    }
  });

  document.body.addEventListener("keydown", keyDown);

  function keyDown(event) {
    if (document.activeElement instanceof HTMLInputElement) {
      return;
    }
    event.preventDefault();
    switch (event.key) {
      case "ArrowRight":
        $songsPlayer.sound.seek($songsPlayer.sound.seek() + 5);
        break;
      case "ArrowLeft":
        let seekedValue = $songsPlayer.sound.seek();
        $songsPlayer.sound.seek(seekedValue >= 5 ? seekedValue - 5 : 0);
        break;
      case "ArrowUp":
        if ($volume !== 100) {
          $volume += 1;
        }
        break;
      case "ArrowDown":
        if ($volume !== 0) {
          $volume -= 1;
        }
        break;
      case " ":
        if ($songPlaying) {
          $songsPlayer.pause();
        } else {
          $songsPlayer.resume();
        }
        break;
      case "Home":
        if ($songsPlayer.sound.seek() <= 5) {
          $songsPlayer.previous();
        } else {
          $songsPlayer.sound.seek(0);
        }
        break;
      case "End":
        $songsPlayer.next();
        break;
    }
  }
</script>

{#if $currentSong}
  <main>
    <div class="song-info">
      <img src={$currentSong["imgSrc"]} style="display:{$currentSong['imgSrc'] ? 'block' : 'none'}" alt="" />
      <div class="titles">
        <span><p>{$currentSong["song"]}</p></span>
        <p>
          by {$currentSong["artist"]}
          {$inAlbum ? "on " + $currentSong["album"] : ""}
        </p>
      </div>
    </div>
    <div class="controls-seekbar">
      <div class="controls">
        <div class="buttons">
          <div
            on:click={() => {
              shuffle.set(!$shuffle);
            }}
          >
            <Shuffle fill={$shuffle ? $currentTheme["accentColor"] : $currentTheme["textColor"]} />
          </div>
          <div
            on:click={() => {
              $songsPlayer.previous();
            }}
          >
            <SkipPrevious size="28" fill={$currentTheme["textColor"]} />
          </div>
          <div class="play-pause">
            {#if !$songPlaying}
              <div
                on:click={() => {
                  $songsPlayer.resume();
                }}
              >
                <PlayCircleFilled size="36" fill={$currentTheme["textColor"]} />
              </div>
            {:else}
              <div
                on:click={() => {
                  $songsPlayer.pause();
                }}
              >
                <PauseCircleFilled size="36" fill={$currentTheme["textColor"]} />
              </div>
            {/if}
          </div>
          <div
            on:click={() => {
              $songsPlayer.next();
            }}
          >
            <SkipNext size="28" fill={$currentTheme["textColor"]} />
          </div>
          <div
            on:click={() => {
              repeat.set(!$repeat);
            }}
          >
            <Repeat fill={$repeat ? $currentTheme["accentColor"] : $currentTheme["textColor"]} />
          </div>
        </div>
        <div class="volume">
          {#if $volume === 0}
            <div
              on:click={() => {
                volume.set(100);
              }}
            >
              <VolumeOff fill={$currentTheme["textColor"]} />
            </div>
          {:else}
            <div
              on:click={() => {
                volume.set(0);
              }}
            >
              <VolumeUp fill={$currentTheme["textColor"]} />
            </div>
          {/if}
          <SeekBar width="100px" height="5px" bind:currentSize={$volume} fullSize={100} />
          {$volume}
        </div>
      </div>
      <div class="seekbar">
        <p style="color:{$currentTheme['accentColor']};padding:0;margin:0;min-width:max-content;">{currentTime}</p>
        <SeekBar bind:fullSize={barSize["size"]} bind:currentSize={barSize["current"]} isSeekBar={true} />
        {duration}
      </div>
    </div>
  </main>
{/if}

<style lang="scss">
  $height: 70px;
  main {
    min-height: $height;
    display: flex;
    box-shadow: #5c5c5c5c 1px -15px 15px;
    z-index: 10;
    background-color: white;
    transition: 0.3s;
    align-items: center;
    background-color: var(--background-color);

    .controls {
      display: flex;
      align-items: center;
      * {
        display: flex;
      }

      .buttons {
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 15px;
        div {
          cursor: pointer;
        }
      }
    }
    .controls-seekbar {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      .seekbar {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0px 15px;
        font-size: 0.8em;
      }
      .volume {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.8em;
        padding-right: 15px;
      }
    }

    .song-info {
      display: flex;
      align-items: center;
      overflow-x: visible;

      .titles {
        padding-left: 15px;
      }

      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #818181;
        font-size: 0.8em;
        width: 120px;
        flex-shrink: 0;
        flex-grow: 0;
      }
      span > p {
        font-size: 0.9em;
        color: var(--titles-color);
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
</style>
