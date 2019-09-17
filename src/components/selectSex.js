import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button } from 'native-base';
import storage from '../storage';
import { CheckBox } from 'react-native-elements';

export default class selectAge extends Component {

    constructor(props) {
        super(props)
        this.state = {
            women: false,
            men: false
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }
    async _selectInterests(){
        
        //Verifico que haya seleccionado el sexo
        if (this.state.women || this.state.men) {
            let objeto = this.props.navigation.state.params
            let gender = '';
            if (this.state.women) {
                //Storage.setItem('sex', {sex: 'Women'})
                gender = 'F'
                this.props.navigation.navigate('SelectInterests', { data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Women' })
            } else {
                //Storage.setItem('sex', {sex: 'Man'})
                gender = 'M'
                this.props.navigation.navigate('SelectInterests', { data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Man' })
            }
            console.disableYellowBox = true;
            const data = {
                token: objecto.token,
                data: objeto.data,
                birth_date: objeto.date,
                gender: gender,
                country_id: objeto.country  
            };
            const response = await fetch("https://sametalk-backend.herokuapp.com/api/users/", {
                method: "POST", 
                body: JSON.stringify(data), 
                headers: {
                "Content-Type": "application/json"
                }
            });
            const ar = await response.json();
            this.setState({data: ar})
            console.log(this.data)
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
                            <Button full onPress={this._selectInterests}>
                                <Text>Siguiente ></Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </ImageBackground>
            </Container>
        )
    }
}
