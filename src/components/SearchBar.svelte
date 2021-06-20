<script>
  export let placeholder = "Search";
  export let searchVal = "";
  searchVal;
  import { Search } from "rhyme-icons";
</script>

<main>
  <Search fill="#5c5c5c" />
  <input type="text" {placeholder} spellcheck="false" bind:value={searchVal} />
</main>

<style lang="scss">
  @import "../variables";
  main {
    display: flex;
    align-items: center;
    padding: 0.4em 0.7em;
    gap: 5px;
    background-color: $light-gray;
    border-radius: 0.5em;
    width: 100%;
    transition: 0.3s;
    &:focus-within {
      box-shadow: #5c5c5c5c 0px 5px 15px;
      input::placeholder {
        color: transparent;
      }
    }
  }
  input {
    border: none;
    background: none;
    color: $gray;
    font-size: 1em;
    width: 100%;
  }
</style>
