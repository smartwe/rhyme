<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import { settings, albumsList } from "../store";
  let album = $albumsList[$querystring.replace("id=", "")];
</script>

<main class:dark={$settings["useDarkTheme"]}>
  {album["name"]}
</main>

<style lang="scss">
  @import "../variables";
  main {
    padding: 1em;
    width: 100%;
    height: 100%;
    color: $gray_theme_light;
    background-color: white;
  }
  .dark {
    background-color: black;
    color: $light_gray_theme_dark;
  }
</style>
