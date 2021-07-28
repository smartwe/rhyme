<script lang="ts">
  import { settings, songsPlayer } from "../store";
  export let fullSize = 0;
  export let currentSize = 0;
  export let height = "7px";
  export let width = "100%";
  export let isSeekBar = false;
  function onClick(event: any) {
    if (event.target.firstChild) {
      currentSize =
        ((event.x - event.target.firstChild.offsetLeft) /
          event.target.clientWidth) *
        fullSize;
      if (isSeekBar) {
        $songsPlayer.sound.seek(currentSize);
      }
      return;
    }
    currentSize =
      ((event.x - event.target.offsetLeft) /
        event.target.parentNode.clientWidth) *
      fullSize;
    if (isSeekBar) {
      $songsPlayer.sound.seek(currentSize);
    }
  }

  let mouseDown = false;
</script>

<main
  style="height: {height}; width: {width}"
  on:click={onClick}
  class:dark={$settings["useDarkTheme"]}
  on:mousemove={(event) => {
    if (mouseDown) {
      onClick(event);
    }
  }}
  on:mouseup={() => {
    mouseDown = false;
  }}
  on:mouseleave={() => {
    mouseDown = false;
  }}
  on:mousedown={() => {
    mouseDown = true;
  }}
>
  <div style="width: {(currentSize / fullSize) * 100}%; height: 100%;" />
</main>

<style lang="scss">
  div {
    background-color: var(--accent-color);
    transition: 0.16s;
  }

  main {
    border-radius: 20px;
    background-color: lightgray;
    cursor: pointer;
  }
</style>
