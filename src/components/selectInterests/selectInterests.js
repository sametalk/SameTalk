import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { getListInterests, selectedInterests, setInterest } from '../../actions'
//import interests from '../../constant/interestsTests'
import { Container, Header, Left, Body, Text, Button, Icon, Item, Input } from 'native-base';
import { violetDegradation } from '../../constant/colors'

const numColumns = 2;

class selectInterests extends Component {

    constructor(props) {
        super(props)
        this.state = {
            level: 1,
            count: 0,
            interests: [],
            backInterests: []
        }
    }

    async componentDidMount() {
        console.disableYellowBox = true;
        const { getListInterests, userData } = this.props
        await getListInterests(userData.token)
        this.setState({
            interests: this.props.interests
        })
    }

    onClickInterests = (item) => {
        if (this.state.level < 3) {
            this.setState({
                interests: item.children,
                backInterests: this.state.interests,
                level: this.state.level + 1,
            })
        } else {
            this.props.setInterest(item, this.props.userData.token)
        }
    }

    back() {
        if (this.state.level == 2) {
            this.setState({
                interests: this.props.interests,
                backInterests: [],
                level: 1
            })
        } else if (this.state.level == 3) {
            this.setState({
                interests: this.state.backInterests,
                backInterests: this.props.interests,
                level: 2
            })
        }
    }

    renderItem = ({ item, index }) => {
        let colorCalculation = (index + 1) % this.state.interests.length
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity onPress={() => this.onClickInterests(item)} style={[styles.item, { backgroundColor: violetDegradation[colorCalculation] }]}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <Container>
                <Header transparent style={styles.header}>
                    {this.state.level !== 1 &&
                        <Left style={{ flex: 1 }}>

                            <Button transparent onPress={() => this.back()}>
                                <Icon name='arrow-back' style={styles.color} />
                            </Button>

                        </Left>
                    }
                    <Body style={{ flex: 10 }}>
                        <Item rounded>
                            <Input placeholder='Buscar...' />
                            <Icon name='search' style={styles.color} />
                        </Item>
                    </Body>
                </Header>
                <FlatList
                    data={this.state.interests}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
            </Container>
        )
    }
}

// Trae del Storage Centralizado el objeto interests
const mapStateToProps = state => {
    return {
        userData: state.userData,
        interests: state.interests
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getListInterests: (token) => dispatch(getListInterests(token)),
        selectedInterests: (interest) => dispatch(selectedInterests(interest)),
        setInterest: (interest, token ) => dispatch(setInterest(interest, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(selectInterests)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: 'white',
    },
    header: {
        backgroundColor: 'white'
    },
    color: {
        color: '#EE4B3B'
    }
});