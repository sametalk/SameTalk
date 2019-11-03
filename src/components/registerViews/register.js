import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Container, Footer, FooterTab, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import { connect } from 'react-redux';

class register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: '',
            data: []
        }
    }

    //guardo token ni bien llego a esta pagina
    /* async componentDidMount() {
         console.disableYellowBox = true;
         let objeto = this.props.navigation.state.params;
         this.setState({ token: objeto.token });
         const response = await fetch(
             `https://api.instagram.com/v1/users/self/?access_token=${objeto.token}`
         );
         const ar = await response.json();
         //Storage.setItem('data', ar.data);
         this.setState({ data: ar.data })
         console.log(this.state.token)
     }*/

    componentDidMount() {
        console.disableYellowBox = true;
    }

    render() {
        const {userData} = this.props
        return (
            <Container>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <View style={{ flex: 0.90, flexDirection: "row", justifyContent: 'center' }}>
                            <Card style={{ flex: 0.90, flexDirection: "column", alignSelf: 'center' }}>

                                <CardItem style={{ flexDirection: "column" }}>
                                    <Text>Bienvenido a Same Talk</Text>
                                    <Text note>{userData.full_name}</Text>
                                </CardItem>
                                <CardItem cardBody style={{ flex: 0.50, flexDirection: "row", alignSelf: 'center' }}>
                                    <Avatar
                                        rounded
                                        size="xlarge"
                                        source={{ uri: userData.profile_picture }}
                                    />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Button transparent>
                                            <Text style={{ textAlign: "center" }}>Complete los datos para finalizar su registro</Text>
                                        </Button>
                                    </Body>
                                </CardItem>

                            </Card>
                        </View>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button full onPress={() => this.props.navigation.navigate('SelectAge')}>
                                <Text>Siguiente ></Text>
                            </Button>
                        </FooterTab>
                    </Footer>
            </Container>
        )}
}

const mapStateToProps = state => {
    return {userData: state.userData}
}

export default connect(mapStateToProps)(register)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    welcome: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        alignSelf: "flex-end"
    },
    avatarZone: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatar: {
        alignSelf: 'flex-end'
    },
    nameZone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    name: {
    },
    textZone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {

    }
});