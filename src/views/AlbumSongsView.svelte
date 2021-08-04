<script lang="ts">
  import { querystring } from "svelte-spa-router";
  import {
    currentTheme,
    currentSong,
    albumsList,
    songsPlayer,
    inAlbum,
  } from "../store";
  import { UnknownAlbum } from "rhyme-icons";
  let artists: string = "";
  let album = $albumsList[$querystring.replace("id=", "")];
  for (let i = 0; i < album["songs"].length; i++) {
    const song = album["songs"][i];
    if (!artists.includes(song["artist"])) {
      artists += `${i === 0 ? "" : " "}${song["artist"]},`;
    }
  }
  artists = artists.substr(0, artists.length - 1);
  import { onMount } from "svelte";
  import Scrollbar from "smooth-scrollbar";
  onMount(() => {
    Scrollbar.initAll();
  });
  $songsPlayer.songs = album["songs"];
  songsPlayer.set($songsPlayer);
  $songsPlayer.play(0);
  inAlbum.set(true);
</script>

<main data-scrollbar>
  <div class="album-info">
    <div class="cover">
      {#if album["songs"].length === 1}
        <img src={album["songs"][0]["imgSrc"]} alt="" />
      {:else}
        <UnknownAlbum
          size="150"
          firstFill={$currentTheme["textColor"]}
          secondFill={$currentTheme["panelsColor"]}
        />
      {/if}
    </div>
    <div class="titles">
      <span class="ellipsis-text">{album["name"]}</span>
      <p class="ellipsis-text">By {artists}</p>
      <p class="ellipsis-text">
        {album["songs"].length}
        {album["songs"].length > 1 ? "Songs" : "Song"}
      </p>
    </div>
  </div>
  <div class="songs-list">
    {#each album["songs"] as song, key}
      <div
        class="list-item"
        class:active={$currentSong["song"] === song["song"] &&
          $currentSong["artist"] === song["artist"]}
        on:click={() => {
          $songsPlayer.play(key);
        }}
      >
        <div class="info">
          <p>{(key += 1)}</p>
          <p class="ellipsis-text">{song["song"]}</p>
        </div>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  .songs-list {
    margin-top: 35px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 35px;
  }
  main {
    padding: 1em;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    img {
      object-fit: cover;
      width: 150px;
      height: 150px;
      border-radius: 7px;
    }
    .album-info {
      display: flex;
      align-items: center;
      gap: 25px;
      * {
        flex-shrink: 0;
      }
    }
    .titles {
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      * {
        max-width: 90%;
      }
      span {
        color: var(--titles-color);
        font-size: 2em;
      }
      p {
        font-size: 0.9em;
      }
    }
  }
  .list-item {
    display: flex;
    padding: 0.5em 1em;
    border-radius: 7px;
    cursor: pointer;
    .info {
      display: flex;
      gap: 25px;
    }
    &.active {
      background-color: var(--panels-color);
      color: var(--accent-color);
    }
  }
</style>
