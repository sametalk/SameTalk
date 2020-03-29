import { Platform, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../views/profile/profile'
import ListInterests from '../views/profile/listInterests'
import Settings from '../views/profile/settings'
import ListMatchs from '../views/profile/listMatchs'
import SelectCountry from '../views/profile/selectCountry'
import MatchProfile from '../views/profile/matchProfile'

/*
  Navegación interna dentro de la pantalla de perfil
*/
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        header: null
      })
    },
    ListInterests: {
      screen: ListInterests,
      navigationOptions: () => ({
        title: `Intereses Seleccionados:`
      }),
    },
    ListMatchs: {
      screen: ListMatchs,
      navigationOptions: () => ({
        title: `Lista de Match's:`
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        title: `Configuración:`
      }),
    },
    SelectCountry: {
      screen: SelectCountry,
      navigationOptions: () => ({
        title: `Selecciona tu país:`
      }),
    },
    MatchProfile: {
      screen: MatchProfile,
      navigationOptions: () => ({
        title: `Datos del usuario:`
      }),
    }
  },
  {
    initialRouteName: 'Profile',
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

export default createAppContainer(ProfileStack);
