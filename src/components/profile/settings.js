import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button, Icon, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'

class Settings extends Component {

  constructor(props) {
    super(props)
    const userCountryData = getAllCountries()
    this.state = {
      date: "2016-05-15",
      cca2: 'AR',
      callingCode: userCountryData.callingCode,
      women: false,
      men: false,
      gender: '',
      name: this.props.userData.full_name,
      age: this.props.userData.age
    }
  }

  setField (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
          <View style={{ flex: 0.80, flexDirection: "row", justifyContent: 'center' }}>
            <Card style={{ flex: 0.80, flexDirection: "column", justifyContent: 'center' }}>
              <CardItem cardBody style={{ flex: 0.50, flexDirection: "column", justifyContent: 'center' }}>
                <Button transparent>
                  <Text style={{ textAlign: "center" }}>Nombre de usuario:</Text>
                </Button>
                <Item style={{ width: "80%" }}>
                  <Input onChange={(e)=>this.setField(e)} name="name"/>
                </Item>
                <Button transparent>
                  <Text style={{ textAlign: "center" }}>Ingrese su edad</Text>
                </Button>
                <Item style={{ width: "80%" }}>
                  <Input keyboardType="numeric" onChange={(e)=>this.setField(e)} name="age"/>
                </Item>
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
            <Button full danger onPress={() => console.log(this.state)}>
              <Text>Confirmar </Text>
              <Icon type="FontAwesome" name="check-circle" style={{ color: "white" }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return { userData: state.userData }
}

export default connect(mapStateToProps, actions)(Settings)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fee9d7'
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
