import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  setPodcastRequest: ['podcast', 'episodeId'],
  setPodcastSuccess: ['podcast'],
  setCurrent: ['id'],
  play: null,
  pause: null,
  next: null,
  prev: null,
  reset: null,
});

export const PlayerTypes = Types;
export const PlayerActions = Creators;

const INITIAL_STATE = Immutable({
  podcast: null,
  current: null,
  playing: false,
});

export const PlayerReducer = createReducer(INITIAL_STATE, {
  [Types.SET_PODCAST_SUCCESS]: (state, {podcast}) =>
    state.merge({podcast: podcast, current: podcast.tracks[0].id}),
  [Types.SET_CURRENT]: (state, {id}) => state.merge({current: id}),
  [Types.PLAY]: (state) => state.merge({playing: true}),
  [Types.PAUSE]: (state) => state.merge({playing: false}),
  [Types.RESET]: (state) =>
    state.merge({podcast: null, current: null, playing: false}),
});
