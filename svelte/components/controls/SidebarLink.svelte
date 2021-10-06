<script lang="ts">
  import { location as spaLocation } from "svelte-spa-router";
  import { currentTheme } from "../../store";

  function navigateLink(event) {
    event.preventDefault();
    location.href = event.target.href;
  }

  export let icons = {
    activeIcon: null,
    inactiveIcon: null,
  };
  export let link = "";
  export let text = "";
</script>

<a
  href="#/{link}"
  class:active={$spaLocation === `/${link}`}
  on:click={(event) => {
    navigateLink(event);
  }}
>
  {#if $spaLocation === `/${link}`}
    <svelte:component
      this={icons.activeIcon}
      fill={$currentTheme["sidebarActiveColor"]}
    />
  {:else}
    <svelte:component
      this={icons.inactiveIcon}
      fill={$currentTheme["textColor"]}
    />
  {/if}
  {text}
</a>

<style lang="scss">
  a {
    display: flex;
    align-items: center;
    padding: 0.4em 0.5em;
    border-radius: 0.3em;
    gap: 5px;
    font-weight: 500;
    color: var(--text-color);
    &.active {
      background-color: var(--accent-color);
      color: var(--sidebar-active-color);
    }
  }
</style>
