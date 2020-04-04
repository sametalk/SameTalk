import React from 'react';
import { BackHandler } from 'react-native'
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'

let store = configureStore()

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}