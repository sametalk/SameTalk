import React, { Component } from 'react';
import { Container, Text, Icon, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, ImageBackground, View } from 'react-native'

export default class AnatomyExample extends Component {

    _register = () => {
        this.props.navigation.navigate('Register')
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
                                <View>
                                    <Button iconLeft danger full style={styles.button} onPress={this._register}>
                                        <Icon type="AntDesign" name='instagram' />
                                        <Text>Login whit Instagram</Text>
                                    </Button>
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
})

