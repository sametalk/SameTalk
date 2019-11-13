import React, { Component } from 'react';
import { Container, Icon, Button, Text, Spinner, Card, CardItem, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, ImageBackground, View } from 'react-native';
import InstagramLogin from 'react-native-instagram-login'
import { connect } from 'react-redux';
import { login } from '../actions';

class welcome extends Component {

    /*
        Una vez que nos logueamos correctamente a traves de instagram
        Se llama a la funcion login definida en acción y se lo redirige segun el caso
    */
    async _onRegister(token) {
        await this.props.login(token)
        if (!this.props.data.error) {
            this.props.navigation.navigate('TabNavigation')  // Usuario ya registrado
        } else {
            this.props.navigation.navigate('Register') // Usuario no registrado
        }
    }

    render() {
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

                                {!this.props.data.isFetching ? (
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
                                ) : (
                                        <Card>
                                            <CardItem>
                                                <Body>
                                                    <Spinner color='red' style={{ textAlign: "center" }}/>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                )}
                            </Col>
                            <Col size={1} />
                        </Row>
                    </Grid>
                </ImageBackground>
            </Container>
        );
    }
}

// Trae del storage centralizado el objeto data
const mapStateToProps = state => {
    return {
        data: state.data
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        login: (token) => dispatch(login(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(welcome)

const styles = StyleSheet.create({
    button: {
        borderRadius: 10
    }
});

