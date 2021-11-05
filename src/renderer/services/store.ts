import JsonStorageManager from '@/managers/json-storage-manager';
import { Settings, Theme, ThemeManager } from '@/share/interfaces';
import { writable, get } from 'svelte/store';

export const settings = writable<Settings>(JsonStorageManager.get('settings') as Settings);
export const themeData = writable<ThemeManager>(JsonStorageManager.get('theme-manager') as ThemeManager);
export const currentTheme = writable<Theme>(
  get(themeData).themes.filter((theme) => {
    return theme.id === get(themeData).currentTheme;
  })[0] as Theme
);

export default '';
