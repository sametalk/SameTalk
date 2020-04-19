import {Platform, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import ListProfiles from '../views/listOfCompatibleProfiles/listProfiles';
import SeeWhoLikeMee from '../views/listOfCompatibleProfiles/seeWhoLikeMee';

import {DARK} from '../constant/colors';
/*
  Navegación interna dentro de la pantalla de perfil
*/
const compatibleProfileStack = createStackNavigator(
  {
    ListProfiles: {
      screen: props => <ListProfiles navigation={props.navigation}/>,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SeeWhoLikeMee: {
      screen: SeeWhoLikeMee,
      navigationOptions: () => ({
        title: `Likes:`,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: DARK
        },
      }),
    },
  },
  {
    initialRouteName: 'ListProfiles',
  },
);

export default compatibleProfileStack;
