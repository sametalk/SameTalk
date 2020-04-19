import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Container,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Text,
  Title,
  Button,
  Icon,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class selectAge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2016-05-15',
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*
        Obtengo los datos del usuario y le agrego la fecha de nacimiento
        Navego a Seleccionar Pais
    */
  nextStep = () => {
    const user = this.props.userData;
    user.birthdate = this.state.date;
    this.props.userSetData(user);
    this.props.navigation.navigate('SelectCountry');
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{flex: 1}}>
          <View
            style={[
              styles.header,
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
                height: 250,
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
                  Fecha de nacimiento
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 20,
                }}>
                <DatePicker
                  date={this.state.date}
                  mode="date"
                  style={{alignSelf: 'center'}}
                  format="YYYY-MM-DD"
                  minDate="1940-01-01"
                  maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderColor: 'white',
                    },
                  }}
                  onDateChange={date => {
                    this.setState({date: date});
                  }}
                />
                <View style={{marginTop: 40}} />
                <Button
                  success
                  onPress={this.nextStep}
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
        </SafeAreaView>
      </View>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {userData: state.userData};
};

export default connect(
  mapStateToProps,
  actions,
)(selectAge);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F3F5',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
