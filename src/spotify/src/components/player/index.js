import React from 'react';

import {
  Container,
  CoverBackground,
  Title,
  EpisodeInfo,
  Author,
  Controls,
  ControlButton,
  ControlIcon,
} from './styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {PlayerActions} from '../../store/ducks/player';

const Player = ({player, currentEpisode, play, pause, prev, next}) =>
  player.current && (
    <Container>
      <CoverBackground
        source={{
          uri: currentEpisode.artwork,
        }}
      />
      <EpisodeInfo>
        <Title>{currentEpisode.title}</Title>
        <Author>{currentEpisode.artist}</Author>
      </EpisodeInfo>

      <Controls>
        <ControlButton onPress={prev}>
          <ControlIcon name="skip-previous" />
        </ControlButton>
        <ControlButton onPress={player.playing ? pause : play}>
          <ControlIcon
            name={player.playing ? 'pause-circle-filled' : 'play-circle-filled'}
          />
        </ControlButton>
        <ControlButton onPress={next}>
          <ControlIcon name="skip-next" />
        </ControlButton>
      </Controls>
    </Container>
  );

export default connect(
  (state) => ({
    player: state.player,
    currentEpisode: state.player.podcast
      ? state.player.podcast.tracks.find(
          (episode) => episode.id === state.player.current,
        )
      : null,
  }),
  (dispatch) => bindActionCreators(PlayerActions, dispatch),
)(Player);
