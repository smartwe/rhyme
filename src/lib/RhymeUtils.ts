const fs = require("fs");
const mm = require("music-metadata");
const path = require("path");
import { settings, watcher, songs, songsPlayer } from "../store";
const chokidar = require("chokidar");
const { get } = require("svelte/store");

export function songExists(song: object, array: object[]): boolean {
  return (
    array.filter((value) => {
      return value["file"] === song["file"];
    }).length > 0
  );
}

export function getMusicFilesFromPath(filePath: string, array?: string[]): string[] {
  let folderContent: string[] = array || [];
  fs.readdirSync(filePath).forEach((file: string) => {
    file = path.join(filePath, file);

    if (fs.statSync(file).isDirectory()) {
      folderContent = getMusicFilesFromPath(file, folderContent);
    } else {
      if (file.endsWith(".mp3") || file.endsWith(".m4a") || file.endsWith(".webm") || file.endsWith(".wav") || file.endsWith(".aac") || file.endsWith(".ogg") || file.endsWith(".opus")) {
        folderContent.push(file);
      }
    }
  });
  return folderContent;
}

export async function getAudioFileMetadata(audioFile: string): Promise<object> {
  const metadata = await mm.parseFile(audioFile, { skipCovers: false });
  let song = metadata.common.title ? metadata.common.title : audioFile.split(path.sep).slice(-1)[0];
  let artist = metadata.common.artist ? metadata.common.artist : "Unknown";
  let album = metadata.common.album ? metadata.common.album : "Unknown";
  let imgSrc = null;
  if (metadata.common.picture) {
    imgSrc = `data:${metadata.common.picture[0].format};base64,${metadata.common.picture[0].data.toString("base64")}`;
  }

  return {
    song,
    artist,
    album,
    imgSrc,
    file: audioFile,
  };
}

export function setWatcher() {
  watcher.set(
    chokidar.watch(get(settings)["musicPath"], {
      ignored: /[\/\\]\./,
      persistent: true,
    })
  );
  get(watcher)
    .on("add", async (path: string) => {
      if (path.endsWith(".mp3") || path.endsWith(".m4a") || path.endsWith(".webm") || path.endsWith(".wav") || path.endsWith(".aac") || path.endsWith(".ogg") || path.endsWith(".opus")) {
        let song = await getAudioFileMetadata(path);
        if (songExists(song, get(songs))) return;
        let newSongs = get(songs);
        newSongs.push(song);
        songs.set(newSongs);
      }
    })
    .on("unlink", (path: string) => {
      songs.set(
        get(songs).filter((song) => {
          return song["file"] !== path;
        })
      );
      get(songsPlayer).play(get(songsPlayer).index > get(songsPlayer).songs.length - 1 ? get(songsPlayer).songs.length - 1 : get(songsPlayer).index);
    });
}
