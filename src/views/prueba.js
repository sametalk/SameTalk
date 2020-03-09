import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  View
} from 'react-native';
import { Header, Card, CardItem, Text, Left, Body, Button, H1, Icon, Item, Label, Input, Thumbnail, Right } from 'native-base';
import { CheckBox } from 'react-native-elements';
import SelectCountryComponent from '../../src/components/selectCountry';

class Prueba extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalFilterVisible: true,
      women: false,
      men: false,
      gender: '',
      selectCountryModal: false,
      age: null,
      country: null,
    };
  }

  //Controla los checkbox para que solo este seleccionada una opcion
  _check = (id) => {
    if (id == 'F') {
      this.setState({
        women: true,
        men: false,
        gender: 'W'
      })
    } else {
      this.setState({
        women: false,
        men: true,
        gender: 'M'
      })
    }
  }

  setCountry(country) {
    this.setState({ country: country, selectCountryModal: false });
    console.log(this.state.country);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selectCountryModal ? (
          <SelectCountryComponent handleSelect={(country) => this.setCountry(country)}></SelectCountryComponent>
        ) : (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalFilterVisible}
            >
              <View style={styles.containerFilter}>
                <Card style={styles.cardFilter}>
                  <CardItem>
                    <Text>Ingrese los campos por los que quiere filtrar</Text>
                  </CardItem>
                  <CardItem >
                    <CheckBox
                      center
                      title='Mujer'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checkedColor='red'
                      checked={this.state.women}
                      onPress={() => this._check('F')}
                    />
                    <CheckBox
                      center
                      title='Hombre'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checkedColor='blue'
                      checked={this.state.men}
                      onPress={() => this._check('M')}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Body>
                        <Item stackedLabel>
                          <Label>Edad superior a:</Label>
                          <Input keyboardType="numeric" onChangeText={(age) => this.setState({ age })} value={this.state.age} />
                        </Item>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <View style={styles.country}>
                      <Label> Argentina </Label>
                      <Thumbnail
                        small
                        source={{ uri: "" }} />
                    </View>
                    <Button danger style={styles.buttonCountry} onPress={() => this.setState({ selectCountryModal: true })}>
                      <Text> Elegir </Text>
                    </Button>
                  </CardItem>
                  <CardItem>
                    <Button rounded danger onPress={() => this.setState({ modalFilterVisible: false })} style={{ marginRight: 10 }}>
                      <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={styles.iconButton} /></Text>
                    </Button>
                    <Button rounded success onPress={() => this.setState({ modalVisible: false })}>
                      <Text>Filtrar <Icon type="FontAwesome" name='filter' style={styles.iconButton} /></Text>
                    </Button>
                  </CardItem>
                </Card>
              </View>
            </Modal>
          )}
      </React.Fragment>
    );
  }
}
export default Prueba

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    alignItems: 'center',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: '#F1F3F5'
  },
  modal: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  card: {
    width: 320,
    height: 470,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: 'white'
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15
  },
  green: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
  profile: {
    height: 345, width: null, flex: 1
  },

  /*--------------Modal Filter CSS--------------*/
  containerFilter: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  },
  cardFilter: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
    minHeight: 350,
    borderRadius: 20
  },
  iconButton: {
    color: "white",
    fontSize: 15,
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
    borderRadius: 10
  }
});
