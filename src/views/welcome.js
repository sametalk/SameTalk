import React, {Component} from 'react';
import {Container, Icon, Button, Text, Spinner} from 'native-base';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import {connect} from 'react-redux';
import {login, cleanStore} from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {TouchableOpacity} from 'react-native';

class welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {loadingToken: true};
  }

  resetTo(route) {
    //Navego a una ruta reseteando el stack
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleBackButton = () => {
    if (!this.props.navigation.goBack(null)) return false;
    return true;
  };

  componentDidMount() {
    //Add general backHandlerListener when screen focused
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //Recuperar token del almacenamiento
    getData = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        await this.props.cleanStore();
        if (token) {
          await this.props.login(token);
          if (!this.props.fetchData.error) {
            this.resetTo('TabNavigation'); // Usuario ya logeado
          } else {
            this.setState({loadingToken: false}); // Error al logear
          }
        } else {
          this.setState({loadingToken: false}); // Usuario no logeado
        }
      } catch (e) {}
    };
    getData();
  }

  /*
        Una vez que nos logueamos correctamente a traves de instagram
        Se llama a la funcion login definida en acción y se lo redirige segun el caso
    */
  async _onRegister(token) {
    this.setState({loadingToken: true});
    storeData = async () => {
      try {
        await AsyncStorage.setItem('@token', token);
      } catch (e) {}
    };
    storeData();
    await this.props.login(token);
    if (!this.props.fetchData.error) {
      this.resetTo('TabNavigation'); // Usuario ya registrado
    } else {
      this.props.navigation.navigate('Register'); // Usuario no registrado
    }
    this.setState({loadingToken: false});
  }

  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          source={require('../../assets/image/fondoWelcome.png')}
          style={{width: '100%', height: '100%'}}>
          {!this.state.loadingToken ? (
            <React.Fragment>
              <View style={styles.logo}>
                <Image
                  source={require('../../assets/image/logoWelcome.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.buttonZone}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      width: Platform.OS === 'ios' ? '65%' : '60%',
                      height: 50,
                      backgroundColor: '#d9534f',
                      flexDirection: 'row',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => this.instagramLogin.show()}>
                    <Icon
                      type="AntDesign"
                      name="instagram"
                      style={{color: 'white'}}
                    />
                    <View style={{marginLeft: 5}} />
                    <Text style={[styles.text, {color: 'white'}]}>
                      Conectarse con Instagram
                    </Text>
                  </TouchableOpacity>
                </View>
                <InstagramLogin
                  ref={ref => (this.instagramLogin = ref)}
                  clientId="c222a1cb5aa94671adc8c085a2d1aaf4"
                  redirectUrl="https://google.com"
                  scopes={['basic']}
                  onLoginSuccess={token => this._onRegister(token)}
                  onLoginFailure={data => this.setState({failure: data})}
                  cacheEnabled={true}
                  incognito={true}
                  thirdPartyCookiesEnabled={true}
                  sharedCookiesEnabled={true}
                  domStorageEnabled={true}
                />
              </View>
            </React.Fragment>
          ) : (
            <View style={styles.loading}>
              <View style={styles.loadingItem}>
                <Spinner color="white" style={{textAlign: 'center'}} />
              </View>
            </View>
          )}
        </ImageBackground>
      </Container>
    );
  }
}

// Trae del storage centralizado el objeto data
const mapStateToProps = state => {
  return {
    fetchData: state.fetchData,
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    login: token => dispatch(login(token)),
    cleanStore: () => dispatch(cleanStore()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(welcome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 2.2,
    alignContent: 'flex-end',
  },
  buttonZone: {
    flex: 1.2,
    justifyContent: 'flex-start',
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    width: 400,
    height: 500,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loadingItem: {
    height: 300,
    width: 300,
    borderRadius: 20,
    opacity: 0.95,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
