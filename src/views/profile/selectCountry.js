import React, { Component } from 'react';
import SelectCountryComponent from '../../components/selectCountry';
import { connect } from 'react-redux';
import { userSetCountry } from '../../actions';

class SelectCountry extends Component {

  componentDidMount() {
    console.disableYellowBox = true;
  }

  handleSelect = (country) => {
    const { userSetCountry } = this.props;
    userSetCountry(country);
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
        <SelectCountryComponent handleSelect={this.handleSelect}></SelectCountryComponent>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
    return { userData: state.userData }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
      userSetCountry: (user) => dispatch(userSetCountry(user))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry)