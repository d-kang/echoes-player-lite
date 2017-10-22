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
import { YoutubeVideoActions } from './youtube-videos.actions';

export interface EchoesVideos extends Array<GoogleApiYouTubeVideoResource> {};

export function videos (state: EchoesVideos = 
[], action: Action): ActionReducer<EchoesVideos> {
  
  switch (action.type) {
    case YoutubeVideosActions.ADD:
      return [...state, ...action.payload];
  }
    case YoutubeVideosActions.ADD:
      return [];
    
    default:
      return state;
};


