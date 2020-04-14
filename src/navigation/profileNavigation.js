import {Platform, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import Profile from '../views/profile/profile';
import ListInterests from '../views/profile/listInterests';
import Settings from '../views/profile/settings';
import ListMatchs from '../views/profile/listMatchs';
import SelectCountry from '../views/profile/selectCountry';
import MatchProfile from '../views/profile/matchProfile';
import Tagger from '../views/profile/tagger';
import MyTags from '../views/profile/myTags';
import MyMatchsTags from '../views/profile/myMatchsTags';

/*
  Navegación interna dentro de la pantalla de perfil
*/
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ListInterests: {
      screen: ListInterests,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ListMatchs: {
      screen: ListMatchs,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SelectCountry: {
      screen: SelectCountry,
      navigationOptions: () => ({
        header: null,
      }),
    },
    MatchProfile: {
      screen: MatchProfile,
      navigationOptions: () => ({
        title: `Datos del usuario`,
      }),
    },
    Tagger: {
      screen: Tagger,
      navigationOptions: () => ({
        title: `Etiquetar usuario`,
      }),
    },
    MyTags: {
      screen: MyTags,
      navigationOptions: () => ({
        header: null,
      }),
    },
    MyMatchsTags: {
      screen: MyMatchsTags,
      navigationOptions: () => ({
        title: `Etiquetado por  `,
      }),
    },
  },
  {
    initialRouteName: 'Profile',
  },
);

export default ProfileStack;
