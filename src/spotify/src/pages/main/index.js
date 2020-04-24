import React, {Component} from 'react';

import {
  Container,
  PodcastList,
  Podcast,
  Cover,
  Info,
  Title,
  Count,
  PageTitle,
} from './styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {PodcastsActions} from '../../store/ducks/podcasts';

class Main extends Component {
  componentDidMount() {
    this.props.loadRequest();
  }

  handlePodcastPress = (podcast) => {
    this.props.navigation.navigate('Podcast', {podcast});
  };

  render = () => (
    <Container>
      <PodcastList
        ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
        data={this.props.podcasts.data}
        keyExtractor={(podcast) => String(podcast.id)}
        renderItem={({item: podcast}) => (
          <Podcast onPress={() => this.handlePodcastPress(podcast)}>
            <Cover source={{uri: podcast.cover}} />
            <Info>
              <Title>{podcast.title}</Title>
              <Count>{`${podcast.tracks.length} episódios`}</Count>
            </Info>
          </Podcast>
        )}
      />
    </Container>
  );
}

export default connect(
  (state) => ({podcasts: state.podcasts}),
  (dispatch) => bindActionCreators(PodcastsActions, dispatch),
)(Main);
