import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SelectCountryComponent from '../../components/selectCountry'

class selectCountry extends Component {

  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*
        Obtengo los datos del usuario y le agrego el pais
        Navego a Seleccionar Genero
  */
  nextStep = (country) => {
    const {userData} = this.props
    userData.country_id = country.code
    this.props.userSetData(userData)
    this.props.navigation.navigate('SelectSex')
  }

  render() {
    return (
        <SelectCountryComponent handleSelect={(country) => this.nextStep(country)}></SelectCountryComponent>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {
    userData: state.userData
  }
}

export default connect(mapStateToProps, actions)(selectCountry)