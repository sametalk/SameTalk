import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Input } from 'react-native-elements';
import { Button, Content } from 'native-base';
import { thisExpression } from '@babel/types';
import Ins from "react-native-instagram-login";

export default class register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2016-05-15",
            token: '',
            data: [],
            country: ''
        }
    }

    _selectInterests = () => {
        this.props.navigation.navigate('SelectInterests', {data: this.state.data, date: this.state.date, country: this.state.country})
    }

    //guardo token ni bien llego a esta pagina
    async componentDidMount() {
        let objeto = this.props.navigation.state.params;
        this.setState({ token: objeto.token });
        const response = await fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${objeto.token}`
        );
        const ar = await response.json();
        this.setState({ data: ar.data})
    }

    render() {
        console.log(this.state.data);
        return (
            <View style={styles.container}>
                <View style={styles.nameZone}>
                    <Text style={styles.name}>
                        {this.state.data.full_name}
                    </Text>
                </View>

                <View style={styles.imageZone}>
                    <Image
                        style={styles.image}
                        source={{uri: this.state.data.profile_picture}}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.nacimiento}>
                        Nacimiento:
                        </Text>
                    <DatePicker
                        date={this.state.date}
                        mode="date"
                        style={{ alignSelf: 'center' }}
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
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

                <View style={styles.inputGroup}>
                    <View style={styles.textZone}>
                        <Text style={styles.text}>
                            País:
                        </Text>
                    </View>
                    <View style={styles.inputZone}>
                        <Input />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <View style={styles.textZone}>
                        <Text style={styles.text}>
                            Sexo:
                        </Text>
                    </View>
                    <View style={styles.inputZone}>
                        <Input />
                    </View>
                </View>

                <View style={styles.buttonZone}>
                    <Button full onPress={this._selectInterests}>
                        <Text>Siguiente ></Text>
                    </Button>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    nameZone: {
        flex: 0.75,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    name: {
        fontSize: 35,
        alignSelf: 'flex-end',
    },
    imageZone: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: '50%',
        height: 'auto',
        borderRadius: 15
    },
    inputGroup: {
        flex: 0.75,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    textZone: {
        flex: 0.50,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        alignSelf: 'flex-end',
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
    nacimiento: {
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        fontSize: 20,
    },
    inputZone: {
        flex: 1,
        flexDirection: 'column',
        marginRight: '15%'
    },
    datePicker: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    buttonZone: {
        flex: 0.50
    }
});