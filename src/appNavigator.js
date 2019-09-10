import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from './components/register'
import Welcome from './components/welcome'
import SelectInterests from './components/selectInterests'
import Perfil from './components/perfil'

const AppNavigator = createStackNavigator({
  Register: {
    screen: Register
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      header: null
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