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
        const { userData } = this.props;
        let id = this.props.navigation.state.params.id;
        tagUser(userData.token, idTag, id);
        this.props.navigation.goBack();
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

const mapDispatchToProps = dispatch => {
    return {
        discountCoins: (token) => dispatch(discountCoins(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tagger)

