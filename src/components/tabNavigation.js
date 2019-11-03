import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon} from 'native-base'
import Profile from './profile'
import SelectInterests from './selectInterests'
import ListProfiles from './listProfiles'

/*
    En este .js se configura el TabBar que aparece en la parte de abajo
*/
const TabNavigator = createBottomTabNavigator({
    ListProfiles: {
        screen: ListProfiles, 
        navigationOptions: () => ({
            title: ``
        })
    },
    SelectInterests: {
      screen: SelectInterests, 
      navigationOptions: () => ({
          title: ``
      })
    },
    Profile: {
        screen: Profile, 
        navigationOptions: () => ({
            title: ``
        })
    }
},{ initialRouteName: 'SelectInterests',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ListProfiles') {
            iconName='heart'
        } else if (routeName === 'Profile') {
            iconName='user'
        } else if (routeName === 'SelectInterests') {
            iconName='thumbs-up'
        }
        return <Icon type="FontAwesome" name={iconName} />;
      },
    })
  });

export default createAppContainer(TabNavigator);