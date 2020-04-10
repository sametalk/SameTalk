import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button, Icon, Body } from 'native-base';
import { connect } from 'react-redux';

class register extends Component {

    componentDidMount() {
        console.disableYellowBox = true;
    }

    render() {
        const { userData } = this.props
        return (
            <Container style={styles.container}>
                <ImageBackground source={require('../../../assets/image/fondo.png')} style={styles.imageBackground} imageStyle={{ opacity: 0.3 }}>
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
                            <Button full danger onPress={() => this.props.navigation.navigate('SelectAge')} >
                                <Icon type="FontAwesome" name="arrow-circle-right" style={{ color: "white" }} />
                            </Button>
                        </FooterTab>
                    </Footer>
                </ImageBackground>
            </Container>
        )
    }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
    return { userData: state.userData }
}

export default connect(mapStateToProps)(register)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F3F5'
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
    textZone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        color: '#34222e'
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
});