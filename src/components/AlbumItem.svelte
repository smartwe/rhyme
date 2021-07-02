<script lang="ts">
  export let album = {};
  export let key;
  import { settings } from "../store";
  import { UnknownAlbum } from "rhyme-icons";
  import { push } from "svelte-spa-router";
  const onClick = () => {
    push(`/album-view?id=${key}`);
  };
</script>

<main class:dark={$settings["useDarkTheme"]} on:click={onClick}>
  {#if album["songs"].length === 1}
    <img src={album["songs"][0]["imgSrc"]} alt="" />
  {:else}
    <UnknownAlbum size="100" firstFill={$settings["useDarkTheme"] ? "#ededed" : "#121212"} secondFill={$settings["useDarkTheme"] ? "#5c5c5c" : "#d2d2d2"} />
  {/if}
  <div class="titles">
    <h4>{album["name"]}</h4>
    <p>{album["songs"].length} {album["songs"].length === 1 ? "Song" : "Songs"}</p>
  </div>
</main>

<style lang="scss">
  @import "../variables";
  main {
    display: flex;
    background-color: $light_gray_theme_light;
    flex-direction: column;
    border-radius: 8px;
    width: 140px;
    height: 180px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 6px;
    position: relative;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 7px;
    }
    h4,
    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100px;
      color: black;
      text-align: center;
    }
    p {
      color: $gray_theme_light;
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      font-size: 1em;
    }
  }

  .dark {
    background-color: $gray_theme_dark;
    h4 {
      color: white;
    }
    p {
      color: $light_gray_theme_dark;
    }
  }
</style>
