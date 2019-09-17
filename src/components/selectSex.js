import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Footer, Button, Text, FooterTab } from 'native-base';
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

    _selectInterests = () => {
        //Verifico que haya seleccionado el sexo
        if (this.state.women || this.state.men){
            let objeto = this.props.navigation.state.params
            if (this.state.women){
                //Storage.setItem('sex', {sex: 'Women'})
                this.props.navigation.navigate('SelectInterests', {data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Women'})
            }else{
                //Storage.setItem('sex', {sex: 'Man'})
                this.props.navigation.navigate('SelectInterests', {data: objeto.data, date: objeto.date, country: objeto.country, sex: 'Man'})
            }
            

        }
    }

    //Controla los checkbox para que solo este seleccionada una opcion
    _check = (id) => {
        if (id == 'F'){
            this.setState({women: true})
            this.setState({men: false})
        }else{
            this.setState({men: true})
            this.setState({women: false})
        }
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.nacimiento}>
                            Seleccione su sexo:
                        </Text>
                    </View>
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
    nacimiento: {
        fontSize: 20,
        alignSelf: "center"
    }
});