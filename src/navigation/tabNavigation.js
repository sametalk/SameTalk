import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Icon} from 'native-base'
import SelectInterests from '../views/selectInterests/selectInterests'
import ListProfiles from '../views/listOfCompatibleProfiles/listProfiles'
import ProfileStack from './profileNavigation'


/*
    En este .js se configura el TabBar que aparece en la parte de abajo
*/
const TabNavigator = createBottomTabNavigator({
    ListProfiles: {
        screen: ListProfiles, 
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
            title: `Perfil`
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
            return <Icon type="FontAwesome" name={iconName} style={{color: tintColor}}/>;
        }}),
        tabBarOptions: {
            activeTintColor: '#EE4B3B',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: "#white"
            }
        },
        backBehavior: 'history',
});

export default createAppContainer(TabNavigator);