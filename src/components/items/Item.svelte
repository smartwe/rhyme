<script lang="ts">
  import { currentTheme } from "../../store";

  export let image: string = null;
  export let component = null;
  export let firstTitle: string;
  export let secondTitle: string;
  export let bgColor: string = null;
  export let onClick = () => {};
</script>

<main on:click={onClick} style={bgColor ? "background-color:" + bgColor : ""}>
  {#if image}
    <img src={image} alt="" />
  {:else}
    <svelte:component this={component} size="100" firstFill={$currentTheme["textColor"]} secondFill={$currentTheme["panelsColor"]} />
  {/if}
  <div class="titles">
    <h4 class="ellipsis-text">{firstTitle}</h4>
    <p class="ellipsis-text">{secondTitle}</p>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    background-color: var(--panels-color);
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 8px;
    width: 140px;
    height: 180px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 6px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 7px;
    }
    h4,
    p {
      max-width: 100px;
      text-align: center;
    }
    p {
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      color: var(--titles-color);
      font-size: 1em;
    }
  }
</style>
