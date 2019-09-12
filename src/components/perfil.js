import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements'

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
        let objeto = this.props.navigation.state.params;
        this.setState({ data: objeto.data, date: objeto.date, country: objeto.country });
    }

    state = {
        date: '',
        data: [],
        country: ''
    };

    calcularEdad(){
        console.log(this.state.date);

        var hoy = new Date();
        var cumpleanos = new Date(this.state.date);
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
                            source={{uri: this.state.data.profile_picture}}
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
                            <Text style={styles.country}>Argentina</Text>
                        </View>    
                    </View>
                </View>
                <View style={styles.interestZone}>
                    <Text style={styles.label}>Tus intereses seleccionados son:</Text>
                    {list.map((l, i) => (
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
        fontSize: 30
    },
    age: {
        fontSize: 25,
        color: 'green'
    },
    country:{
        fontSize: 20
    },
    avatar: {
        alignSelf: 'center'
    }
});