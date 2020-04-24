import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  loadRequest: null,
  loadSuccess: ['data'],
  loadFailure: null,
});

export const PodcastsTypes = Types;
export const PodcastsActions = Creators;

const INITIAL_STATE = Immutable({data: []});

export const PodcastsReducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_SUCCESS]: (state, {data}) => state.merge({data}),
});
