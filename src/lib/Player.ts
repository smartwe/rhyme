const { Howl,Howler } = require("howler");
const storage = require("electron-json-storage");
import { currentSong,songPlaying } from "../store";

export default class Player {
  index: number = 0;
  songs = [];
  sound:typeof Howl;

  constructor(songs: object[]) {
    this.songs = songs;
    this.play();
  }

  play(index?: number) {
    let self = this;

    index = index || this.index;

    let data = this.songs[index];
    if(this.sound){
      this.sound.pause();
    }
    this.sound = new Howl({
      src: [data.file],
      html5: true,
      onplay: function () {
        currentSong.set(data);
        songPlaying.set(true);
      },
      onend: function () {
        this.next();
      },
    });

    this.sound.play();

    this.index = index;
  }

  pause() {
    this.sound.pause();
    songPlaying.set(false);
  }

  resume(){
    this.sound.play();
    songPlaying.set(true);
  }

  previous(){
    if(this.sound){
      if(this.sound.seek() >= 3){
        this.play();
        return;
      }

      if(this.index > 0){
        this.index--;
      }
      this.play();
    }
  }

  next(){
    if(this.index === this.songs.length - 1){
      this.index = 0;
      this.play();
      return;
    }
    this.index++;
    this.play();
  }
}
