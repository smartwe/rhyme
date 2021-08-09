<script lang="ts">
  export let label = "Text Input";
</script>

<main>
  <input type="text" name="input" spellcheck="false" placeholder=" " />
  <label for="input">{label}</label>
</main>

<style lang="scss">
  main {
    background-color: var(--panels-color);
    margin-top: 1.4em;
    position: relative;
    overflow: visible;
    border-radius: 0.5em;
    border: solid 1px transparent;
    transition: 0.5s;
    label {
      content: var(--label-text);
      position: absolute;
      height: 100%;
      width: calc(100% - 0.7em);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0.7em;
      pointer-events: none;
      display: flex;
      align-items: center;
      transition: transform 0.5s;
    }
    &:focus-within {
      border-color: var(--accent-color);
      label {
        transform: translateY(-100%);
      }
    }
  }

  input {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1em;
    width: 100%;
    padding: 0.4em 0.7em;
    &:not(:placeholder-shown) + label {
      transform: translateY(-100%);
    }
  }
</style>
