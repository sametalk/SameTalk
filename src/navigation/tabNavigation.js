import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import SelectInterests from '../views/selectInterests/selectInterests';
import CompatibleProfileStack from './compatibleProfilesNavigator';
import ProfileStack from './profileNavigation';
import TabBar from '../components/TabBar';

/*
    En este .js se configura el TabBar que aparece en la parte de abajo
*/
const TabNavigator = createMaterialTopTabNavigator({
    CompatibleProfileStack: {
        screen: CompatibleProfileStack,
        navigationOptions: () => ({
            title: `Personas`
        })
    },
    SelectInterests: {
        screen: SelectInterests, 
        navigationOptions: () => ({
            title: `Intereses`
        })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        title: `Perfil`,
      }),
    },
  },
  {
    tabBarComponent: props => TabBar(props),

    initialRouteName: 'SelectInterests',

    tabBarPosition: 'bottom',
  },
);

export default createAppContainer(TabNavigator);