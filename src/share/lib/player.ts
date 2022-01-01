import url from 'url';

class Player {
  private audio: HTMLAudioElement;
  private durationThresholdReached: boolean;
  public threshold: number;

  private listeners = {
    onPlay: [] as (() => void)[],
    onPause: [] as (() => void)[],
    onEnd: [] as (() => void)[],
    onMute: [] as (() => void)[],
    onUnmute: [] as (() => void)[],
  };

  on(method: 'play' | 'pause' | 'end' | 'mute' | 'unmute', callback: () => void) {
    switch (method) {
      case 'play':
        this.listeners.onPlay.push(callback);
        break;
      case 'end':
        this.listeners.onEnd.push(callback);
        break;
      case 'mute':
        this.listeners.onMute.push(callback);
        break;
      case 'pause':
        this.listeners.onPause.push(callback);
        break;
      case 'unmute':
        this.listeners.onUnmute.push(callback);
        break;
    }
  }

  constructor() {
    this.audio = new Audio();

    this.audio.defaultPlaybackRate = 1;
    // eslint-disable-next-line
    // @ts-ignore
    this.audio.setSinkId('default');
    this.audio.playbackRate = 1;
    this.audio.volume = 1;
    this.audio.muted = false;

    this.audio.addEventListener('ended', () => {
      this.listeners.onEnd.map((callback) => {
        callback();
      });
    });

    this.threshold = 0.75;
    this.durationThresholdReached = false;
  }

  async play() {
    if (!this.audio.src) throw new Error('Trying to play a track but not audio.src is defined');

    await this.audio.play();

    this.listeners.onPlay.map((callback) => {
      callback();
    });
  }

  pause() {
    this.audio.pause();

    this.listeners.onPause.map((callback) => {
      callback();
    });
  }

  mute() {
    this.audio.muted = true;

    this.listeners.onMute.map((callback) => {
      callback();
    });
  }

  unmute() {
    this.audio.muted = false;

    this.listeners.onUnmute.map((callback) => {
      callback();
    });
  }

  getAudio() {
    return this.audio;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getVolume() {
    return this.audio.volume;
  }

  getSrc() {
    return this.audio.src ? url.fileURLToPath(this.audio.src) : this.audio.src;
  }

  setAudioVolume(volume: number) {
    this.audio.volume = volume;
  }

  setAudioPlaybackRate(playbackRate: number) {
    this.audio.playbackRate = playbackRate;
    this.audio.defaultPlaybackRate = playbackRate;
  }

  async setOutputDevice(deviceId: string) {
    // eslint-disable-next-line
    // @ts-ignore
    await this.audio.setSinkId(deviceId);
  }

  setAudioSrc(src: string) {
    // When we change song, need to update the thresholdReached indicator.
    this.durationThresholdReached = false;
    this.audio.src = src;
  }

  setAudioCurrentTime(currentTime: number) {
    this.audio.currentTime = currentTime;
  }

  isMuted() {
    return this.audio.muted;
  }

  isPaused() {
    return this.audio.paused;
  }

  isThresholdReached() {
    if (!this.durationThresholdReached && this.audio.currentTime >= this.audio.duration * this.threshold) {
      this.durationThresholdReached = true;
    }

    return this.durationThresholdReached;
  }
}

export default new Player();
