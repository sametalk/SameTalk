import React, { Component } from 'react';
import { Image, ImageBackground, View, StyleSheet, PixelRatio } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal'
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements';

export default class CardImageExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            women: false,
            men: false
        }
    }

    _selectInterests = () => {
        //Verifico que haya seleccionado el sexo
        if (this.state.women || this.state.men) {
            let objeto = this.props.navigation.state.params
            if (this.state.women) {
                //Storage.setItem('sex', {sex: 'Women'})
                this.props.navigation.navigate('SelectInterests', { data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Women' })
            } else {
                //Storage.setItem('sex', {sex: 'Man'})
                this.props.navigation.navigate('SelectInterests', { data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Man' })
            }


        }
    }

    //Controla los checkbox para que solo este seleccionada una opcion
    _check = (id) => {
        if (id == 'F') {
            this.setState({ women: true })
            this.setState({ men: false })
        } else {
            this.setState({ men: true })
            this.setState({ women: false })
        }
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../../assets/image/fondo7.jpg')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <View style={{ flex: 0.50, flexDirection: "row", justifyContent: 'center' }}>
                            <Card style={{ flex: 0.80, flexDirection: "column", justifyContent: 'center' }}>

                                <CardItem cardBody style={{ flex: 0.50, flexDirection: "column", justifyContent: 'center' }}>
                                    <Button transparent>
                                        <Text style={{ textAlign: "center" }}>Seleccione su Sexo:</Text>
                                    </Button>
                                    <View>
                                        <CheckBox
                                            center
                                            title='Mujer'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checkedColor='red'
                                            checked={this.state.women}
                                            onPress={() => this._check('F')}
                                        />
                                    </View>
                                    <View>
                                        <CheckBox
                                            center
                                            title='Hombre'
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checkedColor='blue'
                                            checked={this.state.men}
                                            onPress={() => this._check('M')}
                                        />
                                    </View>
                                </CardItem>

                            </Card>
                        </View>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button full onPress={() => this.props.navigation.navigate('SelectAge', { data: this.state.data })}>
                                <Text>Siguiente ></Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        fontSize: 12,
        textAlign: 'center',
        color: '#888',
        marginBottom: 5
    },
    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
})