import React, { Component } from 'react';
import Storage from '../storage';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio
} from 'react-native'
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
import { Container, Footer, Button, FooterTab } from 'native-base';

export default class selectCountry extends Component {
  constructor(props) {
    super(props)
    const userCountryData = getAllCountries()
    let callingCode = userCountryData.callingCode
    let cca2 = 'US'
    this.state = {
      cca2,
      callingCode
    }
  }

  _selectSex = () => {
    //Storage.setItem('country', {country: this.state.cca2} )
    let objeto = this.props.navigation.state.params
    this.props.navigation.navigate('SelectSex', {data: objeto.data, date: objeto.date, country: this.state.cca2})
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text style={styles.welcome}>Seleccione su País de residencia:</Text>
          <CountryPicker
            countryList={this.state.callingCode}
            onChange={value => {
              this.setState({ cca2: value.cca2, callingCode: value.callingCode })
            }}
            cca2={this.state.cca2}
            translation="eng"
          />
          <Text style={styles.instructions}>Presione aquí</Text>
          {this.state.country && (
            <Text style={styles.data}>
              {JSON.stringify(this.state.country, null, 2)}
            </Text>
          )}
        </View>
        <Footer>
          <FooterTab>
            <Button full onPress={this._selectSex}>
              <Text>Siguiente ></Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  }
})