import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Button, Container, Footer, FooterTab, Text } from 'native-base';
import Storage from '../storage';

export default class register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: '',
            data: []
        }
    }

    //guardo token ni bien llego a esta pagina
    async componentDidMount() {
        let objeto = this.props.navigation.state.params;
        this.setState({ token: objeto.token });
        const response = await fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${objeto.token}`
        );
        const ar = await response.json();
        //Storage.setItem('data', ar.data);
        this.setState({ data: ar.data })
        console.log(this.state.token)
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.welcome}>
                        <Text style={styles.title}>
                            ¡Bienvenido a Same Talk!
                            </Text>
                    </View>

                    <View style={styles.avatarZone}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: this.state.data.profile_picture }}
                            containerStyle={styles.avatar}
                        />
                    </View>

                    <View style={styles.nameZone}>
                        <Text style={styles.name}>
                            Nicolás Montoya
                            </Text>
                    </View>

                    <View style={styles.textZone}>
                        <Text style={styles.text}>
                            Complete algunos datos para finalizar su registro...
                        </Text>
                    </View>
                </View>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => this.props.navigation.navigate('SelectAge',{data: this.state.data})}>
                            <Text>Siguiente ></Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}


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
    avatar:{
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