import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from '../views/registerViews/register'
import Welcome from '../views/welcome'
import SelectCountry from '../views/registerViews/selectCountry'
import SelectAge from '../views/registerViews/selectAge' 
import SelectSex from '../views/registerViews/selectSex'
import TabNavigation from './tabNavigation'
import Prueba from '../views/prueba'

/*
  Navegacion desde la pantalla de Welcome hasta la pantalla del TabBarBottom (TabNavigation)
  Pasa por todo el proceso de registro
*/
const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      header: null
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      header: null
    }),
  },
  SelectAge:{
    screen: SelectAge,
    navigationOptions: () => ({
      title: `Registro:`
    }),
  },
  SelectCountry: {
    screen: SelectCountry,
    navigationOptions: () => ({
      title: `Registro:`
    }),
  },
  SelectSex: {
    screen: SelectSex,
    navigationOptions: () => ({
      title: `Registro:`
    }),
  },
  TabNavigation: {
    screen: TabNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
  Prueba: {
    screen: Prueba,
    navigationOptions: () => ({
      header: null
    })
  }
}, { initialRouteName: 'Prueba'});

export default createAppContainer(AppNavigator);