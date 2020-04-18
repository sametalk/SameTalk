import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SelectInterests from '../views/selectInterests/selectInterests';
import CompatibleProfileStack from './compatibleProfilesNavigator';
import ProfileStack from './profileNavigation';
import TabBar from '../components/TabBar';

/*
    En este .js se configura el TabBar que aparece en la parte de abajo
*/

class ExtendStack extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Personas',
      swipeEnabled: navigation.getParam('swipeAll', true),
      header: null,
    };
  };
  static router = CompatibleProfileStack.router;
  render() {
    return <CompatibleProfileStack navigation={this.props.navigation} />;
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    CompatibleProfileStack: {
      screen: ExtendStack,
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
    tabBarComponent: props => TabBar(props),

    initialRouteName: 'SelectInterests',

    tabBarPosition: 'bottom',
  },
);

export default createAppContainer(TabNavigator);
