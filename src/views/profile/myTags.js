import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { getListTags } from '../../actions'

class MyTags extends Component {
    async componentDidMount() {
        console.disableYellowBox = true;
        const { getListTags, userData } = this.props
        await getListTags(userData.token, userData.id)
        console.log(this.props.listTags);
    }

    onClick(tag) {
        if (tag.count > 0) {
            this.props.navigation.navigate('MyMatchsTags', { users: tag.users })
        }
    }

    render() {
        const { listTags } = this.props
        console.log(listTags);
        return (
            <React.Fragment>
                {
                    listTags.length == 0 ? (
                        <View style={styles.container}>
                            <Text style={styles.text}>¡Aún no te han etiquetado!</Text>
                        </View>
                    ) : (
                            <Container>
                                <Content>
                                    <List>
                                        {listTags.map((tag, index) => (
                                            <TouchableOpacity key={index}>
                                                <ListItem thumbnail onPress={() => this.onClick(tag)}>
                                                    <Left>
                                                        <Thumbnail square source={{ uri: tag.icon }}></Thumbnail>
                                                    </Left>
                                                    <Body>
                                                        <Text>{tag.name}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text>{tag.count}</Text>
                                                    </Right>
                                                </ListItem>
                                            </TouchableOpacity>
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
        listTags: state.listTags
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getListTags: (token, id) => dispatch(getListTags(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTags)

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
