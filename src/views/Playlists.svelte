<script>
  import { settings } from "../store";
</script>

<main class:dark={$settings["useDarkTheme"]}>
  <h1>Playlists</h1>
  <p>Coming Soon</p>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .dark {
    background: black;
    color: white;
  }
</style>
