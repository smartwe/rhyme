const { Howl } = require("howler");
const storage = require("electron-json-storage");
import {
  currentSong,
  songPlaying,
  repeat,
  shuffle,
  inAlbum,
  volume,
  settings,
  recentlyPlayed,
} from "../store";
import { get } from "svelte/store";
const Events = require("events");
const ipcRenderer = require("electron").ipcRenderer;
export default class Player extends Events {
  index: number = 0;
  songs = [];
  sound: typeof Howl;
  randomArr: number[];
  randomNum = 0;

  constructor(songs: object[]) {
    super();
    this.songs = songs;
    this.play();
    this.randomArr = this.randomize(
      Array.from({ length: this.songs.length }, (_, i) => i)
    );
    ipcRenderer.on("play/pause", () => {
      if (get(songPlaying)) {
        this.pause();
      } else {
        this.resume();
      }
    });
    ipcRenderer.on("next", () => {
      this.next();
    });
    ipcRenderer.on("previous", () => {
      this.previous();
    });
  }

  play(index?: number) {
    if (get(shuffle) && index !== this.index - 1) {
      let randomizedNum = () => {
        this.randomNum += 1;
        if (this.randomNum >= this.randomArr.length) {
          this.randomNum = 0;
        }
        index = this.randomArr[this.randomNum];
        if (
          this.containsObject(this.songs[index], get(recentlyPlayed)) &&
          this.songs.length >= 13
        ) {
          randomizedNum();
        }
      };
      randomizedNum();
    }
    this.start(index);
  }

  containsObject(obj: object, list: object[]): boolean {
    for (let i in list) {
      if (
        list[i]["song"] === obj["song"] &&
        list[i]["artist"] === obj["artist"]
      ) {
        return true;
      }
    }
    return false;
  }

  start(index: number) {
    index = index ?? this.index;

    let data = this.songs[index];
    if (this.sound) {
      this.sound.pause();
    }
    let self = this;
    this.sound = new Howl({
      src: [data.file],
      html5: true,
      onplay: function () {
        currentSong.set(data);
        songPlaying.set(true);

        if (get(inAlbum)) {
          document.title = `${get(currentSong)["song"]} on ${
            get(currentSong)["album"]
          } - Rhyme`;
        } else {
          document.title = `${get(currentSong)["song"]} by ${
            get(currentSong)["artist"]
          } - Rhyme`;
        }

        let newArray = get(recentlyPlayed);
        if (newArray.length > 12) {
          newArray.shift();
        }
        if (!self.containsObject(data, newArray)) {
          newArray.push(data);
        }
        recentlyPlayed.set(newArray);
        this.volume(get(volume));
        if (get(settings)["showNotifications"]) {
          ipcRenderer.send(
            "notification",
            `${data["song"]} • ${data["artist"]}`
          );
        }
      },
      onend: function () {
        self.next();
      },
    });

    this.sound.play();

    this.seek();

    this.index = index;
  }

  pause() {
    this.sound.pause();
    songPlaying.set(false);
  }

  resume() {
    this.sound.play();
    songPlaying.set(true);
  }

  previous() {
    if (this.sound) {
      if (this.sound.seek() >= 3) {
        this.play();
        return;
      }

      let index = this.index;

      if (this.index > 0) {
        index--;
      }
      this.play(index);
    }
  }

  next() {
    if (get(repeat)) {
      this.play();
      return;
    }

    if (this.index === this.songs.length - 1) {
      this.index = 0;
      this.play();
      return;
    }

    this.index++;
    this.play();
  }

  randomize(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = secs - minutes * 60 || 0;
    return (minutes + ":" + (seconds < 10 ? "0" : "") + seconds).split(".")[0];
  }
  seek() {
    this.emit("seek");
    requestAnimationFrame(this.seek.bind(this));
  }
}
