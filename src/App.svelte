<script lang="ts">
  import Sidebar from "./components/Sidebar.svelte";
  import Router from "svelte-spa-router";
  // Routes
  import Home from "./views/Home.svelte";
  import RhymeAI from "./views/RhymeAI.svelte";
  import Playlists from "./views/Playlists.svelte";
  import Settings from "./views/Settings.svelte";
  import Albums from "./views/Albums.svelte";
  import AlbumSongsView from "./views/AlbumSongsView.svelte";
  const routes = {
    "/": Home,
    "/rhyme-ai": RhymeAI,
    "/settings": Settings,
    "/playlists": Playlists,
    "/albums": Albums,
    "/album-view": AlbumSongsView,
  };

  const fs = require("fs");
  const path = require("path");
  const mm = require("music-metadata");
  const chokidar = require("chokidar");

  let dirWatcher = chokidar.watch($settings["musicPath"], {
    ignored: /[\/\\]\./,
    persistent: true,
  });

  import { settings, songs, songsPlayer } from "./store";
  import BottomBar from "./components/BottomBar.svelte";
  import Player from "./lib/Player";

  function getFolderContent(filePath: string, array?: string[]): string[] {
    let folderContent: string[] = array || [];
    fs.readdirSync(filePath).forEach((file: string) => {
      file = path.join(filePath, file);

      if (fs.statSync(file).isDirectory()) {
        folderContent = getFolderContent(file, folderContent);
      } else {
        if (file.endsWith(".mp3") || file.endsWith(".m4a") || file.endsWith(".webm") || file.endsWith(".wav") || file.endsWith(".aac") || file.endsWith(".ogg") || file.endsWith(".opus")) {
          folderContent.push(file);
        }
      }
    });
    return folderContent;
  }

  async function parseFiles(audioFiles: string[]) {
    for (const audioFile of audioFiles) {
      const metadata = await mm.parseFile(audioFile, { skipCovers: false });
      let song = metadata.common.title ? metadata.common.title : audioFile.split(path.sep).slice(-1)[0];
      let artist = metadata.common.artist ? metadata.common.artist : "Unknown";
      let album = metadata.common.album ? metadata.common.album : "Unknown";
      let imgSrc = null;
      if (metadata.common.picture) {
        imgSrc = `data:${metadata.common.picture[0].format};base64,${metadata.common.picture[0].data.toString("base64")}`;
      }
      $songs.push({
        song,
        artist,
        album,
        imgSrc,
        file: audioFile,
      });
      songs.set($songs);
    }
  }

  async function getSongs() {
    let files = getFolderContent($settings["musicPath"] as string);
    await parseFiles(files);
    songsPlayer.set(new Player($songs));
  }
  getSongs();
</script>

<main>
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
  }
  .main_content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
