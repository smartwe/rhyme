<script lang="ts">
  import PathChooser from "../controls/PathChooser.svelte";
  import Toggle from "../controls/Toggle.svelte";
  import { settings, themeManager, currentTheme } from "../store";

  const storage = require("electron-json-storage");

  let useDarkTheme = $settings["useDarkTheme"];
  function changeTheme(event) {
    currentTheme.set(
      $themeManager["installedThemes"].filter((value: object) => {
        return event.target.value === value["id"];
      })[0]
    );
  }
  let folderPath = $settings["musicPath"];
  function changeMusicDir() {
    let newSettings = $settings;
    newSettings["musicPath"] = folderPath;
    settings.set(newSettings);
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
</script>

<main class:dark={useDarkTheme}>
  <h2>General</h2>
  <ul>
    <li>
      <span>
        Music folder path
        <br />
        <p>You will need to restart the app to view changes</p>
      </span>
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
      <span> Show notifications </span>
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
      <span>Prefer dark theme</span>
      <select
        on:change={(event) => {
          changeTheme(event);
        }}
      >
        {#each $themeManager["installedThemes"] as theme}
          <option value={theme["id"]}>{theme["name"]}</option>
        {/each}
      </select>
    </li>
  </ul>
</main>

<style lang="scss">
  @import "../variables";
  main {
    * {
      flex-shrink: 0;
    }
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 15px;
    width: 100%;
    height: 100%;
    color: $gray_theme_light;
    background-color: white;
    transition: 0.3s;
  }
  select {
    border: none;
    padding: 0.5em;
    option {
      border: none;
      padding: 0.5em;
    }
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
      color: black;
      margin-top: 10px;
    }
  }

  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
    span > p {
      color: white;
    }
  }
</style>
