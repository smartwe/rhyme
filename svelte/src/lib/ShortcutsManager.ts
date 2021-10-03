import { CutagerJS, Action, KeyCombo } from "cutagerjs";
import { get } from "svelte/store";
import { songPlaying, songsPlayer, volume } from "../store";
const cutager = new CutagerJS();
let shortcuts: Action[] = [
  new Action("PlayOrPause", new KeyCombo("space"), () => {
    if (get(songPlaying)) {
      get(songsPlayer).pause();
    } else {
      get(songsPlayer).resume();
    }
  }),
  new Action("VolumeUp", new KeyCombo("up"), () => {
    if (get(volume) !== 100) {
      volume.set(get(volume) + 1);
    }
  }),
  new Action("VolumeDown", new KeyCombo("down"), () => {
    if (get(volume) !== 0) {
      volume.set(get(volume) - 1);
    }
  }),
  new Action("Previous5Seconds", new KeyCombo("left"), () => {
    let seekedValue = get(songsPlayer).sound.seek();
    get(songsPlayer).sound.seek(seekedValue >= 5 ? seekedValue - 5 : 0);
  }),
  new Action("Skip5Seconds", new KeyCombo("right"), () => {
    get(songsPlayer).sound.seek(get(songsPlayer).sound.seek() + 5);
  }),
  new Action("Previous", new KeyCombo("home"), () => {
    if (get(songsPlayer).sound.seek() <= 5) {
      get(songsPlayer).previous();
    } else {
      get(songsPlayer).sound.seek(0);
    }
  }),
  new Action("Next", new KeyCombo("end"), () => {
    get(songsPlayer).next();
  }),
];

shortcuts.forEach((shortcut) => {
  cutager.addAction(shortcut, false);
});
