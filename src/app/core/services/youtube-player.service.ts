import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class YoutubePlayerService {
  public player: YT.Player;

  private listeners: any = {
    ended: []
  };
  private isFullscreen: boolean = false;
  private defaultSizes = {
      height: 270,
      width: 367
  };

  constructor (public store: Store<any>, private zone: NgZone) {
    this.setupPlayer();


  }

  setupPlayer () {
    // in production mode, the youtube iframe api script tag is loaded
    // before the bundle.js, so the 'onYouTubeIfarmeAPIReady' has
    // already been triggered
    // TODO: handle this in build or in nicer in code
    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
        this.player = this.createPlayer(() => { });
      }
    };
    if (window.YT && window.YT.Player) {
      this.player = this.createPlayer(() => {});
    }
  }

  play () {
    this.player.playVideo();
  }

  pause () {
    this.player.pauseVideo();
  }

  playVideo(media: any) {
    const id = media.id.videoId ? media.id.videoId : media.id;
    this.player.loadVideoById(id);
    this.play();
    // this.store.dispatch({ type: PLAY, payload: media });
  }

  togglePlayer() {

  }

  isPlaying () {
    // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
    const isPlayerReady: any = this.player && this.player.getPlayerState;
    const playerState = isPlayerReady ? this.player.getPlayerState() : {};
    const isPlayerPlaying = isPlayerReady
      ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
      : false;
    return isPlayerPlaying;
  }
  // createPlayer (elementId, height, width, videoId, callback) {
  createPlayer (callback) {
    const store = this.store;
    const service = this;
    const defaultSizes = this.defaultSizes;
    return new window.YT.Player('player', {
        height: defaultSizes.height,
        width: defaultSizes.width,
        videoId: '',
        // playerVars: playerVars,
        events: {
            onReady: () => {},
            onStateChange: (ev) => this.zone.run(() => onPlayerStateChange(ev))
        }
    });

    function onPlayerStateChange (event) {
      const state = event.data;
      let autoNext = false;
      // play the next song if its not the end of the playlist
      // should add a "repeat" feature
      if (state === YT.PlayerState.ENDED) {
        service.listeners.ended.forEach(callback => callback(state));
      }

      if (state === YT.PlayerState.PAUSED) {
          // service.playerState = YT.PlayerState.PAUSED;
      }
      if (state === YT.PlayerState.PLAYING) {
          // service.playerState = YT.PlayerState.PLAYING;
      }


    }
  }

  registerListener (eventName: string, callback: Function) {
    this.listeners[eventName].push(callback);
  }

  setSize () {
    let height: number;
    let width: number;

    if (!this.isFullscreen) {
      height = window.innerHeight;
          width = window.innerWidth;
    } else {
      height = this.defaultSizes.height;
      width = this.defaultSizes.width;
    }
    this.player.setSize(width, height);

  }
}
