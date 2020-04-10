import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text } from 'native-base';
import tags from '../../constant/tags';
import { tagUser } from '../../api';
import { connect } from 'react-redux';

class Tagger extends Component {

    componentDidMount() {
        console.disableYellowBox = true;
    }

    onTag(idTag) {
        let user = this.props.userData;
        let id = this.props.navigation.state.params.id;
        tagUser(user.token, idTag, id);
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {tags.map((tag, index) => (
                            <TouchableOpacity key={index}>
                                <ListItem thumbnail onPress={() => this.onTag(tag.id)}>
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

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

export default connect(mapStateToProps)(Tagger)

