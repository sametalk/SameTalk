import React, { Component } from 'react';
import { Container, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import InstagramLogin from 'react-native-instagram-login'
import { connect } from 'react-redux';
import * as actions from '../actions';

class welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            data: [],
            isReg: []
        }
    }

    /*async _onRegister(token){
        console.disableYellowBox = true;
        console.log(token)
        await fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${token}`)
            .then(response => response.json())
            .then(ar => {this.setState({ data: ar.data })})
            console.log(this.state.data.id)
        
            console.log(this.state.isReg)
        await fetch(
            `https://sametalk-backend.herokuapp.com/api/users/instagram/${this.state.data.id}`)
            .then(response => response.json())
            .then(res => this.setState({ isReg: res }))
            console.log(this.state.isReg)
            console.log(JSON.stringify(this.state.isReg)!=='{}')
        if (JSON.stringify(this.state.isReg)!=='{}') {
            this.props.navigation.navigate('Perfil', {
                token: this.state.isReg.token,
                data: this.state.isReg.data,
                country: this.state.isReg.data.countryId,
                date: this.state.isReg.data.birthDate,
                sex: this.state.isReg.data.gender
            })
        } else {
            this.props.navigation.navigate('Register', {
                token: this.state.isReg.token,
                data: this.state.isReg.data
            })
        }
    }*/

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
            id: res.data.id,
            username: res.data.username,
            full_name: res.data.full_name,
            profile_picture: res.data.profile_picture,
            bio: res.data.bio,
            follows: res.data.follows,
            followed_by: res.data.followed_by,
            age: '',
            coins: 0,
            gender: '',
            country: '',
            interests: []
        }

        this.props.userSetData(user)

        if(res2.status === "ok"){
            const response3 = await fetch(`https://sametalk-back.herokuapp.com/api/users/self?token=${res2.token}`)
            const res3 = await response3.json()
            this.props.navigation.navigate('TabNavigation')
        }else{
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

