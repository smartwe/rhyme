<script lang="ts">
  import PathChooser from "../components/controls/PathChooser.svelte";
  import PopUpDialog from "../components/controls/PopUpDialog.svelte";
  import Toggle from "../components/controls/Toggle.svelte";
  import Store from "../components/store/Store.svelte";
  import { setWatcher } from "../lib/RhymeUtils";
  import {
    settings,
    songs,
    currentSong,
    recentlyPlayed,
    songsPlayer,
    themeManager,
    currentTheme,
  } from "../store";

  let folderPath = $settings["musicPath"];
  function changeMusicDir() {
    if (!folderPath || folderPath === "") return;
    songs.set([]);
    recentlyPlayed.set([]);
    $songsPlayer.songs = [];
    $songsPlayer.pause();
    currentSong.set(null);
    let newSettings = $settings;
    newSettings["musicPath"] = folderPath;
    settings.set(newSettings);
    setWatcher();
    setTimeout(() => {
      $songsPlayer.play(0);
    }, 1000);
  }
  let showNotifications: boolean = $settings["showNotifications"];
  function toggleShowNotifications() {
    showNotifications = !showNotifications;
    let newSettings = $settings;
    newSettings["showNotifications"] = showNotifications;
    settings.set(newSettings);
  }
  let minimizeToTray: boolean = $settings["minimizeToTray"];
  function toggleMinimizeToTray() {
    minimizeToTray = !minimizeToTray;
    let newSettings = $settings;
    newSettings["minimizeToTray"] = minimizeToTray;
    settings.set(newSettings);
  }

  let showThemesPopUp = false;
</script>

<main class="page">
  {#if showThemesPopUp}
    <PopUpDialog width="90%" height="90%" bind:show={showThemesPopUp}>
      <Store />
    </PopUpDialog>
  {/if}

  <h2>General</h2>
  <ul>
    <li>
      <span> Music folder path </span>
      <PathChooser
        bind:folderPath
        defaultPath={$settings["musicPath"]}
        title="Choose the folder containing your music"
        onEnd={changeMusicDir}
      />
    </li>
    <li>
      <span>
        Run in background <br />
        <p>If false the app will not run in the background when closed</p>
      </span>
      <Toggle bind:checked={minimizeToTray} clickEvent={toggleMinimizeToTray} />
    </li>
    <li>
      <span>Show notifications</span>
      <Toggle
        bind:checked={showNotifications}
        clickEvent={toggleShowNotifications}
      />
    </li>
  </ul>
  <br />
  <h2>Appeareance</h2>
  <ul>
    <li>
      <span>
        Open Community Themes
        <p>Preview and use themes made by the community.</p>
      </span>
      <button
        on:click={() => {
          showThemesPopUp = !showThemesPopUp;
        }}
      >
        See Community Themes
      </button>
    </li>
  </ul>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: var(--background-color);
    transition: 0.3s;
    * {
      flex-shrink: 0;
    }
  }
  button {
    background-color: var(--accent-color);
    padding: 0.8em 1.5em;
    color: var(--sidebar-active-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  ul {
    gap: 15px;
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    padding-left: 20px;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    height: auto;
    flex-shrink: 0;
    span {
      max-width: 60%;
    }
    span > p {
      font-size: 0.7em;
      color: var(--titles-color);
    }
  }
</style>
