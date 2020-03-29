import React, { Component } from 'react';
import { StyleSheet, Image, View, ImageBackground, Linking } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, Button, Icon } from 'native-base';

class MatchProfile extends Component {
  render() {
    const { navigation } = this.props;
    const profile = navigation.getParam('profile');
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={require('../../../assets/image/fondo.png')} style={styles.imageBackground} imageStyle={{ opacity: 0.3 }}>
          <View style={styles.content}>  
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Thumbnail small source={{ uri: "data:image/png;base64,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" }} />
                  <Body>
                    <Text>{profile.full_name}</Text>
                    <Text note>{profile.age} Años</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: profile.profile_picture }} style={styles.profile} />
              </CardItem>
              <CardItem>
                <Button
                  rounded
                  success
                  onPress={() => Linking.openURL("https://www.instagram.com/" + profile.username)}
                  style={[styles.buttonModal, { backgroundColor: "#4B62A5" }]}>
                  <Text>Seguir <Icon type="FontAwesome" name="instagram" style={styles.iconButton} /></Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default MatchProfile


const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  card: {
    width: 320,
    paddingBottom: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
  },
  profile: {
    flex: 1,
    width: null,
    height: 300
  },
  buttonModal: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 20
  },
  iconButton: {
    color: "white",
    fontSize: 20,
  },
});