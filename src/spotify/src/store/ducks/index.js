import {combineReducers} from 'redux';
import {PodcastsReducer} from './podcasts';
import {PlayerReducer} from './player';

const reducers = combineReducers({
  podcasts: PodcastsReducer,
  player: PlayerReducer,
});

export default reducers;
