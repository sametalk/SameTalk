import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Header, Title } from 'native-base';
import { connect } from 'react-redux';
import { setLike, setDontLike } from '../../api';
import { getListLikeMee } from '../../actions';

class SeeWhoLikeMee extends Component {

    async componentDidMount() {
        console.disableYellowBox = true;
        const { getListLikeMee, userData } = this.props
        await getListLikeMee(userData.token)
    }

    async onDislike(user) {
        const { getListLikeMee, userData} = this.props
        await setDontLike(userData.token, user.id)
        await getListLikeMee(userData.token)
    }

    async onLike(user) {
        const { getListLikeMee, userData} = this.props
        await setLike(userData.token, user.id)
        await getListLikeMee(userData.token)
    }

    render() {
        const { listLikeMee } = this.props
        return (
            <Container>
                <Content>
                    <List>
                        {listLikeMee.map((item, index) => (
                            <ListItem thumbnail key={index}>
                                <Left>
                                    <Thumbnail square source={{ uri: item.user.profile_picture }} />
                                </Left>
                                <Body>
                                    <Text>{item.user.full_name}</Text>
                                    <Text note numberOfLines={1}>{item.user.age} años</Text>
                                </Body>
                                <Right style={styles.buttons}>
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.onDislike(item.user)}>
                                        <Thumbnail small source={require('../../../assets/image/buttons/dislike.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onLike(item.user)}>
                                        <Thumbnail small source={require('../../../assets/image/buttons/like.png')} />
                                    </TouchableOpacity>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        listLikeMee: state.listLikeMee
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListLikeMee: (token) => dispatch(getListLikeMee(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeWhoLikeMee)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
        color: 'gray',
        textAlign: 'center'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})