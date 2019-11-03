import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from './components/registerViews/register'
import Welcome from './components/welcome'
import SelectInterests from './components/selectInterests'
import SelectCountry from './components/registerViews/selectCountry'
import SelectAge from './components/registerViews/selectAge' 
import SelectSex from './components/registerViews/selectSex'
import TabNavigation from './components/tabNavigation'

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
  SelectInterests: {
    screen: SelectInterests,
    navigationOptions: () => ({
      title: `Seleccione sus intereses:`
    }),
  },
  TabNavigation: {
    screen: TabNavigation,
    navigationOptions: () => ({
      header: null
    })
  }
}, { initialRouteName: 'TabNavigation'});

export default createAppContainer(AppNavigator);