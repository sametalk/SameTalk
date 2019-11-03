import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';
import list from '../constant/interests'

class profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            listInterests: []
        }
    }

    componentDidMount(){
        this.refreshInterests()
    }


    componentDidUpdate(prevProps) {
        if (prevProps.interests !== this.props.interests) {
            this.refreshInterests()
        }
    }

    refreshInterests(){
        let updateList = []
        let {interests} = this.props
        for (let i = 0; i < interests.length; i++) {
            if (interests.includes(list[i].id)) {
                updateList.concat(list[i])
            }
        }
        this.setState({
            listInterests: updateList
        })
    }

    calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    render() {
        const { userData, interests } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.perfilZone}>
                    <View style={styles.imageZone}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={userData.profile_picture}
                            containerStyle={styles.avatar}
                        />
                    </View>
                    <View style={styles.dateZone}>
                        <View style={styles.textZone}>
                            <Text style={styles.name}>{userData.full_name}</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.age}>{this.calcularEdad(userData.date)} años</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.country}>{userData.country}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.interestZone}>
                    <Button transparent>
                        <Text style={{ textAlign: "center" }}>Sus intereses seleccionados son:</Text>
                    </Button>
                    {interests.map((l, i) => (
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

const mapStateToProps = state => {
    return {
        userData: state.userData,
        interests: state.interests
    }
}

export default connect(mapStateToProps)(profile)


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