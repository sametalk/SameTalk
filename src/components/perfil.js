import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem , Avatar} from 'react-native-elements';
import { Text, Button} from 'native-base';
import Storage from '../storage';

const list = [
    {
        id: 1,
        name: 'Deporte',
        avatar_url: require('../../assets/image/deporte.jpg')
    },
    {
        id: 2,
        name: 'Politica',
        avatar_url: require('../../assets/image/politica.jpg')
    },
    {
        id: 3,
        name: 'Arte',
        avatar_url: require('../../assets/image/arte.jpeg')
    },
    {
        id: 4,
        name: 'Economia',
        avatar_url: require('../../assets/image/economia.jpg')
    },
    {
        id: 5,
        name: 'Cultura',
        avatar_url: require('../../assets/image/cultura.jpg')
    },
    {
        id: 6,
        name: 'Entretenimiento',
        avatar_url: require('../../assets/image/entretenimiento.jpg')
    }
];

export default class perfil extends Component {

    componentDidMount() {
        console.disableYellowBox = true;
        let objeto = this.props.navigation.state.params
        console.log(objeto.data)
        this.setState({ data: objeto.data });
        this.setState({ date: objeto.date });
        this.setState({ country: objeto.country });
        this.setState({ sex: objeto.sex });
        //this._armalista(objeto.interests);
    }

    state = {
        date: '2016-05-15',
        data: [],
        country: '',
        interests: []
    };

    _armalista(tmp) {
        let listNew = [];
        console.log(tmp);
        list.forEach(function (i) {
            if (tmp.includes(i.id - 1)) {
                listNew.push(i);
            }
        })
        console.log(listNew)
        this.setState({ interests: listNew })
    }

    calcularEdad() {
        var hoy = new Date();
        //let fecha = storage._retrieveData('date');
        let fecha = this.state.date;
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.perfilZone}>
                    <View style={styles.imageZone}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: this.state.data.profile_picture }}
                            containerStyle={styles.avatar}
                        />
                    </View>
                    <View style={styles.dateZone}>
                        <View style={styles.textZone}>
                            <Text style={styles.name}>{this.state.data.full_name}</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.age}>{this.calcularEdad()} años</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.country}>{this.state.country}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.interestZone}>
                    <Button transparent>
                        <Text style={{ textAlign: "center" }}>Sus intereses seleccionados son:</Text>
                    </Button>
                    {this.state.interests.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: l.avatar_url }}
                            title={l.name}
                            subtitle={l.subtitle}
                            bottomDivider
                        />
                    ))}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    perfilZone: {
        flex: 1,
        flexDirection: 'row'
    },
    interestZone: {
        flex: 2,
        flexDirection: 'column'
    },
    imageZone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dateZone: {
        flex: 1,
        flexDirection: 'column'
    },
    textZone: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 25
    },
    age: {
        fontSize: 20,
        color: 'green'
    },
    country: {
        fontSize: 20
    },
    avatar: {
        alignSelf: 'center'
    }
});