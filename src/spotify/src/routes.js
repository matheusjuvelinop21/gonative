import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/main';
import Podcast from './pages/podcast';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Podcast,
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      },
    },
  ),
);

export default Routes;
