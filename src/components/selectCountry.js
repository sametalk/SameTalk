import React, { Component } from 'react';
import Storage from '../storage';
import {
  StyleSheet,
  View,
  PixelRatio,
  ImageBackground
} from 'react-native'
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
import { Container, Footer, FooterTab, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';

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

  componentDidMount() {
    console.disableYellowBox = true;
  }

  _selectSex = () => {
    //Storage.setItem('country', {country: this.state.cca2} )
    let objeto = this.props.navigation.state.params
    this.props.navigation.navigate('SelectSex', { data: objeto.data, date: objeto.date, country: this.state.cca2, token: objeto.token  })
  }

  render() {
    return (
      <Container>
        <ImageBackground source={require('../../assets/image/fondo4.jpg')} style={{ width: '100%', height: '100%' }}>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
            <View style={{ flex: 0.50, flexDirection: "row", justifyContent: 'center' }}>
              <Card style={{ flex: 0.80, flexDirection: "column", justifyContent: 'center' }}>

                <CardItem cardBody style={{ flex: 0.50, flexDirection: "column", justifyContent: 'center' }}>
                  <Button transparent>
                    <Text style={{ textAlign: "center" }}>Seleccione su País de residencia:</Text>
                  </Button>
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
                </CardItem>

              </Card>
            </View>
          </View>
          <Footer>
            <FooterTab>
              <Button full onPress={this._selectSex}>
                <Text>Siguiente ></Text>
              </Button>
            </FooterTab>
          </Footer>
        </ImageBackground>
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