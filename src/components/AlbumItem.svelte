<script lang="ts">
  export let album = {};
  export let key;
  import { currentTheme } from "../store";
  import { UnknownAlbum } from "rhyme-icons";
  import { push } from "svelte-spa-router";
  const onClick = () => {
    push(`/album-view?id=${key}`);
  };
</script>

<main on:click={onClick}>
  {#if album["songs"].length === 1}
    <img src={album["songs"][0]["imgSrc"]} alt="" />
  {:else}
    <UnknownAlbum
      size="100"
      firstFill={$currentTheme["textColor"]}
      secondFill={$currentTheme["panelsColor"]}
    />
  {/if}
  <div class="titles">
    <h4>{album["name"]}</h4>
    <p>
      {album["songs"].length}
      {album["songs"].length === 1 ? "Song" : "Songs"}
    </p>
  </div>
</main>

<style lang="scss">
  main {
    display: flex;
    background-color: var(--panels-color);
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
      text-align: center;
    }
    p {
      font-size: 0.8em;
    }
    h4 {
      font-weight: normal;
      color: var(--titles-color);
      font-size: 1em;
    }
  }
</style>
