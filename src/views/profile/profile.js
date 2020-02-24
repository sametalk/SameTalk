import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Text, Button, List, ListItem, Content, Container, Icon, Badge } from 'native-base';
import { connect } from 'react-redux';

class profile extends Component {

    render() {
        const { userData } = this.props
        console.log(userData)
        return (
            <Container>
                <Content>
                    <View style={styles.profile}>
                        <Text style={[styles.text, { color:"#292b2c" ,fontSize:30}]}>{userData.full_name}</Text>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: userData.profile_picture }}
                            containerStyle={styles.avatar}
                        />
                        <Text style={[styles.text, { color:"#5cb85c", fontSize:20}]}>{userData.age} años</Text>
                        <Text style={[styles.text, { color:"#292b2c", fontSize:20}]}>{userData.country.name} </Text>
                    </View>
                    <View style={styles.statistics}>
                        <View style={styles.iconZone}>
                            <Icon type="FontAwesome" name="thumbs-up" color="green" style={[styles.icon, { color: "#5cb85c" }]} />
                            <Badge success style={styles.icon}>
                                <Text>3</Text>
                            </Badge>
                        </View>
                        <View style={styles.iconZone}>
                            <Icon type="FontAwesome" name="gg-circle" color="yellow" style={[styles.icon, { color: "#f0ad4e" }]} />
                            <Badge warning style={styles.icon}>
                                <Text>15</Text>
                            </Badge>
                        </View>
                        <View style={styles.iconZone}>
                            <Icon type="FontAwesome" name="heart" style={[styles.icon, { color: "#d9534f" }]} />
                            <Badge danger style={styles.icon}>
                                <Text>4</Text>
                            </Badge>
                        </View>
                    </View>
                    <View>
                        <Button rounded danger style={styles.button} onPress={ () => this.props.navigation.navigate('ListInterests') }>
                            <Text>Ver intereses seleccionados</Text>
                        </Button>
                        <Button rounded danger style={styles.button} onPress={ () => this.props.navigation.navigate('ListMatchs') }>
                            <Text>Ver lista de matchs</Text>
                        </Button>
                        <Button rounded danger style={styles.button} onPress={ () => this.props.navigation.navigate('Settings') }>
                            <Text>Configurar Perfil</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(profile)


const styles = StyleSheet.create({
    profile:{
        marginTop: 10
    },
    text: {
        alignSelf: "center"
    },
    avatar: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10
    },
    statistics: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        height: 100,
        marginTop: 10,
    },
    iconZone: {
        flex: 1,
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    icon: {
        alignSelf: "center",
        marginBottom: 10,
        fontSize: 50
    },
    button: {
        marginTop: 20,
        width: "80%",
        alignSelf: "center",
        justifyContent: 'center'
    }
});
