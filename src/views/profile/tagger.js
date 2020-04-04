import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text } from 'native-base';
import tags from '../../constant/tags'

class Tagger extends Component {

    componentDidMount() {
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {tags.map((tag) => (
                            <TouchableOpacity>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail small source={tag.icon} />
                                    </Left>
                                    <Body>
                                        <Text>{tag.name}</Text>
                                    </Body>
                                </ListItem>
                            </TouchableOpacity>
                        ))}
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Tagger