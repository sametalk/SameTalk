import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

class MyMatchsTags extends Component {
    render() {
        const { navigation } = this.props;
        const users = navigation.getParam('users');
        return (
            <Container>
                <Content>
                    <List>
                        {users.map((user, index) => (
                            <ListItem thumbnail key={index}>
                                <Left>
                                    <Thumbnail square source={{ uri: user.profile_picture }} />
                                </Left>
                                <Body>
                                    <Text>{user.full_name}</Text>
                                    <Text note numberOfLines={1}>{user.username}</Text>
                                </Body>
                                <Right>
                                    <Button
                                        transparent
                                        onPress={() => Linking.openURL("https://www.instagram.com/" + user.username)}>
                                        <Text>Seguir</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container >
        );
    }
}

export default MyMatchsTags

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