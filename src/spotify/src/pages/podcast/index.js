import React, {Component} from 'react';

import {
  Container,
  EpisodeList,
  PodcastDetails,
  Background,
  BackButton,
  Cover,
  PodcastTitle,
  PlayButton,
  PlayButtonText,
  Episode,
  Title,
  Author,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {bindActionCreators} from 'redux';
import {PlayerActions} from '../../store/ducks/player';
import {connect} from 'react-redux';

class Podcast extends Component {
  componentDidMount() {}

  handleBack = () => this.props.navigation.goBack();

  handlePlay = (podcast, idEpisode) =>
    this.props.setPodcastRequest(podcast, idEpisode);

  render = () => {
    const podcast = this.props.navigation.getParam('podcast');
    return (
      <Container>
        <EpisodeList
          ListHeaderComponent={() => (
            <PodcastDetails>
              <Background source={{uri: podcast.cover}} blurRadius={5} />
              <BackButton onPress={this.handleBack}>
                <Icon name="arrow-back" size={20} color="#FFF" />
              </BackButton>
              <Cover source={{uri: podcast.cover}} />
              <PodcastTitle>{podcast.title}</PodcastTitle>
              <PlayButton onPress={() => this.handlePlay(podcast)}>
                <PlayButtonText>REPRODUZIR</PlayButtonText>
              </PlayButton>
            </PodcastDetails>
          )}
          data={podcast.tracks}
          keyExtractor={(episode) => String(episode.id)}
          renderItem={({item: episode}) => (
            <Episode onPress={() => this.handlePlay(podcast, episode.id)}>
              <Title
                active={
                  this.props.currentEpisode &&
                  this.props.currentEpisode.id === episode.id
                }>
                {episode.title}
              </Title>
              <Author>{episode.artist}</Author>
            </Episode>
          )}
        />
      </Container>
    );
  };
}

export default connect(
  (state) => ({
    currentEpisode: state.player.podcast
      ? state.player.podcast.tracks.find(
          (episode) => episode.id === state.player.current,
        )
      : null,
  }),
  (dispatch) => bindActionCreators(PlayerActions, dispatch),
)(Podcast);
