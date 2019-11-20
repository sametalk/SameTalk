import React, { Component } from 'react';
import { Container, Icon, Button, Text, Spinner } from 'native-base';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import InstagramLogin from 'react-native-instagram-login'
import { connect } from 'react-redux';
import { login } from '../actions';
import { blue } from 'ansi-colors';

class welcome extends Component {

    /*
        Una vez que nos logueamos correctamente a traves de instagram
        Se llama a la funcion login definida en acción y se lo redirige segun el caso
    */
    async _onRegister(token) {
        await this.props.login(token)
        if (!this.props.fetchData.error) {
            this.props.navigation.navigate('TabNavigation')  // Usuario ya registrado
        } else {
            this.props.navigation.navigate('Register') // Usuario no registrado
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <ImageBackground source={require('../../assets/image/fondoWelcome.png')} style={{ width: '100%', height: '100%' }}>
                    {!this.props.fetchData.isFetching ? (
                        <React.Fragment>
                            <View style={styles.logo}>
                                <Image source={require('../../assets/image/logoWelcome.png')} style={styles.image} resizeMode='contain' />
                            </View>
                            <View style={styles.buttonZone}>
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
                        </React.Fragment>
                    ) : (
                            <View style={styles.loading}>
                                <View style={styles.loadingItem}>
                                    <Spinner color='red' style={{ textAlign: "center" }} />
                                    <Text style={{ textAlign: "center", color: "red" }} >Loading...</Text>
                                </View>
                            </View>
                        )}
                </ImageBackground>
            </Container>
        );
    }
}

// Trae del storage centralizado el objeto data
const mapStateToProps = state => {
    return {
        fetchData: state.fetchData
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
    container: {
        flex: 1
    },
    logo: {
        flex: 2.2,
        alignContent: 'flex-end'
    },
    buttonZone: {
        flex: 1.2,
        justifyContent: 'flex-start'
    },
    button: {
        width: "60%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 10
    },
    image: {
        alignSelf: "center",
        width: 400,
        height: 500,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
    loadingItem: {
        height: 300,
        width: 300,
        borderRadius: 20,
        borderColor: "black",
        opacity: 0.95,
        backgroundColor: "white",
        justifyContent: "center",
        alignSelf: "center"
    }
});

