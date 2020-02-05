import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import interests from '../constant/interestsTests'
import { Container, Header, Left, Body, Right, Button, Icon, Item, Input } from 'native-base';
import { violetDegradation } from '../constant/colors'

const numColumns = 2;

class selectInterests extends Component {

    constructor(props) {
        super(props)
        this.state = {
            level: 1,
            count: 0,
            interests: []
        }
    }

    async componentDidMount() {
        console.disableYellowBox = true;
        this.setState({
            interests: interests,
            backInterests: []
        })
    }

    /*
        Funcion para refrescar el checkbox del interes
        Se fija que el id del interes este en el storage de intereses seleccionados
    */
    refreshCheck(id) {
        let flag = false
        this.props.interests.forEach(item => {
            if (item.id === id) {
                flag = true
            }
        });
        return flag
    }

    onClickAvatar = (item) => {
        if (this.state.level < 3) {
            this.setState({
                interests: item.children,
                backInterests: this.state.interests,
                level: this.state.level + 1
            })
        }
    }

    back() {
        if (this.state.level == 2) {
            this.setState({
                interests: interests,
                backInterests: [],
                level: 1
            })
        } else if (this.state.level == 3) {
            this.setState({
                interests: this.state.backInterests,
                backInterests: interests,
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
            <TouchableOpacity onPress={() => this.onClickAvatar(item)} style={[styles.item, { backgroundColor: violetDegradation[colorCalculation] }]}>
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
                            <Input placeholder='Search...' />
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

export default selectInterests

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