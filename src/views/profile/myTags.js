import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Icon,
  Title,
  Body,
  Right,
  Button,
} from 'native-base';
import { connect } from 'react-redux';
import { getListTags, discountCoins } from '../../actions';
import AwesomeAlert from 'react-native-awesome-alerts';

class MyTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        show: false,
        showConfirmButton: true,
      },
      users: {}
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    const { getListTags, userData } = this.props;
    await getListTags(userData.token, userData.id);
  }

  calculateCoinsForSuperLike() {
    let coins = this.props.userData.coins;
    let permitted = true;

    if (coins - 10 <= 0) {
      permitted = false;
    }

    this.setState({
      alert: {
        show: true,
        showConfirmButton: permitted,
      },
    });
  }

  onClick(tag) {
    if (tag.count > 0) {
      this.setState({
        users: tag.users
      });
      this.calculateCoinsForSuperLike();
    }
  }

  render() {
    const { listTags, userData, discountCoins } = this.props;
    return (
      <React.Fragment>
        {listTags.length == 0 ? (
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
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
                  <Icon name="arrow-back" style={{ color: 'white' }} />
                </Button>

                <Title style={{ color: 'white' }}>Mis etiquetas</Title>
                <View />
              </View>

              <View style={styles.container}>
                <Text style={styles.text}>¡Aún no te han etiquetado!</Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
            <React.Fragment>
              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
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
                      <Icon name="arrow-back" style={{ color: 'white' }} />
                    </Button>

                    <Title style={{ color: 'white' }}>Mis etiquetas</Title>
                    <View />
                  </View>
                  <Container>
                    <Content>
                      <List>
                        {listTags.map((tag, index) => (
                          <TouchableOpacity key={index}>
                            <ListItem thumbnail onPress={() => this.onClick(tag)}>
                              <Left>
                                <Thumbnail small source={{ uri: tag.image }} />
                              </Left>
                              <Body>
                                <Text>{tag.name}</Text>
                              </Body>
                              <Right>
                                <Text>{tag.count}</Text>
                              </Right>
                            </ListItem>
                          </TouchableOpacity>
                        ))}
                      </List>
                    </Content>
                  </Container>
                </SafeAreaView>
              </View>
              <AwesomeAlert
                show={this.state.alert.show}
                showProgress={false}
                title="¿Quieres ver quien te etiqueto?"
                message={
                  this.state.alert.showConfirmButton
                    ? 'Se te descontarán 10 monedas'
                    : 'Necesitas 10 monedas, comparte nuestra aplicación con tus amigos y obtenlas'
                }
                messageStyle={{ textAlign: 'center' }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={this.state.alert.showConfirmButton}
                cancelText={
                  this.state.alert.showConfirmButton ? 'No, cancelar' : 'Salir'
                }
                confirmText="Si, continuar"
                cancelButtonColor="#d9534f"
                confirmButtonColor="#4B62A5"
                onCancelPressed={() => {
                  this.setState({
                    alert: {
                      show: false,
                    },
                  });
                }}
                onConfirmPressed={() => {
                  this.setState({
                    alert: {
                      show: false,
                    },
                  });
                  discountCoins(userData);
                  this.props.navigation.navigate('MyMatchsTags', { users: this.state.users });
                }}
              />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
  return {
    userData: state.userData,
    listTags: state.listTags,
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    getListTags: (token, id) => dispatch(getListTags(token, id)),
    discountCoins: user => dispatch(discountCoins(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTags);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
