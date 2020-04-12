import React, { Component } from 'react';
import {
    Modal,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import {
    Card,
    CardItem,
    Text,
    Button,
    Thumbnail,
    Left,
    Body,
    Item,
    Title,
    Label,
    Input,
    Icon,
    Header
} from 'native-base';
import { CheckBox } from 'react-native-elements';
import SelectCountryComponent from '../../components/selectCountry';

class ModalMatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            women: false,
            men: false,
            gender: '',
            age: null,
            country: {
                name: '',
                flag: '',
                code: ''
            },
            selectCountryModal: false,
        };
    }


    //Controla los checkbox para que solo este seleccionada una opcion
    _check = id => {
        if (id == 'F') {
            this.setState({
                women: true,
                men: false,
                gender: 'F',
            });
        } else {
            this.setState({
                women: false,
                men: true,
                gender: 'M',
            });
        }
    };

    onFilter() {
        const { filter } = this.props
        filter(this.state.gender, this.state.age, this.state.country.code)
    }

    setCountry(country) {
        this.setState({ country: country, selectCountryModal: false });
        this.props.selectCountry(false);
    }

    selectCountry() {
        this.props.selectCountry(true);
        this.setState({ selectCountryModal: true })
    }

    render() {
        const { modalFilterVisible, closeModal } = this.props
        return (
            <React.Fragment>
                {
                    this.state.selectCountryModal ? (
                        <View style={{flex: 10}}>
                            <Header transparent>
                                <Body style={{ marginLeft: 10 }}>
                                    <Title style={{ color: '#414241' }}>Selecciona un país:</Title>
                                </Body>
                            </Header>
                            <SelectCountryComponent
                                handleSelect={country => this.setCountry(country)}
                            />
                        </View>
                    ) : (
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalFilterVisible}>
                                <View style={styles.containerFilter}>
                                    <Card style={styles.cardFilter}>
                                        <CardItem>
                                            <Text>Ingrese los campos por los que quiere filtrar:</Text>
                                        </CardItem>
                                        <CardItem>
                                            <CheckBox
                                                center
                                                title="Mujer"
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checkedColor="red"
                                                checked={this.state.women}
                                                onPress={() => this._check('F')}
                                            />
                                            <CheckBox
                                                center
                                                title="Hombre"
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checkedColor="blue"
                                                checked={this.state.men}
                                                onPress={() => this._check('M')}
                                            />
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Item stackedLabel>
                                                        <Label>Edad superior a:</Label>
                                                        <Input
                                                            keyboardType="numeric"
                                                            onChangeText={age => this.setState({ age })}
                                                            value={this.state.age}
                                                        />
                                                    </Item>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem>
                                            <View style={styles.country}>
                                                <Label> {this.state.country.name} </Label>
                                                <Thumbnail
                                                    small
                                                    source={{ uri: this.state.country.flag }}
                                                />
                                            </View>
                                            <Button
                                                style={styles.buttonCountry}
                                                onPress={() => this.selectCountry()}>
                                                <Text> Elegir </Text>
                                            </Button>
                                        </CardItem>
                                        <CardItem>
                                            <Button
                                                rounded
                                                danger
                                                onPress={() => closeModal()}
                                                style={[styles.buttonModal, { marginRight: 10 }]}>
                                                <Text>
                                                    Cerrar{' '}
                                                    <Icon
                                                        type="FontAwesome"
                                                        name="times-circle"
                                                        style={styles.iconButton}
                                                    />
                                                </Text>
                                            </Button>
                                            <Button
                                                rounded
                                                success
                                                onPress={() => this.onFilter()}
                                                style={[
                                                    styles.buttonModal,
                                                    { backgroundColor: '#4B62A5' },
                                                ]}>
                                                <Text>
                                                    Filtrar{' '}
                                                    <Icon
                                                        type="FontAwesome"
                                                        name="filter"
                                                        style={styles.iconButton}
                                                    />
                                                </Text>
                                            </Button>
                                        </CardItem>
                                    </Card>
                                </View>
                            </Modal>
                        )
                }
            </React.Fragment>
        )
    }
}

export default ModalMatch;

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    /*--------------Modal Filter CSS--------------*/
    containerFilter: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    cardFilter: {
        flex: 0.45,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350,
        minHeight: 350,
        borderRadius: 20,
    },

    iconButton: {
        color: 'white',
        fontSize: 20,
    },
    containerFilterMatch: {
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        borderRadius: 20,
    },
    cardFilterMatch: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 350,
        borderRadius: 20,
    },

    iconButtonMatch: {
        color: 'white',
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
        borderRadius: 10,
        backgroundColor: 'grey',
    },
})