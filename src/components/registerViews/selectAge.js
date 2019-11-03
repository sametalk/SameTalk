import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Container, Footer, FooterTab, Card, CardItem, Text, Button } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class selectAge extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2016-05-15"
        }
    }

    componentDidMount() {
        console.disableYellowBox = true;
    }

    /*
        Obtengo los datos del usuario y le agrego la fecha de nacimiento
        Navego a Seleccionar Pais
    */
    _selectCountry = () => {
        const user = this.props.userData
        user.date = this.state.date
        this.props.userSetData(user)
        this.props.navigation.navigate('SelectCountry')
    }

    render() {
        return (
            <Container>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                        <View style={{ flex: 0.50, flexDirection: "row", justifyContent: 'center' }}>
                            <Card style={{ flex: 0.80, flexDirection: "column", justifyContent: 'center' }}>

                                <CardItem cardBody style={{ flex: 0.50, flexDirection: "column", justifyContent: 'center' }}>
                                    <Button transparent>
                                        <Text style={{ textAlign: "center" }}>Ingrese su fecha de nacimiento</Text>
                                    </Button>
                                    <DatePicker
                                        date={this.state.date}
                                        mode="date"
                                        style={{ alignSelf: 'center' }}
                                        format="YYYY-MM-DD"
                                        minDate="1940-01-01"
                                        maxDate="2016-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateInput: {
                                                borderColor: 'white',
                                                borderBottomColor: 'grey'
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </CardItem>

                            </Card>
                        </View>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button full onPress={this._selectCountry}>
                                <Text>Siguiente ></Text>
                            </Button>
                        </FooterTab>
                    </Footer>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {userData: state.userData}
}

export default connect(mapStateToProps, actions)(selectAge)
