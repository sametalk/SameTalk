import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Register from '../views/registerViews/register';
import Welcome from '../views/welcome';
import SelectCountry from '../views/registerViews/selectCountry';
import SelectAge from '../views/registerViews/selectAge';
import SelectSex from '../views/registerViews/selectSex';
import TabNavigation from './tabNavigation';
import Prueba from '../views/prueba';

/*
  Navegacion desde la pantalla de Welcome hasta la pantalla del TabBarBottom (TabNavigation)
  Pasa por todo el proceso de registro
*/
const AppNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Register: {
      screen: Register,
      navigationOptions: () => ({
        header: null,
      }),
    },
    SelectAge: {
      screen: SelectAge,
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
    SelectSex: {
      screen: SelectSex,
      navigationOptions: () => ({
        header: null,
      }),
    },
    TabNavigation: {
      screen: TabNavigation,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Prueba: {
      screen: Prueba,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {initialRouteName: 'Welcome'},
);

export default createAppContainer(AppNavigator);
