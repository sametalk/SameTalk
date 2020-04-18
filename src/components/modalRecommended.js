import React, { Component } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Card, CardItem, Text, Button, Item, Input, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import { changeReferredModalValue, setRewardForRecommendation } from '../actions';
import {DARK} from '../constant/colors'; 

class ModalRecommended extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
  }

  cancel() {
    this.props.changeReferredModalValue();
  }

  setReward() {
    this.props.setRewardForRecommendation(this.state.user, this.props.userData.token);
    this.props.changeReferredModalValue();
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.showReferredModal}
          >
          <View style={styles.container}>
            <Card style={styles.card}>
              <CardItem>
                <Body style={styles.bodyTitle}>
                  <Text style={styles.title}>¿Fue recomendado por otro usuario?</Text>
                  <Text style={styles.p}>Ingrese el nombre de usuario para agradecerle:</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Item>
                      <Input 
                        placeholder="Nombre de usuario" 
                        onChangeText={(user) => this.setState({ user })} 
                        value={this.state.user} />
                    </Item>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Button rounded danger style={styles.button} onPress={() => this.cancel()}>
                  <Text>Omitir</Text>
                </Button>
                <Button rounded info style={[styles.button, {backgroundColor: DARK}]} onPress={() => this.setReward()}>
                  <Text>Confirmar</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </Modal>
    );
  }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return { 
    showReferredModal: state.showReferredModal,
    userData: state.userData
  }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
      changeReferredModalValue: () => dispatch(changeReferredModalValue()),
      setRewardForRecommendation: (user, token) => dispatch(setRewardForRecommendation(user, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRecommended)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center'
  },
  card: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
    minHeight: 200,
    borderRadius: 20
  },
  bodyTitle: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18
  },
  p: {
    fontSize: 13
  },
  button: {
    margin: 10,
    borderRadius: 8
  }
});