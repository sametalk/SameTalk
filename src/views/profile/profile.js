import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Button, Card, CardItem, Thumbnail, Left, Body, Header, Icon, Right, Title } from 'native-base';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';

class profile extends Component {

    resetTo(route) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    logoutUser = async () => {
        try {
            await AsyncStorage.removeItem("@token");
        } catch (e) { }
        this.resetTo('Welcome');
    }

    render() {
        const { userData, listMatchs, selectedInterests, countTags} = this.props
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../../assets/image/fondo.png')} style={styles.imageBackground} imageStyle={{ opacity: 0.3 }}>
                    <Header style={styles.header}>
                        <Body style={{ marginLeft: 10 }}>
                            <Title style={{ color: '#414241' }}>Same Talk</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => this.logoutUser()}>
                                <Icon type="FontAwesome" name="window-close" style={{ color: "grey" }} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <View style={styles.content}>
                        <Card style={styles.card}>
                            <CardItem style={{borderRadius: 10}}>
                                <Left>
                                    <Thumbnail small source={{ uri: userData.country.flag }} />
                                    <Body>
                                        <Text>{userData.full_name}</Text>
                                        <Text note>{userData.age} Años</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                                        <Icon type="FontAwesome" name='cogs' style={{ color: "gray" }} />
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: userData.profile_picture }} style={styles.profile} />
                            </CardItem>
                            <CardItem>
                                <View style={styles.statistics}>
                                    <View style={[styles.cardButton, styles.green]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListInterests')}>
                                            <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Intereses</Text>
                                            <Icon type="FontAwesome" name="thumbs-up" color="green" style={[styles.icon, styles.margin, { color: "white" }]} />
                                            <Text style={[styles.count, styles.margin]}>{selectedInterests.length}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.cardButton, styles.red]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ListMatchs')}>
                                            <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Matchs</Text>
                                            <Icon type="FontAwesome" name="heart" style={[styles.icon, styles.margin, { color: "white" }]} />
                                            <Text style={[styles.count, styles.margin]}>{listMatchs.length}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.cardButton, styles.blue]}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyTags')}>
                                            <Text style={[styles.margin, { alignSelf: "center", color: "white" }]}>Etiquetas</Text>
                                            <Icon type="FontAwesome" name="tags" color="yellow" style={[styles.icon, styles.margin, { color: "white" }]} />
                                            <Text style={[styles.count, styles.margin]}>{countTags}</Text>
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
        listTags: state.listTags,
        countTags: state.countTags,
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
        borderRadius: 10,
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
    cardButton: {
        flex: 1,
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 10
    },
    green: {
        backgroundColor: '#6FC95E',
        marginRight: 5
    },
    red: {
        backgroundColor: '#d9534f',
    },
    blue: {
        backgroundColor: "#4B62A5",
        marginLeft: 5
    },
    icon: {
        alignSelf: "center",
        fontSize: 30
    },
    margin: {
        marginTop: 5
    },
    count: {
        alignSelf: "center",
        color: "white",
        marginBottom: 5
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
});
