import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import IconLogout from 'react-native-vector-icons/Entypo';
import IconSetting from 'react-native-vector-icons/AntDesign';
import IconCoins from 'react-native-vector-icons/FontAwesome5';

import { DARK, DARK_2 } from '../../constant/colors';

class profile extends Component {
  resetTo(route) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('@token');
    } catch (e) { }
    this.resetTo('Welcome');
  };

  render() {
    const { userData, listMatchs, selectedInterests, countTags } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: DARK }}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.content}>
            <View
              style={{
                width: 150,
                height: 150,
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: userData.profile_picture }}
                style={[
                  styles.profile,
                  { width: 150, height: 150, borderRadius: 150 / 2 },
                ]}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
                {userData.full_name}, {userData.age}
              </Text>
              <View style={{ marginTop: 3 }} />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListMatchs')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <IconCoins name="coins" size={18} color="yellow" />
                <View style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 16, color: 'white' }}>{userData.coins}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 50,
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListMatchs')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <IconSetting name="staro" size={25} color="white" />
                <View style={{ marginRight: 3 }} />
                <Text style={{ fontSize: 20, color: 'white' }}>Matchs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListInterests')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <IconSetting name="like2" size={25} color="white" />
                <View style={{ marginRight: 3 }} />
                <Text style={{ fontSize: 20, color: 'white' }}>Intereses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyTags')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <IconSetting name="tago" size={25} color="white" />
                <View style={{ marginRight: 3 }} />
                <Text style={{ fontSize: 20, color: 'white' }}>Etiquetas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Settings')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <IconSetting name="setting" size={25} color="white" />
                <View style={{ marginRight: 3 }} />
                <Text style={{ fontSize: 20, color: 'white' }}>
                  Configuración
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.logoutUser()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <IconLogout name="log-out" size={22} color="white" />
                <View style={{ marginRight: 3 }} />

                <Text style={{ fontSize: 20, color: 'white' }}>
                  Cerrar sesión
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
  return {
    userData: state.userData,
    listMatchs: state.listMatchs,
    listTags: state.listTags,
    countTags: state.countTags,
    selectedInterests: state.selectedInterests,
  };
};

export default connect(mapStateToProps)(profile);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
  },

  card: {
    width: 320,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  profile: {
    flex: 1,
    width: null,
    height: 300,
  },
  text: {
    alignSelf: 'center',
  },
  statistics: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
  },
  cardButton: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 10,
  },
  green: {
    backgroundColor: '#6FC95E',
    marginRight: 5,
  },
  red: {
    backgroundColor: '#d9534f',
  },
  blue: {
    backgroundColor: '#4B62A5',
    marginLeft: 5,
  },
  icon: {
    alignSelf: 'center',
    fontSize: 30,
  },
  margin: {
    marginTop: 5,
  },
  count: {
    alignSelf: 'center',
    color: 'white',
    marginBottom: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
