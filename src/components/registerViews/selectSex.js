import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button } from 'native-base';
import storage from '../../storage';
import { CheckBox } from 'react-native-elements';

export default class selectAge extends Component {

    constructor(props) {
        super(props)
        this.state = {
            women: false,
            men: false,
            gender: ''
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }

    _selectInterests = () => {
        
        //Verifico que haya seleccionado el sexo
        console.log(this.state.men +"+"+ this.state.women)
        if (this.state.women || this.state.men) {
            let objeto = this.props.navigation.state.params
            this.props.navigation.navigate('SelectInterests', { data: objeto.data, date: objeto.date, country: objeto.country, sex: this.state.gender })
        }

    }

    //Controla los checkbox para que solo este seleccionada una opcion
    _check = (id) => {
        if (id == 'F') {
            this.setState({ women: true,
                            men: false,
                            gender: 'Women' })
        } else {
            this.setState({ women: false,
                            men: true,
                            gender: 'Men' })
        }
    }

    render() {
        return (
            <Container>
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
            </Container>
        )
    }
}
