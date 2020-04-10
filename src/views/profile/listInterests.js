import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { getSelectedInterest, deleteInterest } from '../../actions'

class ListInterests extends Component {
    async componentDidMount() {
        console.disableYellowBox = true;
        const { getSelectedInterest , userData } = this.props
        await getSelectedInterest(userData.token)
    }

    async delete(id) {
        const { deleteInterest , userData } = this.props
        await deleteInterest(userData.token, id)
    }

    render() {
        const { selectedInterests } = this.props
        return (
            <React.Fragment>
                {
                    selectedInterests.length == 0 ? (
                        <View style={styles.container}>
                            <Text style={styles.text}>¡Aún no posee intereses!</Text>
                        </View>
                    ) : (
                        <Container>
                                <Content>
                                    <List>
                                        {selectedInterests.map((interest, index) => (
                                            <ListItem thumbnail key={index}>
                                                <Left>
                                                    <Thumbnail square source={{ uri: interest.category.image }} />
                                                </Left>
                                                <Body>
                                                    <Text>{interest.category.name}</Text>
                                                    <Text note numberOfLines={1}>{interest.category.parent.name}</Text>
                                                </Body>                                            
                                                <Right>
                                                    <Button
                                                        transparent
                                                        onPress={() => this.delete(interest.category.id)}>
                                                        <Text style={{color: 'red'}}>Eliminar</Text>
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
        selectedInterests: state.selectedInterests
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getSelectedInterest: (token) => dispatch(getSelectedInterest(token)),
        deleteInterest: (token, id) => dispatch(deleteInterest(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListInterests)

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
