<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import BottomBar from "./components/BottomBar.svelte";

  import Router from "svelte-spa-router";
  // Routes
  import Home from "./views/Home.svelte";
  import Playlists from "./views/Playlists.svelte";
  import Settings from "./views/Settings.svelte";
  import Albums from "./views/Albums.svelte";
  import AlbumSongsView from "./views/AlbumSongsView.svelte";

  const routes = {
    "/": Home,
    "/settings": Settings,
    "/playlists": Playlists,
    "/albums": Albums,
    "/album-view": AlbumSongsView,
  };

  import { currentTheme, songsPlayer, settings, songs } from "./store";
  import { getAudioFileMetadata, getMusicFilesFromPath, songExists, setWatcher } from "./lib/RhymeUtils";
  import Player from "./lib/Player";
  let files = getMusicFilesFromPath($settings["musicPath"]);

  async function getSongs() {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      let song = await getAudioFileMetadata(file);
      if (songExists(song, $songs)) {
        continue;
      }
      $songs.push(song);
      songs.set($songs);
    }
    songsPlayer.set(new Player($songs));
    setWatcher();
  }
  getSongs();
</script>

<main
  style="
  --accent-color: {$currentTheme['accentColor']};
  --background-color: {$currentTheme['backgroundColor']};
  --panels-color: {$currentTheme['panelsColor']};
  --text-color: {$currentTheme['textColor']};
  --titles-color: {$currentTheme['titleColor']};
  --sidebar-active-color: {$currentTheme['sidebarActiveColor']};"
>
  <Sidebar />
  <div class="main_content">
    <Router {routes} />
    <BottomBar />
  </div>
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    color: var(--text-color);
  }
  .main_content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
