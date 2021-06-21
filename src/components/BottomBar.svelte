<script lang="ts">
  import { songsPlayer, songs, settings } from "../store";
  import Player from "../lib/Player";

  songsPlayer.set(new Player($songs));

  songs.subscribe((value) => {
    $songsPlayer.playlist = value;
  });
</script>

<main />

<style>
  /* your styles go here */
</style>
