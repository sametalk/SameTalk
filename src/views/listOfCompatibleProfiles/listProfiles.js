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
import { setLike, setSuperLike, setDontLike } from '../../api';
import { getListProfiles, filterProfiles } from '../../actions';
import SelectCountryComponent from '../../components/selectCountry';

class ListProfiles extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            modalFilterVisible: false,
            profileMatch: this.props.userData,
            listProfiles: this.props.listProfiles,
            women: false,
            men: false,
            gender: '',
            selectCountryModal: false,
            age: null,
            country: {
                name: "",
                flag: "",
                code: ""
            },
        }
    }

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
            let response = null;
            if (type === "like") {
                response = await setLike(this.props.userData.token, profile.id) //Seteo el Like
            } else {
                response = await setSuperLike(this.props.userData.token, profile.id) //Seteo el superLike
            }
            console.log(response)
            if (response.match.status == "accepted") {
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
                gender: 'F'
            })
        } else {
            this.setState({
                women: false,
                men: true,
                gender: 'M'
            })
        }
    }

    setCountry(country) {
        this.setState({ country: country, selectCountryModal: false });
    }

    onFilter() {
        let token = this.props.userData.token;
        let data = {
            gender: this.state.gender,
            age: this.state.age,
            country: this.state.country.code
        }
        this.props.filterProfiles(token, data);
        this.setState({
            modalFilterVisible: false
        });
    }

    render() {
        const { listProfiles } = this.props
        return (
            <React.Fragment>
                {
                    this.state.selectCountryModal ?
                        (
                            <View style={{ flex: 1 }}>
                                <Header transparent>
                                    <Body style={{ marginLeft: 10 }}>
                                        <Title style={{ color: '#414241' }}>Selecciona un país:</Title>
                                    </Body>
                                </Header>
                                <SelectCountryComponent handleSelect={(country) => this.setCountry(country)}></SelectCountryComponent>
                            </View>
                        ) : (
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
                                                        <Thumbnail small source={{ uri: profile.country.flag }} />
                                                        <Body>
                                                            <Text style={{color: '#212121'}}>{profile.full_name}</Text>
                                                            <Text note>{profile.age} Años</Text>
                                                        </Body>
                                                    </Left>
                                                    <Right>
                                                        <TouchableOpacity onPress={() => {this.onLike(profile, 'super-like'), this.swiper.swipeBottom()}}>
                                                            <Icon type="FontAwesome" name='star' style={{ fontSize: 25, color: '#37D7DE' }} />
                                                        </TouchableOpacity>
                                                    </Right>
                                                </CardItem>
                                                <CardItem cardBody>
                                                    <Image source={{ uri: profile.profile_picture }} style={styles.profile} />
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <Body>
                                                            <Text style={{color: '#4B515D', fontSize: 20, fontWeight: '600'}}>Compatibilidad: {profile.compatibility}</Text>
                                                        </Body>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        ))}
                                    </CardStack>
                                    <View style={styles.footer}>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => this.swiper.swipeLeft()}>
                                                <Image source={require('../../../assets/image/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => this.swiper.goBackFromLeft()}>
                                                <Image source={require('../../../assets/image/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => this.swiper.swipeRight()}>
                                                <Image source={require('../../../assets/image/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
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
                                                <Text>Ingrese los campos por los que quiere filtrar:</Text>
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
                                                <View style={styles.country}>
                                                    <Label> {this.state.country.name} </Label>
                                                    <Thumbnail
                                                        small
                                                        source={{ uri: this.state.country.flag }} />
                                                </View>
                                                <Button danger style={styles.buttonCountry} onPress={() => this.setState({ selectCountryModal: true })}>
                                                    <Text> Elegir </Text>
                                                </Button>
                                            </CardItem>
                                            <CardItem>
                                                <Button rounded danger onPress={() => this.setState({ modalFilterVisible: false })} style={{ marginRight: 10 }}>
                                                    <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={styles.iconButton} /></Text>
                                                </Button>
                                                <Button rounded success onPress={() => this.onFilter()}>
                                                    <Text>Filtrar <Icon type="FontAwesome" name='filter' style={styles.iconButton} /></Text>
                                                </Button>
                                            </CardItem>
                                        </Card>
                                    </View>
                                </Modal>
                            </React.Fragment>
                        )}
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
        filterProfiles: (token, data) => dispatch(filterProfiles(token, data))
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
        height: 420,
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
        height: 300, 
        width: null, 
        flex: 1
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
    },

    /*---------- Countries ---------*/
    country: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '70%',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        marginRight: 5,
        borderColor: '#cccccc',
        backgroundColor: '#f5f5f5',
    },
    buttonCountry: {
        borderRadius: 10
    }
});