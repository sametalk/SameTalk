import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


export default class Storage {
  static async setItem(key, value){
    try {
      console.log(JSON.stringify(value))
      await AsyncStorage.setItem(key,JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  static async getItem(key){
    try {
      return AsyncStorage.getItem(key)
    } catch (error) {
      console.log(error)
    }
  }

}
/*const Storage = {

  getItem: async function (key) {
      let item = await AsyncStorage.getItem(key);
      //You'd want to error check for failed JSON parsing...
      return JSON.parse(item);
  },
  setItem: async function (key, value) {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async function (key) {
      return await AsyncStorage.removeItem(key);
  }
};*/


