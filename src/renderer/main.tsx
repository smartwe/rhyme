import ShortcutsManager from '@/managers/shortcuts-manager';
import channels from '@/share/channels';
import { ipcRenderer } from 'electron';
import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './global.css';

ShortcutsManager.addShortcut(
  'quit',
  () => {
    ipcRenderer.send(channels.QUIT_APP);
  },
  'ctrl+q'
);

ReactDOM.render(<App />, document.getElementById('root'));
