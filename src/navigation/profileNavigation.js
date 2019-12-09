import { Platform, StatusBar } from 'react-native'; 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../components/profile/profile'
import ListInterests from '../components/profile/listInterests'
import Settings from '../components/profile/settings'
import ListMatchs from '../components/profile/listMatchs'

/*
  Navegación interna dentro de la pantalla de perfil
*/
const ProfileStack = createStackNavigator(
    {
        Profile: { 
          screen: Profile,
          navigationOptions: () => ({
            header: null
          })
        },
        ListInterests: { 
            screen: ListInterests,
            navigationOptions: () => ({
                title: `Intereses Seleccionados:`
              }),
        },
        ListMatchs: {
            screen: ListMatchs,
            navigationOptions: () => ({
                title: `Lista de Match's:`
              }),
        },
        Settings: {
            screen: Settings,
            navigationOptions: () => ({
                title: `Configuración:`
            }),
        }
    },
    { 
        initialRouteName: 'Profile',
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    }
);

export default createAppContainer(ProfileStack);
