import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

/**
* In this file, we declare the actions that this reducer can handle
* as the actions that are allowed to be dispatched by the
* application's modules.
*
* The actions are available via a service that can be consumed by any
* module of the app(Injectable). However, we're going to use action
* creators to encapsulate its creation and resuse. Notice that each
* action is defined as a static property with a prefix. This ensures
* the uniqueness of each action once reduceres are invoked. The
* action interface is imported as to hint at the return value for
* each action creator funciton. 
*/

@Injectable()
export class YoutubeVideosActions {
  static ADD = '[YoutubeVideos] ADD_VIDEOS';
  static RESET = '[YoutubeVideos] RESET';

  addVideo(videos: GoogleApiYouTubeVideoResource[]): Action {
    return {
      type: YoutubeVideosActions.ADD,
      payload: videos
    };
  }
  reset(): Action {
    return {
      type: YoutubeVideosActions.RESET
    }
  }
}
