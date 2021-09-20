<script lang="ts">
  export let checked = false;
  export let clickEvent = () => {};
  import { currentTheme } from "../../store";
</script>

<main class:checked on:click={clickEvent} />

<style lang="scss">
  main {
    width: 50px;
    height: 23px;
    border-radius: 12px;
    position: relative;
    background-color: var(--panels-color);
    cursor: pointer;
  }
  main::before {
    transition: 0.4s;
    content: "";
    background-color: var(--text-color);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 3px;
    top: 3px;
  }
  main.checked {
    background-color: var(--accent-color);
  }
  main.checked::before {
    content: "";
    background-color: white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 30px;
    top: 3px;
  }
</style>
