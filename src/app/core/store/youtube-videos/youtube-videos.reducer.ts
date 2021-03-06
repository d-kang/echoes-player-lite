/**
* The reducer file defines the function reducer that the store will
* run each time an action is dispatched.
*
* First, the ActionReducer and Action interfaces are imported to
* make not of the reducer function and its return value type.
*
* Second, the interface EchoesVideos is defined for this reducer
* --an array that contains objects of type
* GoogleApiYouTubeVideoResource. We will use this interface when we
* connect the reducer to the store and also later on when we consume
* this reducer in presentation components. Again, this allows the
* Typescript-aware code editors to assist with code completion and
* error reporting.
*
* The videos ActionReducer is the actual reducer function. It expects
* an action object, which is handled by its type property and option-
* ally by its payload property. Notice how the RESET case returns an
* empty array. It also expects an action object, which is handled by
* its type propty and optionally by its payload property. Notice how
* the RESET case returns an empty array, so it doesn't need to use the
* action's payload.
*/

import { ActionReducer, Action } from '@ngrx/store';
import { YoutubeVideosActions } from './youtube-videos.actions';
type GoogleApiYoutubeVideo = GoogleApiYouTubeVideoResource | Object;
export interface EchoesVideos extends Array<GoogleApiYoutubeVideo> {};

export const videos: ActionReducer<EchoesVideos> = (state: EchoesVideos = [], action: Action) => {

  switch (action.type) {
    case YoutubeVideosActions.ADD:
      return [...state, ...action.payload];

    case YoutubeVideosActions.REMOVE:
      return state;

    case YoutubeVideosActions.RESET:
      return [];

    case YoutubeVideosActions.UPDATE_METADATA:
      const amountOfResults = 50;
      const bottomLimit = state.length === 0 ? state.length : state.length - amountOfResults;
      const copyOfLastState = [...state].filter((video, index) => index < bottomLimit);
      return [...copyOfLastState, ...action.payload];

    default:
      return state;
  }
};
