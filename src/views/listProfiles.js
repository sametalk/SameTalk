import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Card, CardItem, Text, Left, Body, Button, H1, Icon, Item, Label, Input, Thumbnail, Right } from 'native-base';
import CardStack from 'react-native-card-stack-swiper';
import { CheckBox } from 'react-native-elements';
import { setLike, setDontLike } from '../api'
import { getListProfiles } from '../actions'

class ListProfiles extends Component {

    state = {
        modalVisible: false,
        modalFilterVisible: false,
        profileMatch: this.props.userData,
        modalFilterVisible: false,
        women: false,
        men: false,
        gender: ''
    };

    async componentDidMount() {
        console.disableYellowBox = true;
        const { getListProfiles, userData } = this.props
        await getListProfiles(userData.token)
    }

    async onNoLike(profile) {
        const response = await setDontLike(this.props.userData.token, profile.id)
    }

    async onLike(profile, type) {
        try {
            const response = null;
            if (type === "like") {
                response = await setLike(this.props.userData.token, profile.id) //Seteo el Like
            } else {
                response = await setLike(this.props.userData.token, profile.id) //Seteo el superLike
            }

            if (response.match.status == "accepted") {
                this.props.getListMatchs(this.props.userData.token);  //Recargo la lista de matchs
                this.setState({ modalVisible: true, profileMatch: profile }); //Abro el modal
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Controla los checkbox para que solo este seleccionada una opcion
    _check = (id) => {
        if (id == 'F') {
            this.setState({
                women: true,
                men: false,
                gender: 'W'
            })
        } else {
            this.setState({
                women: false,
                men: true,
                gender: 'M'
            })
        }
    }

    render() {
        const { listProfiles } = this.props
        return (
            <React.Fragment>
                <View style={{ flex: 1 }}>
                    <Header transparent>
                        <Body style={{ marginLeft: 10 }}>
                            <Title style={{ color: '#414241' }}>Perfiles compatibles:</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.setState({ modalFilterVisible: true })}>
                                <Icon type="FontAwesome" name='filter' style={{ color: "gray" }} />
                            </Button>
                        </Right>
                    </Header>
                    <CardStack
                        style={styles.content}
                        renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No hay más perfiles compatibles!</Text>}
                        ref={swiper => {
                            this.swiper = swiper
                        }}
                    >
                        {listProfiles.map((profile) => (
                            <Card style={styles.card} onSwipedLeft={() => this.onNoLike(profile)} onSwipedRight={() => this.onLike(profile, 'like')}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail small source={{ uri: "data:image/png;base64,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" }} />
                                        <Body>
                                            <Text>{profile.full_name}</Text>
                                            <Text note>{profile.age} Años</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.onLike(profile, 'super-like')}>
                                            <Icon type="FontAwesome" name='star' style={{ fontSize: 25, color: '#37D7DE' }} />
                                        </TouchableOpacity>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: profile.profile_picture }} style={styles.profile} />
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
                    visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Card style={[styles.card, styles.modal]}>
                            <CardItem>
                                <H1>
                                    <Icon type="FontAwesome" name="gratipay" style={{ color: "#d9534f" }} />
                                    ¡ Match !
                                    <Icon type="FontAwesome" name="gratipay" style={{ color: "#d9534f" }} />
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
                                <Button rounded success onPress={() => this.setState({ modalVisible: false })}>
                                    <Text>Seguir <Icon type="FontAwesome" name="forward" style={{ color: "white", fontSize: 15 }} /></Text>
                                </Button>
                                <Button rounded danger onPress={() => this.setState({ modalVisible: false })} style={{ marginLeft: 10 }}>
                                    <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={{ color: "white", fontSize: 15 }} /></Text>
                                </Button>
                            </CardItem>
                        </Card>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalFilterVisible}
                >
                    <View style={styles.containerFilter}>
                        <Card style={styles.cardFilter}>
                            <CardItem>
                                <Text>Ingrese los campos por los que quiere filtrar</Text>
                            </CardItem>
                            <CardItem >
                                <CheckBox
                                    center
                                    title='Mujer'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='red'
                                    checked={this.state.women}
                                    onPress={() => this._check('F')}
                                />
                                <CheckBox
                                    center
                                    title='Hombre'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor='blue'
                                    checked={this.state.men}
                                    onPress={() => this._check('M')}
                                />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Item stackedLabel>
                                            <Label>Edad superior a:</Label>
                                            <Input keyboardType="numeric" onChangeText={(age) => this.setState({ age })} value={this.state.age} />
                                        </Item>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Button rounded danger onPress={() => this.setState({ modalFilterVisible: false })} style={{ marginRight: 10 }}>
                                    <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={styles.iconButton} /></Text>
                                </Button>
                                <Button rounded success onPress={() => this.setState({ modalVisible: false })}>
                                    <Text>Filtrar <Icon type="FontAwesome" name='filter' style={styles.iconButton} /></Text>
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
        getListProfiles: (token) => dispatch(getListProfiles(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProfiles)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        alignItems: 'center'
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#F1F3F5'
    },
    modal: {
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
    },

    /*--------------Modal Filter CSS--------------*/
    containerFilter: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    cardFilter: {
        flex: 0.45,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350,
        minHeight: 350,
        borderRadius: 20
    },
    iconButton: {
        color: "white",
        fontSize: 15,
    }
});