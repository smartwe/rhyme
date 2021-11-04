export interface Song {
  file: string;
  name: string;
  artist: string;
  album: string;
  image?: string;
}

export interface Settings {
  musicFolder: string;
  showNotifications: boolean;
  minimizeToTray: boolean;
}
