import React, {Component} from 'react';
import SelectCountryComponent from '../../components/selectCountry';
import {connect} from 'react-redux';
import {userSetCountry} from '../../actions';
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Title, Button, Icon} from 'native-base';
import * as actions from '../../actions';

class selectCountry extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*
        Obtengo los datos del usuario y le agrego el pais
        Navego a Seleccionar Genero
  */
  nextStep = country => {
    const {userData} = this.props;
    userData.country_id = country.code;
    this.props.userSetData(userData);
    this.props.navigation.navigate('SelectSex');
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

            <Title style={{color: 'white'}}>Selecciona nacionalidad</Title>
            <View />
          </View>
          <SelectCountryComponent
            handleSelect={country => this.nextStep(country)}
          />
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  /*--------------Modal Filter CSS--------------*/
  buttonModal: {
    width: '48%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  containerFilter: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  cardFilter: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
    minHeight: 350,
    borderRadius: 20,
  },

  iconButton: {
    color: 'white',
    fontSize: 20,
  },
  containerFilterMatch: {
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 20,
  },
  cardFilterMatch: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
    borderRadius: 20,
  },

  iconButtonMatch: {
    color: 'white',
    fontSize: 20,
  },

  /*---------- Countries ---------*/
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 5,
    borderColor: '#cccccc',
    backgroundColor: '#f5f5f5',
  },
  buttonCountry: {
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  title: {
    color: 'white',
    fontSize: 22,
  },
});
// Trae del Storage Centralizado el objeto userData

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {
    userData: state.userData,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(selectCountry);
