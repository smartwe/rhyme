<script lang="ts">
  export let folderPath = "";
  export let title = "";
  export let defaultPath = "";
  export let onEnd = () => {};
  const { ipcRenderer } = require("electron");
  import { settings } from "../../store";
  async function openDialog() {
    folderPath = await ipcRenderer.invoke("show-dialog", {
      dialogType: "openDirectory",
      title,
      defaultPath,
    });
    onEnd();
  }
</script>

<main on:click={openDialog} class="ellipsis-text">
  {folderPath}
</main>

<style lang="scss">
  main {
    background-color: var(--panels-color);
    padding: 0.5em 1em;
    border-radius: 8px;
    max-width: 70%;
    cursor: pointer;
  }
</style>
