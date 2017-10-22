/**
 * the file includes tests for the reducer. Since we're testing a simple 
 * JS function, the tests are quite simple, and there's no need to connect it 
 * to Angular. Angular's default testing gramework is called Jasmine. However,
 * Angular is completely agnostic to the testing framework, and you are free to
 * choose the proper solution as you see fit. 
 * 
 * First, we need to import the videos function reducer and the relevant actions
 * class. Next, we import a json object from a static file, which will be used
 * as payload data for the ADD action. There are various ways in which we can
 * add videos to the store. The most common way in the Echoes Player (Lite) is
 * by searching YouTube with its data API.
 * 
 * However, we don't actually want to perform an ajax request to YouTube's API
 * each time we test. Rather, we want to test the operation of adding videos to
 * the store, especially whether the ajax request has successfully returned the
 * response. For this reason, we import a json file, which is a mocked array of
 * items from the tests directory (located in the root of the application). 
 */

import { videos } from './youtube-videos.reducer';
import { YoutubeVideosActions } from './youtube-videos.actions';
import { YoutubeMediaItemsMock } from '../../../../../tests/mocks/youtube.media.items';

/**
 * Now, we are ready to create a test suite by using describe. Since the
 * YoutubeVideosActions class doesn''t store data or have any side effects, we
 * can simply instantiate it once for the whole suite. Angular does this behind
 * the scenes once this calss is injected into our application. We have to do 
 * this manually here in order to gain access to its function.
 */

describe('The Youtube Videos reducer', () => {
  const mockedState = [];
  const youtubeVideosActions = new YoutubeVideosActions();

  it('should return current state when no valid actions have been made', () => {
    const state = [...mockedState];
    const actual = videos(state, { type: 'INVALID_ACTION', payload: {} });
    const expected = state;
    expect(actual).toBe(expected);
  });

  it('should ADD videos', () => {
    const state = [...mockedState];
    const actual = videos(state, youtubeVideosActions.addVideos(YoutubeMediaItemsMock));
    const expected = [...state, ...YoutubeMediaItemsMock];
    expect(actual.length).toBe(expected.length);
  });

  it('should empty the state when RESET', () => {
    const state= [...YoutubeMediaItemsMock];
    const actual = videos(state, YoutubeVideosActions.reset());
    const expected = 0;
    expect(actual.length).toEqual(expected);
  });
});


