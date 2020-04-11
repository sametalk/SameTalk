import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import ListProfiles from '../views/listOfCompatibleProfiles/listProfiles'
import SeeWhoLikeMee from '../views/listOfCompatibleProfiles/seeWhoLikeMee'

/*
  Navegación interna dentro de la pantalla de perfil
*/
const compatibleProfileStack = createStackNavigator(
  {
    ListProfiles: {
      screen: ListProfiles,
      navigationOptions: () => ({
        header: null
      })
    },
    SeeWhoLikeMee: {
      screen: SeeWhoLikeMee,
      navigationOptions: () => ({
        title: `Likes:`
      }),
    },
  },
  {
    initialRouteName: 'ListProfiles',
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

export default compatibleProfileStack;
