import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
    Linking,
    StatusBar,
    ScrollView, 
    RefreshControl,
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
            refreshing: false,
            modalMatchVisible: false,
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

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getListProfiles(this.props.userData.token);
        this.setState({refreshing: false});
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
            if (response.match.status == "accepted") {
                this.setState({ modalMatchVisible: true, profileMatch: profile }); //Abro el modal
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

    goToInstagram() {
        this.setState({ modalMatchVisible: false });
        Linking.openURL("https://www.instagram.com/" + this.state.profileMatch.username);
    }

    render() {
        let { listProfiles } = this.props
        console.log(listProfiles.length)
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
                                <ScrollView
                                    contentContainerStyle={{ flex: 1 }}
                                    style={styles.container}
                                    refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this._onRefresh}
                                    />
                                    }
                                >
                                    <ImageBackground source={require('../../../assets/image/fondo.png')} style={styles.imageBackground} imageStyle={{ opacity: 0.3 }}>
                                        <Header style={{ backgroundColor: "white" }}>
                                            <Body style={{ marginLeft: 10 }}>
                                                <Title style={{ color: '#414241' }}>Perfiles compatibles:</Title>
                                            </Body>
                                            <Right>
                                                <Button transparent onPress={() => this.setState({ modalFilterVisible: true })}>
                                                    <Icon type="FontAwesome" name='filter' style={{ color: "gray" }} />
                                                </Button>
                                            </Right>
                                        </Header>
                                        {listProfiles ?
                                        <CardStack
                                            style={styles.content}
                                            renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No hay más perfiles compatibles!</Text>}
                                            ref={swiper => {
                                                this.swiper = swiper
                                            }}
                                            key={listProfiles.length}
                                        >
                                            {listProfiles.map((profile) => (
                                                    <Card key={profile.id} style={styles.card} onSwipedLeft={() => this.onNoLike(profile)} onSwipedRight={() => this.onLike(profile, 'like')}>
                                                        <CardItem key={profile.id}>
                                                            <Left>
                                                                <Thumbnail small source={{ uri: profile.country.flag }} />
                                                                <Body>
                                                                    <Text style={{ color: '#212121' }}>{profile.full_name}</Text>
                                                                    <Text note>{profile.age} Años</Text>
                                                                </Body>
                                                            </Left>
                                                            <Right>
                                                                <TouchableOpacity onPress={() => { this.onLike(profile, 'super-like'), this.swiper.swipeBottom() }}>
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
                                                                    <Text style={{ color: '#4B515D', fontSize: 20, fontWeight: '600' }}>Compatibilidad: {profile.compatibility}</Text>
                                                                </Body>
                                                            </Body>
                                                        </CardItem>
                                                    </Card>
                                            ))}</CardStack> : <View style={styles.content}><Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No hay más perfiles compatibles!</Text></View>}
                                        <View style={styles.footer}>
                                            <View style={styles.buttonContainer}>
                                                <TouchableOpacity onPress={() => this.swiper.swipeLeft()}>
                                                    <Image source={require('../../../assets/image/buttons/dislike.png')} resizeMode={'contain'} style={styles.dislike} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.swiper.goBackFromLeft()}>
                                                    <Image source={require('../../../assets/image/buttons/refresh.png')} resizeMode={'contain'} style={styles.goBack} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.swiper.swipeRight()}>
                                                    <Image source={require('../../../assets/image/buttons/like.png')} resizeMode={'contain'} style={styles.like} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </ScrollView>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalMatchVisible}>
                                    <View style={styles.containerMatch}>
                                        <Card style={styles.modal}>
                                            <CardItem style={styles.titleView}>
                                                <H1 style={styles.title}>
                                                    Tienes un Match
                                                </H1>
                                            </CardItem>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail small source={{ uri: this.state.profileMatch.country.flag }} />
                                                    <Body>
                                                        <Text style={{ color: '#212121' }}>{this.state.profileMatch.full_name}</Text>
                                                        <Text note>{this.state.profileMatch.age} Años</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                            <CardItem cardBody>
                                                <Image source={{ uri: this.state.profileMatch.profile_picture }} style={styles.profile} />
                                            </CardItem>
                                            <CardItem>
                                                <Button
                                                    rounded
                                                    danger
                                                    onPress={() => this.setState({ modalMatchVisible: false })}
                                                    style={styles.buttonModal}>
                                                    <Text>Cerrar <Icon type="FontAwesome" name="times-circle" style={styles.iconButton} /></Text>
                                                </Button>
                                                <Button
                                                    rounded
                                                    success
                                                    onPress={() => this.goToInstagram()}
                                                    style={[styles.buttonModal, { marginLeft: 10, backgroundColor:"#4B62A5" }]}>
                                                    <Text>Seguir <Icon type="FontAwesome" name="instagram" style={styles.iconButton} /></Text>
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
                                                    <Text style={styles.textButton}>Cerrar <Icon type="FontAwesome" name="times-circle" style={styles.iconButton} /></Text>
                                                </Button>
                                                <Button rounded success onPress={() => this.onFilter()}>
                                                    <Text style={styles.textButton}>Filtrar <Icon type="FontAwesome" name='filter' style={styles.iconButton} /></Text>
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
        marginTop: StatusBar.currentHeight,
        flex: 1,
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(158, 158, 158, 0.1)'
    },
    header: {
        backgroundColor: '#F1F3F5'
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
    buttonContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(158, 158, 158, 0.1)'
    },
    dislike: {
        width: 80,
        height: 80,
    },
    goBack: {
        width: 70,
        height: 70,
        marginTop: -15
    },
    like: {
        width: 80,
        height: 80,
    },
    profile: {
        height: 300,
        width: null,
        flex: 1
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },

    /*--------------Modal Match CSS--------------*/
    containerMatch: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },

    modal: {
        flex: 0.70,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350,
        minHeight: 350,
        borderRadius: 20
    },

    titleView: {
        justifyContent: 'center',
        backgroundColor: '#D9544E',
        width: '100%'
    },

    title: {
        color: 'white'
    },

    buttonModal: {
        width: '45%',
        borderRadius: 10,
        justifyContent: 'center'
    },

    textButton: {
        fontSize: 20
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
        fontSize: 20,
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