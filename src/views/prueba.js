import React, { Component } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { H3, Card, CardItem, Text, Button, Icon, Item, Label, Input, Left, Body, Form } from 'native-base';

class profile extends Component {
  state = {
    modalVisible: true
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
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
                    <Input placeholder="Nombre de usuario" />
                  </Item>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Button rounded danger onPress={() => this.setState({ modalVisible: false })} style={{ marginRight: 10 }}>
                <Text>Omitir</Text>
              </Button>
              <Button rounded info onPress={() => this.setState({ modalVisible: false })}>
                <Text>Confirmar</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </Modal>
    );
  }
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center'
  },
  card: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
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
  }
});


