import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Button,
  Container,
  Icon,
  Title,
  Text,
  Content,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {updateUser} from '../../actions';
import CheckIcon from 'react-native-vector-icons/Entypo';
import {DARK, WHITE} from '../../constant/colors'; 

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namePlaceholder: this.props.userData.full_name,
      name: null,
      date: this.props.userData.birthdate,
    };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  editProfile() {
    const {userData, updateUser} = this.props;
    userData.birthdate = this.state.date;
    userData.full_name = this.state.name
      ? this.state.name
      : this.state.namePlaceholder;
    updateUser(userData);
    this.props.navigation.navigate('Profile');
  }

  render() {
    const {userData} = this.props;
    return (
      <React.Fragment>
        <View style={{flex: 1, backgroundColor: DARK}}>
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
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{color: 'white'}} />
              </Button>

              <Title style={{color: 'white'}}>Configuración</Title>
              <Button
                transparent
                onPress={() => {
                  this.editProfile();
                  this.props.navigation.goBack();
                }}>
                <CheckIcon
                  name="check"
                  size={25}
                  style={{color: 'white', marginRight: 10}}
                />
              </Button>
            </View>
            <Container style={{backgroundColor: WHITE}}>
              <Content style={{paddingHorizontal: 20, marginTop: 20}}>
                <View style={{paddingLeft: 17}}>
                  <Text style={{marginLeft: 3}}>Nombre</Text>
                  <View style={{marginTop: Platform.OS === 'ios' ? 10 : -5}} />

                  <TextInput
                    underlineColorAndroid="lightgray"
                    keyboardType="text"
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                    placeholder={this.state.namePlaceholder}
                    placeholderTextColor="gray"
                    returnKeyType="done"
                    style={{
                      color: 'gray',
                      width: '100%',
                      borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
                    }}
                  />
                </View>
                <View style={{marginTop: 20}} />
                <View style={{paddingLeft: 20}}>
                  <Text>Fecha de nacimiento</Text>
                  <View
                    style={{
                      width: '100%',
                      borderBottomWidth: 1,
                      borderColor: 'lightgray'
                    }}>
                    <DatePicker
                      date={this.state.date}
                      mode="date"
                      format="YYYY-MM-DD"
                      minDate="1940-01-01"
                      maxDate="2016-06-01"
                      confirmBtnText="Confirmar"
                      cancelBtnText="Cancelar"
                      showIcon={false}
                      style={{
                        width: '100%',
                        height: 30,
                      }}
                      customStyles={{
                        dateInput: {
                          height: 20,
                          margin: 0,
                          padding: 0,
                          borderWidth: 0,
                          alignItems: 'flex-start',
                        },
                        dateText: {
                          fontSize: 14,
                          color: 'gray'
                        }                        
                      }}
                      onDateChange={date => {
                        this.setState({date: date});
                      }}
                    />
                  </View>
                </View>

                <View style={{marginTop: 30}} />

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SelectCountry')
                  }
                  style={{paddingLeft: 20}}>
                  <View>
                    <Text>Nacionalidad</Text>
                  </View>

                  <View style={{marginTop: 10}} />

                  <View
                    style={{
                      width: '100%',
                      borderColor: 'lightgray',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        width: '80%',
                        color: 'gray',
                      }}>
                      {userData.country.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Content>
            </Container>
          </SafeAreaView>
        </View>
      </React.Fragment>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {userData: state.userData};
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formGroup: {
    flex: 0.9,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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
    borderColor: '#cccccc',
    backgroundColor: '#f5f5f5',
  },
  button: {
    borderRadius: 10,
  },
});
