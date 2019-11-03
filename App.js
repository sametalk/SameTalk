import React from 'react';
import AppNavigator from './src/appNavigator';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Reducers from './src/reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <AppNavigator />
      </Provider>
    )
  }
}