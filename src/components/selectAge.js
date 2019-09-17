import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Footer, Button, Text, FooterTab } from 'native-base';
import DatePicker from 'react-native-datepicker';
import Storage from '../storage';

export default class selectAge extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2016-05-15"
        }
    }

    _selectCountry = () => {
        //Storage.setItem('date', '2016')
        let objeto = this.props.navigation.state.params
        this.props.navigation.navigate('SelectCountry', {data: objeto.data, date: this.state.date})
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={styles.nacimiento}>
                        Seleccione su fecha de nacimiento:
                    </Text>
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