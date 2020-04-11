import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import SelectInterests from '../views/selectInterests/selectInterests';
import ListProfiles from '../views/listOfCompatibleProfiles/listProfiles';
import ProfileStack from './profileNavigation';

/*
    En este .js se configura el TabBar que aparece en la parte de abajo
*/
const TabNavigator = createMaterialTopTabNavigator(
  {
    ListProfiles: {
      screen: ListProfiles,
    },
    SelectInterests: {
      screen: SelectInterests,
      navigationOptions: () => ({
        title: `Intereses`,
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        title: `Perfil`,
      }),
    },
  },
  {
    initialRouteName: 'SelectInterests',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'ListProfiles') {
          iconName = 'heart';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        } else if (routeName === 'SelectInterests') {
          iconName = 'thumbs-up';
        }
        return (
          <Icon type="FontAwesome" name={iconName} style={{color: tintColor}} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#EE4B3B',
      inactiveTintColor: 'grey',
      showIcon: true,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
        elevation: 8,
        padding: 0,
        margin: 0,
        paddingTop: 5,
      },
      indicatorStyle: {
        height: 0,
      },
      labelStyle: {
        fontSize: 10,
        margin: 0,
        padding: 0,
        paddingTop: 10,
      },
      iconStyle: {
        width: 30,
        height: 30,
        padding: 0,
        margin: 0,
      },
    },
    tabBarPosition: 'bottom',
    backBehavior: 'history',
  },
);

export default createAppContainer(TabNavigator);
