import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {
  Container,
  Content,
  List,
  Icon,
  Title,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {connect} from 'react-redux';
import {getListMatchs} from '../../actions';
import {DARK, WHITE} from '../../constant/colors'; 

class ListMatchs extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    const {getListMatchs, userData} = this.props;
    await getListMatchs(userData.token);
  }

  render() {
    const {listMatchs} = this.props;
    return (
      <React.Fragment>
        {listMatchs.length == 0 ? (
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

                <Title style={{color: 'white'}}>Mis matchs</Title>
                <View />
              </View>

              <View style={styles.container}>
                <Text style={styles.text}>¡Aún no posee matchs!</Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
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

                <Title style={{color: 'white'}}>Mis matchs</Title>
                <View />
              </View>
              <Container style={{backgroundColor: WHITE}}>
                <Content>
                  <List>
                    {listMatchs.map((l, index) => (
                      <ListItem thumbnail key={index}>
                        <Left>
                          <Thumbnail
                            square
                            source={{uri: l.user.profile_picture}}
                          />
                        </Left>
                        <Body>
                          <Text>{l.user.full_name}</Text>
                          <Text note numberOfLines={1}>
                            {l.user.username}
                          </Text>
                        </Body>
                        <Right>
                          <Button
                            transparent
                            onPress={() =>
                              this.props.navigation.navigate('MatchProfile', {
                                profile: l.user,
                              })
                            }>
                            <Text note>Ver</Text>
                          </Button>
                        </Right>
                      </ListItem>
                    ))}
                  </List>
                </Content>
              </Container>
            </SafeAreaView>
          </View>
        )}
      </React.Fragment>
    );
  }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
  return {
    userData: state.userData,
    listMatchs: state.listMatchs,
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    getListMatchs: token => dispatch(getListMatchs(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListMatchs);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: 'gray',
  },
});
