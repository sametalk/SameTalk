import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Container,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Title,
  Text,
  Button,
  Icon,
} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {register, changeReferredModalValue} from '../../actions';
import {NavigationActions, StackActions} from 'react-navigation';

class selectAge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      women: false,
      men: false,
      gender: '',
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*
        Verifico que se haya seleccionado un genero
        Obtengo los datos del usuario y le agrego el genero
        Registro en el servidor el nuevo usuario
        Navego a la vista de usuario registrado
    */
  async nextStep() {
    if (this.state.women || this.state.men) {
      const user = this.props.userData;
      user.gender = this.state.gender;
      await this.props.register(user);
      this.props.changeReferredModalValue();
      //Navego a TabNavigation reseteando el stack
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'TabNavigation'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  //Controla los checkbox para que solo este seleccionada una opcion
  _check = id => {
    if (id == 'F') {
      this.setState({
        women: true,
        men: false,
        gender: 'F',
      });
    } else {
      this.setState({
        women: false,
        men: true,
        gender: 'M',
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 48,
              },
            ]}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: 'white'}} />
            </Button>

            <Title style={{color: 'white'}}>Registro</Title>
            <View />
          </View>
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
                height: 300,
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
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Seleccione género
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                }}>
                <View style={{alignItems: 'flex-start'}}>
                  <CheckBox
                    center
                    title="Mujer"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="rgba(0, 0, 0, 0.9)"
                    checked={this.state.women}
                    onPress={() => this._check('F')}
                  />

                  <CheckBox
                    center
                    title="Hombre"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="rgba(0, 0, 0, 0.9)"
                    checked={this.state.men}
                    onPress={() => this._check('M')}
                  />
                </View>
                <View style={{marginTop: 40}} />
                <Button
                  success
                  onPress={() => this.nextStep()}
                  style={[
                    {backgroundColor: 'rgba(0, 0, 0, 0.9)'},
                    {
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Continuar
                  </Text>
                </Button>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {userData: state.userData};
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    changeReferredModalValue: () => dispatch(changeReferredModalValue()),
    register: user => dispatch(register(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(selectAge);
