import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { Card, CardItem, Text, Left, Body, Button, H1, Icon} from 'native-base';
import CardStack from 'react-native-card-stack-swiper';
import interests from '../constant/interests'
import { setLike, setDontLike } from '../api'
import { getListMatchs } from '../actions'

class ListProfiles extends Component {

    state = {
        modalVisible: false,
        profileMatch: this.props.userData,
    };

    componentDidMount() {
        console.disableYellowBox = true;
    }

    async onNoLike(profile) {
        const response = await setDontLike(this.props.userData.token, profile.id)
    }

    async onLike(profile) {
        try {
            const response = await setLike(this.props.userData.token, profile.id) //Seteo el match
            if (response.match.status == "accepted") {
                this.props.getListMatchs(this.props.userData.token);  //Recargo la lista de matchs
                this.setState({ modalVisible: true, profileMatch: profile }); //Abro el modal
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { listProfiles } = this.props
        return (
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <CardStack
                        style={styles.content}
                        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                    >
                        {listProfiles.map((l) => (
                            <Card style={styles.card} onSwipedLeft={() => this.onNoLike(l)} onSwipedRight={() => this.onLike(l)}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{l.full_name} ({l.age} años)</Text>
                                            <Text note>{l.country.name}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: l.profile_picture }} style={styles.profile} />
                                </CardItem>
                                <CardItem>
                                    {interests.map((x) => (
                                        <Avatar
                                            size="small"
                                            source={x.avatar_url}
                                            rounded
                                            activeOpacity={0.5}
                                            containerStyle={{ marginLeft: 11 }}
                                        />
                                    ))}
                                </CardItem>
                            </Card>
                        ))}
                    </CardStack>
                    <View style={styles.footer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => this.swiper.swipeLeft()}>
                                <Image source={require('../../assets/image/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => this.swiper.goBackFromLeft()}>
                                <Image source={require('../../assets/image/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => this.swiper.swipeRight()}>
                                <Image source={require('../../assets/image/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.container}>
                        <Card style={[styles.card, styles.modal]} onSwipedLeft={() => this.onNoLike(l)} onSwipedRight={() => this.onLike(l)}>
                            <CardItem>
                                <H1>
                                    <Icon type="FontAwesome" name="gratipay"  style={{color: "#d9534f"}}/>
                                        ¡ Match ! 
                                    <Icon type="FontAwesome" name="gratipay"  style={{color: "#d9534f"}}/>
                                </H1>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{this.state.profileMatch.full_name} ({this.state.profileMatch.age} años)</Text>
                                        <Text note>{this.state.profileMatch.country.name}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: this.state.profileMatch.profile_picture }} style={styles.profile} />
                            </CardItem>
                            <CardItem>
                                {interests.map((x) => (
                                    <Avatar
                                        size="small"
                                        source={x.avatar_url}
                                        rounded
                                        activeOpacity={0.5}
                                        containerStyle={{ marginLeft: 11 }}
                                    />
                                ))}
                            </CardItem>
                            <CardItem>
                                <Button rounded success onPress={() => this.setState({ modalVisible: false })}>
                                    <Text>Seguir <Icon type="FontAwesome" name="forward" style={{color: "white", fontSize: 15}}/></Text>
                                </Button>
                                <Button rounded danger onPress={() => this.setState({ modalVisible: false })} style={{marginLeft: 10}}>
                                    <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={{color: "white", fontSize: 15}}/></Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </View>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        listProfiles: state.listProfiles,
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getListMatchs: (token) => dispatch(getListMatchs(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProfiles)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        alignItems: 'center',
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    modal:{
        flex: 0.95,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    card: {
        width: 320,
        height: 470,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: 220,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        backgroundColor: 'white'
    },
    orange: {
        width: 55,
        height: 55,
        borderWidth: 6,
        borderColor: 'rgb(246,190,66)',
        borderRadius: 55,
        marginTop: -15
    },
    green: {
        width: 75,
        height: 75,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#01df8a',
    },
    red: {
        width: 75,
        height: 75,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#fd267d',
    },
    profile: {
        height: 345, width: null, flex: 1
    }
});