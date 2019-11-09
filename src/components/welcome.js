import React, { Component } from 'react';
import { Container, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import InstagramLogin from 'react-native-instagram-login'
import { connect } from 'react-redux';
import * as actions from '../actions';

class welcome extends Component {

    async _onRegister(token){

        const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
        const res = await response.json()

        const response2 = await fetch(`https://sametalk-back.herokuapp.com/api/auth/login`,{
            method: "POST",
            body: JSON.stringify({instagram_id: res.data.id}),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
        })
        res2 = await response2.json()

        const user = {
            token: '',
            instagram_id: res.data.id,
            username: res.data.username,
            full_name: res.data.full_name,
            profile_picture: res.data.profile_picture,
            bio: res.data.bio,
            follows: res.data.counts.follows,
            followed_by: res.data.counts.followed_by,
            age: '',
            coins: 0,
            gender: '',
            country_id: '',
            interests: []
        }

        if(res2.status === "ok"){
            const response3 = await fetch(`https://sametalk-back.herokuapp.com/api/users/self?token=${res2.token}`)
            const res3 = await response3.json()
            console.log(res3)
            user.token = res2.token
            user.age = res3.age
            user.coins = res3.coins
            user.gender = res3.gender
            user.country_id = res3.country
            this.props.userSetData(user)
            this.props.navigation.navigate('TabNavigation')
        }else{
            this.props.userSetData(user)
            this.props.navigation.navigate('Register')
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <Container>
                    <ImageBackground source={require('../../assets/image/fondo.jpg')} style={{ width: '100%', height: '100%' }}>
                        <Grid>
                            <Row size={1}></Row>
                            <Row size={1}>
                            </Row>
                            <Row size={1}>
                                <Col size={1} />
                                <Col size={3.5}>
                                    <View>
                                        <View>
                                            <Button iconLeft danger full style={styles.button} onPress={() => this.instagramLogin.show()}>
                                                <Icon type="AntDesign" name='instagram' />
                                                <Text>Login with Instagram</Text>
                                            </Button>
                                            <InstagramLogin
                                                ref={ref => this.instagramLogin = ref}
                                                clientId='c222a1cb5aa94671adc8c085a2d1aaf4'
                                                redirectUrl='https://google.com'
                                                scopes={['basic']}
                                                //onLoginSuccess={token => navigation.navigate('Register', {token:token})}
                                                onLoginSuccess={token => this._onRegister(token)}
                                                onLoginFailure={data => this.setState({ failure: data })}
                                                cacheEnabled={false}
                                                incognito={true}
                                                thirdPartyCookiesEnabled={false}
                                                sharedCookiesEnabled={false}
                                                domStorageEnabled={false}
                                            />
                                        </View>
                                    </View>
                                </Col>
                                <Col size={1} />
                            </Row>
                        </Grid>
                    </ImageBackground> 
            </Container>
        );
    }
}

export default connect(null, actions)(welcome)

const styles = StyleSheet.create({
    button: {
        borderRadius: 10
    }
});

