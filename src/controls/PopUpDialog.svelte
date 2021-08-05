<script lang="ts">
  export let width = "70%";
  export let height = "70%";
  export let show = true;
</script>

<main
  on:click={() => {
    show = false;
  }}
>
  <div
    style="--height: {height}; --width: {width};"
    on:click={(event) => {
      event.cancelBubble = true;
    }}
  >
    <slot />
  </div>
</main>

<style>
  @keyframes popup {
    0% {
      width: calc(var(--width) / 2);
      height: calc(var(--height) / 2);
    }
    100% {
      width: var(--width);
      height: var(--height);
    }
  }
  main {
    backdrop-filter: blur(10px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    background-color: var(--background-color);
    border-radius: 15px;
    box-shadow: var(--text-color) 0 0 15px -5px;
    animation: popup 0.5s forwards 0.2s;
  }
</style>
