<script>
  import {
    HomeFilled,
    HomeOutlined,
    MusicNoteOutlined,
    MusicNoteFilled,
    AddPlaylist,
    SettingsFilled,
    SettingsOutlined,
    AlbumFilled,
    AlbumOutlined,
  } from "rhyme-icons";
  import { location } from "svelte-spa-router";
  import { settings } from "../store";
</script>

<main class:dark={$settings["useDarkTheme"]}>
  <div class="main-links">
    <a href="#/" class:active={$location === "/"}>
      {#if $location === "/"}
        <HomeFilled fill="white" />
      {:else}
        <HomeOutlined
          fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"}
        />
      {/if}
      Home
    </a>

    <a href="#/albums" class:active={$location === "/albums"}>
      {#if $location === "/albums"}
        <AlbumFilled fill="white" />
      {:else}
        <AlbumOutlined
          fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"}
        />
      {/if}
      Albums
    </a>

    <a href="#/playlists" class:active={$location === "/playlists"}>
      {#if $location === "/playlists"}
        <AddPlaylist fill="white" />
      {:else}
        <AddPlaylist fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"} />
      {/if}
      Playlists
    </a>

    <a href="#/rhyme-ai" class:active={$location === "/rhyme-ai"}>
      {#if $location === "/rhyme-ai"}
        <MusicNoteFilled fill="white" />
      {:else}
        <MusicNoteOutlined
          fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"}
        />
      {/if}
      Rhyme AI
    </a>
  </div>
  <a href="#/settings" class:active={$location === "/settings"}>
    {#if $location === "/settings"}
      <SettingsFilled fill="white" />
    {:else}
      <SettingsOutlined
        fill={$settings["useDarkTheme"] ? "#d2d2d2" : "#5c5c5c"}
      />
    {/if}
    Settings
  </a>
</main>

<style lang="scss">
  @import "../variables";
  main {
    overflow-x: visible;
    background: $light_gray_theme_light;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 1.5em;
    width: 300px;
    min-width: 200px;
    transition: 0.3s;
    .main-links {
      display: flex;
      flex-direction: column;
      overflow-x: visible;
    }
    a.active {
      background-color: $pink;
      color: white;
    }
    a {
      color: $gray_theme_light;
      display: flex;
      align-items: center;
      padding: 0.4em 0.5em;
      border-radius: 0.3em;
      gap: 5px;
      font-weight: 500;
    }
  }

  .dark {
    background-color: $gray_theme_dark;
    a {
      color: $light_gray_theme_dark;
    }
  }
</style>
