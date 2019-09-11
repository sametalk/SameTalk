import React, { Component } from 'react';
import { Container, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import InstagramLogin from 'react-native-instagram-login'

export default class Welcome extends Component {

    _register = () => {
        
        this.props.navigation.navigate('Register', { codigo: this.state.token })
    }

    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
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
                                                <Text>Login whit Instagram</Text>
                                            </Button>
                                            <InstagramLogin
                                                ref={ref => this.instagramLogin = ref}
                                                clientId='c222a1cb5aa94671adc8c085a2d1aaf4'
                                                redirectUrl='https://google.com'
                                                scopes={['basic']}
                                                onLoginSuccess={token => navigation.navigate('Register', {token:token})}
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

const styles = StyleSheet.create({
    button: {
        borderRadius: 10
    }
});

