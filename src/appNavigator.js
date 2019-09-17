import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from './components/register'
import Welcome from './components/welcome'
import SelectInterests from './components/selectInterests'
import Perfil from './components/perfil'
import SelectCountry from './components/selectCountry'
import SelectAge from './components/selectAge' 
import SelectSex from './components/selectSex'

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      header: null
    }),
  },
  Register: {
    screen: Register
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
  Perfil: {
    screen: Perfil,
    navigationOptions: () => ({
      title: `Perfil`
    }), 
  }
}, { initialRouteName: 'Welcome'});

export default createAppContainer(AppNavigator);