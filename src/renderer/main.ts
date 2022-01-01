import './global.css';
import App from './App.svelte';
import ShortcutsManager from '@/managers/shortcuts-manager';
import player from '@/share/lib/player';
import PlayingManager from '@/managers/playing-manager';

const shortcuts = [
  {
    name: 'PlayOrPause',
    shortcut: ['space'],
    run: () => {
      const isPaused = player.isPaused();
      if (isPaused) {
        player.play();
        return;
      }
      player.pause();
    },
  },
  {
    name: 'Next',
    shortcut: ['end'],
    run: () => {
      PlayingManager.next();
    },
  },
  {
    name: 'Previous',
    shortcut: ['home'],
    run: () => {
      PlayingManager.previous();
    },
  },
];

shortcuts.forEach((shortcut) => {
  ShortcutsManager.addShortcut(shortcut.name, shortcut.run, ...shortcut.shortcut);
});

const app = new App({
  target: document.body,
});

export default app;
