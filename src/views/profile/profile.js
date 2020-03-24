import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Button, Card, CardItem, Thumbnail, Left, Body, Header, Icon, Right, Badge, Title } from 'native-base';
import { connect } from 'react-redux';

class profile extends Component {

    render() {
        const { userData, listMatchs, selectedInterests } = this.props
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../../assets/image/fondo.png')} style={styles.imageBackground} imageStyle={{ opacity: 0.3 }}>
                    <Header style={styles.header}>
                        <Body style={{ marginLeft: 10 }}>
                            <Title style={{ color: '#414241' }}>Same Talk</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate('Settings')}>
                                <Icon type="FontAwesome" name='cogs' style={{ color: "gray" }} />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.content}>
                        <Card style={styles.card}>
                            <CardItem>
                                <Left>
                                    <Thumbnail small source={{ uri: userData.country.flag }} />
                                    <Body>
                                        <Text>{userData.full_name}</Text>
                                        <Text note>{userData.age} Años</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: userData.profile_picture }} style={styles.profile} />
                            </CardItem>
                            <CardItem>
                                <View style={styles.statistics}>
                                    <View style={[styles.iconZone, styles.green]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListInterests')}>
                                            <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Intereses</Text>
                                            <Icon type="FontAwesome" name="thumbs-up" color="green" style={[styles.icon, styles.margin, { color: "white" }]} />
                                            <Badge success style={[styles.icon, styles.margin]}>
                                                <Text>{selectedInterests.length}</Text>
                                            </Badge>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.iconZone, styles.yellow]}>
                                        <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Monedas</Text>
                                        <Icon type="FontAwesome" name="gg-circle" color="yellow" style={[styles.icon, styles.margin, { color: "white" }]} />
                                        <Badge warning style={[styles.icon, styles.margin]}>
                                            <Text>{userData.coins}</Text>
                                        </Badge>
                                    </View>
                                    <View style={[styles.iconZone, styles.red]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListMatchs')}>
                                            <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Matchs</Text>
                                            <Icon type="FontAwesome" name="heart" style={[styles.icon, styles.margin, { color: "white" }]} />
                                            <Badge danger style={[styles.icon, styles.margin]}>
                                                <Text>{listMatchs.length}</Text>
                                            </Badge>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
    return {
        userData: state.userData,
        listMatchs: state.listMatchs,
        selectedInterests: state.selectedInterests
    }
}

export default connect(mapStateToProps)(profile)


const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(158, 158, 158, 0.1)'
    },
    header: {
        backgroundColor: 'white',
    },
    card: {
        width: 320,
        paddingBottom: 10,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
    },
    profile: {
        flex: 1,
        width: null,
        height: 300
    },
    text: {
        alignSelf: "center"
    },
    statistics: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        height: 100,
    },
    iconZone: {
        flex: 1,
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 10
    },
    green: {
        backgroundColor: '#5cb85c',
        marginRight: 5
    },
    red: {
        backgroundColor: '#d9534f',
        marginLeft: 5
    },
    yellow: {
        backgroundColor: "#f0ad4e" 
    },
    icon: {
        alignSelf: "center",
        fontSize: 30
    },
    margin: {
        marginTop: 5
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
});
