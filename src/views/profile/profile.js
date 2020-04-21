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
import {CoinsIcon} from '../../assets/images';

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
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Image style={{width:20, height:20}} source={CoinsIcon} />
                <View style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 18, color: 'white' }}>{userData.coins}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 25,
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListMatchs')}
                style={styles.profileButton}>
                <IconSetting name="staro" size={25} style={styles.iconButton} />
                <View style={styles.lineButton} />
                <Text style={styles.textButton}>Matchs</Text>
                <IconSetting name="arrowright" size={25} style={styles.iconButtonArrow} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ListInterests')}
                style={styles.profileButton}>
                <IconSetting name="like2" size={25} style={styles.iconButton} />
                <View style={styles.lineButton} />
                <Text style={styles.textButton}>Intereses</Text>
                <IconSetting name="arrowright" size={25} style={styles.iconButtonArrow} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyTags')}
                style={styles.profileButton}>
                <IconSetting name="tago" size={25} style={styles.iconButton} />
                <View style={styles.lineButton} />
                <Text style={styles.textButton}>Etiquetas</Text>
                <IconSetting name="arrowright" size={25} style={styles.iconButtonArrow} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Settings')}
                style={styles.profileButton}>
                <IconSetting name="setting" size={25} style={styles.iconButton} />
                <View style={styles.lineButton} />
                <Text style={styles.textButton}>Configuración</Text>
                <IconSetting name="arrowright" size={25} style={styles.iconButtonArrow} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.logoutUser()}
                style={styles.profileButton}>
                <IconLogout name="log-out" size={25} style={styles.iconButton} />
                <View style={styles.lineButton} />
                <Text style={styles.textButton}>Cerrar sesión</Text>
                <IconSetting name="arrowright" size={25} style={styles.iconButtonArrow} />
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
    paddingTop: '8%',
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
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 0,
    height: 45,
    borderRadius: 10,
    marginTop: 10,
    width: '70%',
  },
  lineButton: {
    backgroundColor: '#6878a0',
    width: 1,
    height: 25,
    marginRight: 10
  },
  iconButton: {
    padding: 10,
    color: 'white',
  },
  iconButtonArrow: {
    padding: 10,
    color: '#6878a0',
    position: 'absolute',
    right:0
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  }
});
