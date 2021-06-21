import { songs } from "../store";
export default class Player {
  currentSong: object = {};
  playlist: object[] = [];
  constructor(songs: object[]) {
    this.playlist = songs;
  }
}
