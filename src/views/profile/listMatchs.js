import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { getListMatchs } from '../../actions'

class ListMatchs extends Component {
    async componentDidMount() {
        console.disableYellowBox = true;
        const { getListMatchs, userData } = this.props
        await getListMatchs(userData.token)
    }

    render() {
        const { listMatchs } = this.props
        return (
            <React.Fragment>
                {
                    listMatchs.length == 0 ? (
                        <View style={styles.container}>
                            <Text style={styles.text}>¡Aún no posee matchs!</Text>
                        </View>
                    ) : (
                            <Container>
                                <Content>
                                    <List>
                                        {listMatchs.map((l) => (
                                            <ListItem thumbnail>
                                                <Left>
                                                    <Thumbnail square source={{ uri: l.user.profile_picture }} />
                                                </Left>
                                                <Body>
                                                    <Text>{l.user.full_name}</Text>
                                                    <Text note numberOfLines={1}>{l.user.username}</Text>
                                                </Body>                                            
                                                <Right>
                                                    <Button
                                                        transparent
                                                        onPress={() => this.props.navigation.navigate('MatchProfile', { profile: l.user })}>
                                                        <Text>Ver</Text>
                                                    </Button>
                                                </Right>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Content>
                            </Container>
                        )
                }
            </React.Fragment>
        );
    }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
    return {
        userData: state.userData,
        listMatchs: state.listMatchs
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getListMatchs: (token) => dispatch(getListMatchs(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMatchs)

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
    }
})
