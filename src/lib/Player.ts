const { Howl } = require("howler");
const storage = require("electron-json-storage");
import { currentSong } from "../store";

export default class Player {
  index: number = 0;
  songs = [];
  currentSong = {
    song: "",
    artist: "",
    imgSrc: "",
  };

  constructor(songs: object[]) {
    this.songs = songs;
    this.play();
  }

  play(index?: number) {
    let self = this;

    index = index ? index : this.index;

    let data = this.songs[index];
    let sound = new Howl({
      src: [data.file],
      html5: true,
      onplay: function () {
        console.log("Started");
        console.log(this.duration() / 60);
        currentSong.set(data);
        console.log(data);
      },
      onend: function () {
        console.log("Ended");
        self.index += 1;
        self.play();
      },
    });

    sound.play();

    this.index = index;
  }

  pause() {
    var sound = this.songs[this.index].howl;

    sound.pause();
  }
}
