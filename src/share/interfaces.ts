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

export interface Theme {
  id: string;
  name: string;
  author: string;
  colors: {
    accentColor: string;
    sidebarActiveColor: string;
    panelsColor: string;
    textColor: string;
    titleColor: string;
    backgroundColor: string;
  };
}

export interface ThemeManager {
  currentTheme: string;
  themes: Theme[];
}
