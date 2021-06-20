<script lang="ts">
  import Toggle from "../controls/Toggle.svelte";
  import { settings } from "../store";

  const storage = require("electron-json-storage");

  let useDarkTheme = $settings["useDarkTheme"];
  function toggleTheme() {
    useDarkTheme = !useDarkTheme;
    let newSettings = $settings;
    newSettings["useDarkTheme"] = useDarkTheme;
    settings.set(newSettings);
    storage.set("settings", newSettings, (error: string) => {
      if (error) throw error;
    });
  }
</script>

<main class:dark={useDarkTheme}>
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
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 15px;
    width: 100%;
    height: 100%;
    color: $gray_theme_light;
  }

  li {
    display: flex;
    justify-content: space-between;
  }

  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
  }
</style>
