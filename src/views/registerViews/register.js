import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

import { Text, Button } from 'native-base';
import { connect } from 'react-redux';

class register extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={styles.containerGeneral}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require('../../../assets/image/fondoWelcome.png')}
          style={styles.imageBackground}
        >
          <View style={styles.content}>
            <View style={styles.subContent}>
              <Text style={styles.welcomeText}>Bienvenido a SameTalk!</Text>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.animationContainer}>
                <LottieView
                  style={styles.animation}
                  source={require('../../assets/animations/register2.json')}
                  autoPlay
                  loop
                />
              </View>
              <View style={styles.footerContainer}>
                <Text style={styles.textFooter}>
                  Complete los siguiente datos para finalizar su autenticación
                </Text>
              </View>

              <View style={styles.buttonContainer} />
              <Button
                success
                onPress={() => this.props.navigation.navigate('SelectAge')}
                style={styles.buttonModal}
              >
                <Text style={styles.buttonText}>Continuar</Text>
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
  return { userData: state.userData };
};

export default connect(mapStateToProps)(register);

const styles = StyleSheet.create({
  animation: { position: 'absolute' },
  animationContainer: { height: 200, width: '100%' },
  buttonModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonContainer: { marginTop: 20 },
  buttonText: { fontSize: 20, fontWeight: 'bold' },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  containerGeneral: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)' },
  container: {
    backgroundColor: '#F1F3F5',
  },
  content: {
    height: 370,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subContent: {
    width: '100%',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
  footerContainer: { paddingHorizontal: 22 },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFooter: {
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  welcomeText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
