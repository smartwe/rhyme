<script>
  import {
    HomeFilled,
    HomeOutlined,
    MusicNoteOutlined,
    MusicNoteFilled,
    AddPlaylist,
    SettingsFilled,
    SettingsOutlined,
  } from "rhyme-icons";
  import { location } from "svelte-spa-router";
</script>

<main>
  <div class="main-links">
    <a href="#/" class:active={$location === "/"}>
      {#if $location === "/"}
        <HomeFilled fill="white" />
      {:else}
        <HomeOutlined fill="#5c5c5c" />
      {/if}
      Home
    </a>

    <a href="#/playlists" class:active={$location === "/playlists"}>
      {#if $location === "/playlists"}
        <AddPlaylist fill="white" />
      {:else}
        <AddPlaylist fill="#5c5c5c" />
      {/if}
      Playlists
    </a>

    <a href="#/rhyme-ai" class:active={$location === "/rhyme-ai"}>
      {#if $location === "/rhyme-ai"}
        <MusicNoteFilled fill="white" />
      {:else}
        <MusicNoteOutlined fill="#5c5c5c" />
      {/if}
      Rhyme AI
    </a>
  </div>
  <a href="#/settings" class:active={$location === "/settings"}>
    {#if $location === "/settings"}
      <SettingsFilled fill="white" />
    {:else}
      <SettingsOutlined fill="#5c5c5c" />
    {/if}
    Settings
  </a>
</main>

<style lang="scss">
  @import "../variables";
  main {
    background: $light_gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 1.5em;
    width: 300px;
    min-width: 200px;
    .main-links {
      display: flex;
      flex-direction: column;
    }
    a.active {
      background-color: $pink;
      color: white;
    }
    a {
      color: $gray;
      display: flex;
      align-items: center;
      padding: 0.5em;
      border-radius: 0.3em;
      gap: 5px;
    }
  }
</style>
