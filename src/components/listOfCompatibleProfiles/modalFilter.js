import React, {Component} from 'react';
import {
  Modal,
  View,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Thumbnail,
  Left,
  Body,
  Item,
  Title,
  Label,
  Input,
  Icon,
  Header,
  H1,
} from 'native-base';
import {CheckBox} from 'react-native-elements';
import SelectCountryComponent from '../../components/selectCountry';
import {TextInput} from 'react-native-gesture-handler';

class ModalMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      women: false,
      men: false,
      gender: '',
      age: null,
      country: {
        name: '',
        flag: '',
        code: '',
      },
      selectCountryModal: false,
    };
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

  onFilter() {
    const {filter} = this.props;
    filter(this.state.gender, this.state.age, this.state.country.code);
  }

  setCountry(country) {
    this.setState({country: country, selectCountryModal: false});
    this.props.selectCountry(false);
  }

  selectCountry() {
    this.props.selectCountry(true);
    this.setState({selectCountryModal: true});
  }

  render() {
    const {modalFilterVisible, closeModal} = this.props;
    return (
      <React.Fragment>
        {this.state.selectCountryModal ? (
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
                <View />

                <Title style={{color: 'white'}}>Selecciona nacionalidad</Title>
                <View />
              </View>

              <SelectCountryComponent
                handleSelect={country => this.setCountry(country)}
              />
            </SafeAreaView>
          </View>
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalFilterVisible}>
            <View style={styles.containerFilter}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    paddingBottom: 10,
                    width: '100%',
                    height: 50,
                    backgroundColor: 'white',
                    alignItems: 'center',
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
                    <H1 style={[styles.title]}>Filtrar</H1>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
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
                <View style={{paddingLeft: 20}}>
                  <Text>Edad superior a:</Text>
                  <View style={{marginTop: Platform.OS === 'ios' ? 10 : -5}} />

                  <TextInput
                    underlineColorAndroid="black"
                    keyboardType="numeric"
                    onChangeText={age => this.setState({age})}
                    value={this.state.age}
                    returnKeyType="done"
                    style={{
                      width: '80%',
                      borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
                    }}
                  />
                </View>
                <View style={{marginTop: 30}} />
                <TouchableOpacity
                  onPress={() => this.selectCountry()}
                  style={{paddingLeft: 20}}>
                  <View>
                    <Text>Nacionalidad:</Text>
                  </View>

                  <View style={{marginTop: 10}} />

                  <View
                    style={{
                      width: '80%',
                      borderColor: 'black',
                      borderBottomWidth: 0.5,
                    }}>
                    <Text
                      style={{
                        width: '80%',
                        color: 'gray',
                      }}>
                      {this.state.country.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{marginTop: 30}} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 15,
                  }}>
                  <Button
                    onPress={() => closeModal()}
                    style={[
                      styles.buttonModal,
                      {
                        width: '45%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#b32821',
                      },
                    ]}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Cerrar
                    </Text>
                  </Button>
                  <View style={{marginHorizontal: 5}} />
                  <Button
                    success
                    onPress={() => this.onFilter()}
                    style={[
                      styles.buttonModal,
                      {backgroundColor: 'rgba(0, 0, 0, 0.9)'},
                      {
                        width: '45%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Filtrar
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default ModalMatch;

const win = Dimensions.get('window');
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
