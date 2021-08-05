<script lang="ts">
  import {
    HomeFilled,
    HomeOutlined,
    AddPlaylist,
    SettingsFilled,
    SettingsOutlined,
    AlbumFilled,
    AlbumOutlined,
  } from "rhyme-icons";
  import { location as spaLocation } from "svelte-spa-router";
  import { currentTheme } from "../store";
  function navigateLink(event) {
    event.preventDefault();
    location.href = event.target.href;
  }
</script>

<main>
  <div class="main-links">
    <a
      href="#/"
      class:active={$spaLocation === "/"}
      on:click={(event) => {
        navigateLink(event);
      }}
    >
      {#if $spaLocation === "/"}
        <HomeFilled fill={$currentTheme["sidebarActiveColor"]} />
      {:else}
        <HomeOutlined fill={$currentTheme["textColor"]} />
      {/if}
      Home
    </a>

    <a
      href="#/albums"
      class:active={$spaLocation === "/albums"}
      on:click={(event) => {
        navigateLink(event);
      }}
    >
      {#if $spaLocation === "/albums"}
        <AlbumFilled fill={$currentTheme["sidebarActiveColor"]} />
      {:else}
        <AlbumOutlined fill={$currentTheme["textColor"]} />
      {/if}
      Albums
    </a>

    <a
      href="#/playlists"
      class:active={$spaLocation === "/playlists"}
      on:click={(event) => {
        navigateLink(event);
      }}
    >
      {#if $spaLocation === "/playlists"}
        <AddPlaylist fill={$currentTheme["sidebarActiveColor"]} />
      {:else}
        <AddPlaylist fill={$currentTheme["textColor"]} />
      {/if}
      Playlists
    </a>
  </div>
  <a
    href="#/settings"
    class:active={$spaLocation === "/settings"}
    on:click={(event) => {
      navigateLink(event);
    }}
  >
    {#if $spaLocation === "/settings"}
      <SettingsFilled fill={$currentTheme["sidebarActiveColor"]} />
    {:else}
      <SettingsOutlined fill={$currentTheme["textColor"]} />
    {/if}
    Settings
  </a>
</main>

<style lang="scss">
  main {
    overflow-x: visible;
    background-color: var(--panels-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 1.5em;
    flex-shrink: 0;
    min-width: 250px;
    transition: 0.3s;
    .main-links {
      display: flex;
      flex-direction: column;
      overflow-x: visible;
    }
    a.active {
      background-color: var(--accent-color);
      color: var(--sidebar-active-color);
    }
    a {
      display: flex;
      align-items: center;
      padding: 0.4em 0.5em;
      border-radius: 0.3em;
      gap: 5px;
      font-weight: 500;
      color: var(--text-color);
    }
  }
</style>
