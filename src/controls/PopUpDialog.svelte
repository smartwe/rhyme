<script>
  export let width = "70%";
  export let height = "70%";
</script>

<main>
  <div style="height: {height}; width: {width};">
    <slot />
  </div>
</main>

<style>
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
    box-shadow: var(--text-color) 0 0 20px -5px;
  }
</style>
