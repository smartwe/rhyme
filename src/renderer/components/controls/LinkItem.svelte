<script lang="ts">
  import { location as spaLocation } from 'svelte-spa-router';
  import { currentTheme } from '../../services/store';
  function navigateLink(event: any) {
    event.preventDefault();
    location.href = event.target.href;
  }
  export let icons: {
    active: any;
    default: any;
  };
  export let link = '';
  export let text = '';
</script>

<a
  href="#/{link}"
  class:active={$spaLocation === `/${link}`}
  on:click={(event) => {
    navigateLink(event);
  }}
>
  {#if $spaLocation === `/${link}`}
    <svelte:component this={icons.active} fill={$currentTheme.colors.sidebarActiveColor} />
  {:else}
    <svelte:component this={icons.default} fill={$currentTheme.colors.textColor} />
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
