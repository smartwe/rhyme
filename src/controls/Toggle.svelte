<script lang="ts">
  export let checked = false;
  export let clickEvent = () => {};
  import { settings } from "../store";
</script>

<main
  class:checked
  on:click={clickEvent}
  class:dark={$settings["useDarkTheme"]}
/>

<style lang="scss">
  @import "../variables";
  main {
    width: 50px;
    height: 23px;
    border-radius: 12px;
    position: relative;
    background-color: $light_gray_theme_light;
    cursor: pointer;
  }
  main::before {
    transition: 0.4s;
    content: "";
    background-color: $gray_theme_light;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 3px;
    top: 3px;
  }
  main.dark {
    background-color: $light_gray_theme_dark;
  }
  main.dark::before {
    background-color: $gray_theme_dark;
  }
  main.checked {
    background-color: $pink;
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
