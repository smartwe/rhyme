<script lang="ts">
  import { themeManager } from "../../store";
  import ThemeItem from "./ThemeItem.svelte";

  let link = "/";
  function navigate(event) {
    event.preventDefault();
    link = event.target.href;
  }
  import Scrollbar from "smooth-scrollbar";
  import { onMount } from "svelte";
  onMount(() => {
    Scrollbar.initAll();
  });
</script>

<main>
  <div class="sidebar">
    <h1>Store</h1>
    <a href="/" on:click={navigate} class:active={link === "/"}>Installed</a>
  </div>
  <div class="main">
    {#if link === "/"}
      <div class="installed" data-scrollbar>
        <div class="content">
          {#each $themeManager["installedThemes"] as theme}
            <ThemeItem {theme} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;
    background: var(--background-color);
    display: flex;
  }
  .main {
    width: 100%;
    height: 100%;
    padding: 1em;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
    }
  }
  .sidebar {
    background-color: var(--panels-color);
    height: 100%;
    min-width: 200px;
    padding: 1em 1.5em;
    display: flex;
    flex-direction: column;
    h1 {
      text-align: center;
      font-weight: 300;
      color: var(--accent-color);
      margin-bottom: 30px;
    }
    a {
      padding: 0.5em 1em;
      border-radius: 0.3em;
      font-weight: 500;
      color: var(--text-color);
      &.active {
        background-color: var(--accent-color);
        color: var(--sidebar-active-color);
      }
    }
  }
  .installed {
    .content {
      display: grid;
      grid-template-columns: repeat(auto-fill, 140px);
      justify-content: space-between;
      row-gap: 20px;
      column-gap: 10px;
      margin-top: 25px;
      margin-bottom: 50px;
    }
  }
</style>
