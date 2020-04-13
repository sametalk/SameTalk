import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {
  Container,
  Header,
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
import {connect} from 'react-redux';
import {getListTags} from '../../actions';

class MyTags extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    const {getListTags, userData} = this.props;
    await getListTags(userData.token, userData.id);
  }

  onClick(tag) {
    if (tag.count > 0) {
      this.props.navigation.navigate('MyMatchsTags', {users: tag.users});
    }
  }

  render() {
    const {listTags} = this.props;
    return (
      <React.Fragment>
        {listTags.length == 0 ? (
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
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" style={{color: 'white'}} />
                </Button>

                <Title style={{color: 'white'}}>Mis etiquetas</Title>
                <View />
              </View>

              <View style={styles.container}>
                <Text style={styles.text}>¡Aún no te han etiquetado!</Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
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
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" style={{color: 'white'}} />
                </Button>

                <Title style={{color: 'white'}}>Mis etiquetas</Title>
                <View />
              </View>
              <Container>
                <Content>
                  <List>
                    {listTags.map((tag, index) => (
                      <TouchableOpacity key={index}>
                        <ListItem thumbnail onPress={() => this.onClick(tag)}>
                          <Left>
                            <Thumbnail small source={{uri: tag.image}} />
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
