<script>
  export let placeholder = "Search";
  export let searchVal = "";
  import { Search } from "rhyme-icons";
  import { settings } from "../store";
</script>

<main class:dark={$settings["useDarkTheme"]}>
  <Search fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
  <input type="text" {placeholder} spellcheck="false" bind:value={searchVal} />
</main>

<style lang="scss">
  @import "../variables";
  main {
    display: flex;
    align-items: center;
    padding: 0.4em 0.7em;
    gap: 5px;
    background-color: $light_gray_theme_light;
    border-radius: 0.5em;
    width: 100%;
    transition: 0.3s;
    &:focus-within {
      input::placeholder {
        color: transparent;
      }
    }
  }
  input {
    border: none;
    background: none;
    color: $gray_theme_light;
    font-size: 1em;
    width: 100%;
  }
  .dark {
    background-color: $gray_theme_dark;
    input {
      color: $light_gray_theme_dark;
      &::placeholder {
        color: $light_gray_theme_dark;
      }
    }
  }
</style>
