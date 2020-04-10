import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Icon,
  Item,
  Input,
  Label,
  Text,
  Thumbnail
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';

class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: this.props.userData.full_name,
      date: this.props.userData.birthdate
    }
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  editProfile() {
    const { userData, updateUser } = this.props;
    userData.birthdate = this.state.date;
    userData.full_name = this.state.name;
    updateUser(userData);
    this.props.navigation.navigate('Profile');
  }

  render() {
    const { userData } = this.props;
    return (
      <React.Fragment>
        <Container>
          <View style={styles.content}>
            <View style={styles.formGroup}>
              <View style={styles.input}>
                <Item stackedLabel>
                  <Label>Nombre de usuario</Label>
                  <Input onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                </Item>
              </View>
              <View style={styles.input}>
                <Item stackedLabel last>
                  <Label>Edad</Label>
                  <DatePicker
                      date={this.state.date}
                      mode="date"
                      style={{ alignSelf: 'center' }}
                      format="YYYY-MM-DD"
                      minDate="1940-01-01"
                      maxDate="2016-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                          dateInput: {
                              borderColor: 'white',
                              borderBottomColor: 'grey'
                          }
                      }}
                      onDateChange={(date) => { this.setState({ date: date }) }}
                  />                  
                </Item>
              </View>
              <View style={styles.inputGroup}>
                <View style={styles.country}>
                  <Label> {userData.country.name} </Label>
                  <Thumbnail
                    small
                    source={{ uri: userData.country.flag }} />
                </View>
                <Button danger style={styles.button} onPress={() => this.props.navigation.navigate('SelectCountry')}>
                  <Text> Elegir </Text>
                </Button>
              </View>
            </View>
          </View>
          <Footer>
            <FooterTab>
              <Button full danger onPress={() => this.editProfile()}>
                <Text>Confirmar </Text>
                <Icon type="FontAwesome" name="check-circle" style={{ color: "white" }} />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </React.Fragment>
    )
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return { userData: state.userData }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  formGroup: {
    flex: 0.9
  },
  input: {
    flex: 1,
    justifyContent: 'center'
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    borderRadius: 10
  }
})