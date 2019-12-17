import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button, Icon } from 'native-base';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { register } from '../../actions';

class selectAge extends Component {

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

    /*
        Verifico que se haya seleccionado un genero
        Obtengo los datos del usuario y le agrego el genero
        Registro en el servidor el nuevo usuario
        Navego a la vista de usuario registrado
    */
    async _selectInterests() {
        if (this.state.women || this.state.men) {
            const user = this.props.userData
            user.gender = this.state.gender
            await this.props.register(user)
            this.props.navigation.navigate('TabNavigation')
        }

    }

    //Controla los checkbox para que solo este seleccionada una opcion
    _check = (id) => {
        if (id == 'F') {
            this.setState({
                women: true,
                men: false,
                gender: 'W'
            })
        } else {
            this.setState({
                women: false,
                men: true,
                gender: 'M'
            })
        }
    }

    render() {
        return (
            <Container style={styles.container}>
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
                        <Button full danger onPress={() => this._selectInterests()}>
                            <Icon type="FontAwesome" name="arrow-circle-right" style={{ color: "white" }} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
    return { userData: state.userData }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        register: (user) => dispatch(register(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(selectAge)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fee9d7'
    }
})

