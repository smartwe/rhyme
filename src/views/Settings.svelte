<script lang="ts">
  import PathChooser from "../controls/PathChooser.svelte";
  import Toggle from "../controls/Toggle.svelte";
  import { settings } from "../store";

  const storage = require("electron-json-storage");

  let useDarkTheme = $settings["useDarkTheme"];
  function toggleTheme() {
    useDarkTheme = !useDarkTheme;
    let newSettings = $settings;
    newSettings["useDarkTheme"] = useDarkTheme;
    settings.set(newSettings);
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
      <Toggle bind:checked={useDarkTheme} clickEvent={toggleTheme} />
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
    span > p {
      font-size: 0.7em;
      color: black;
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
