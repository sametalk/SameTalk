import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import LottieView from 'lottie-react-native';

import {
  Text,
  Button,
} from 'native-base';
import {connect} from 'react-redux';

class register extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    const {userData} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/image/fondoWelcome.png')}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 370,
              width: '75%',
              backgroundColor: 'white',
              borderRadius: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                width: '100%',
                height: 50,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                Bienvenido a SameTalk!
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <View style={{height: 200, width: '100%'}}>
                <LottieView
                  style={{position: 'absolute'}}
                  source={require('../../assets/animations/register2.json')}
                  autoPlay
                  loop
                />
              </View>
              <View style={{paddingHorizontal: 22}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.9)',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  Complete los siguiente datos para finalizar su autenticación
                </Text>
              </View>

              <View style={{marginTop: 20}} />
              <Button
                success
                onPress={() => this.props.navigation.navigate('SelectAge')}
                style={[
                  styles.buttonModal,
                  {backgroundColor: 'rgba(0, 0, 0, 0.9)'},
                  {
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  {borderRadius: 10}
                ]}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Continuar
                </Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {userData: state.userData};
};

export default connect(mapStateToProps)(register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F3F5',
  },
  welcome: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  avatarZone: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    alignSelf: 'flex-end',
  },
  nameZone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textZone: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    color: '#34222e',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
