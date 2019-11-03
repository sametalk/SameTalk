import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import * as actions from '../../actions';

class selectCountry extends Component {
  constructor(props) {
    super(props)
    const userCountryData = getAllCountries()
    this.state = {
      cca2: 'US',
      callingCode: userCountryData.callingCode
    }
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*
        Obtengo los datos del usuario y le agrego el pais
        Navego a Seleccionar Genero
  */
  _selectSex = () => {
    const user = this.props.userData
    user.country = this.state.cca2
    this.props.userSetData(user)
    this.props.navigation.navigate('SelectSex')
  }

  render() {
    return (
      <Container>
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
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {userData: state.userData}
}

export default connect(mapStateToProps, actions)(selectCountry)

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