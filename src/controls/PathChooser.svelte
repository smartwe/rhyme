<script lang="ts">
  export let folderPath = "";
  export let title = "";
  export let defaultPath = "";
  export let onEnd = () => {};
  const remote = require("electron").remote;
  import { settings } from "../store";
  function openDialog() {
    remote.dialog
      .showOpenDialog(remote.getCurrentWindow(), {
        properties: ["openDirectory"],
        title,
        defaultPath,
      })
      .then((data) => {
        if (data["filePaths"][0]) {
          folderPath = data["filePaths"][0];
          onEnd();
        }
      });
  }
</script>

<main class:dark={$settings["useDarkTheme"]} on:click={openDialog}>
  {folderPath}
</main>

<style lang="scss">
  @import "../variables";
  main {
    background-color: $light_gray_theme_light;
    padding: 0.5em 1em;
    border-radius: 8px;
    max-width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  .dark {
    background-color: $gray_theme_dark;
  }
</style>
