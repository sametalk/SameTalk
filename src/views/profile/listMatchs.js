import React, { Component } from 'react';
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
        console.log(listMatchs);
        return (
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
                                        onPress={() => this.props.navigation.navigate('MatchProfile', { profile: l.user})}>
                                        <Text>Ver</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
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
