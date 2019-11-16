import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { getListInterests, selectedInterests } from '../../actions'
//import interests from '../../constant/interestsTests'

const numColumns = 3;

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
        const {getListInterests, userData} = this.props
        console.disableYellowBox = true;
        await getListInterests(userData.token)
        this.setState({
            interests: this.props.interests
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
                level: this.state.level + 1
            })
        }
    }

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity onPress={() => this.onClickAvatar(item)} style={styles.item}>
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.name}</Text> 
                </View>
            </TouchableOpacity>  
        );
    };

    render() {
        return (
            <FlatList
                data={this.state.interests}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
            />
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
        selectedInterests: (interest) => dispatch(selectedInterests(interest))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(selectInterests)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: '#4D243D',
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
});