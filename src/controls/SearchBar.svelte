<script lang="ts">
  export let placeholder = "Search";
  export let searchVal = "";
  import { Search } from "rhyme-icons";
  import { currentTheme } from "../store";
</script>

<main>
  <Search fill={$currentTheme["textColor"]} />
  <input type="text" {placeholder} spellcheck="false" bind:value={searchVal} />
</main>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    padding: 0.4em 0.7em;
    gap: 5px;
    background-color: var(--panels-color);
    border-radius: 0.5em;
    width: 100%;
    &:focus-within {
      input::placeholder {
        color: transparent;
      }
    }
  }
  input {
    border: none;
    background: none;
    color: var(--text-color);
    font-size: 1em;
    width: 100%;
    &::placeholder {
      color: var(--text-color);
    }
  }
</style>
