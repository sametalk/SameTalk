import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, ListItem, Content, Container } from 'native-base';
import { connect } from 'react-redux';

class ListInterests extends Component {

    render() {
        const { selectedInterests } = this.props
        return (
            <React.Fragment>
                {
                    selectedInterests.length == 0 ? (
                        <View style={styles.container}>
                            <Text style={styles.text}>¡Aún no posee matchs!</Text>
                        </View>
                    ) : (
                        <Container>
                            <Content>
                                <List>
                                    {selectedInterests.map((l, index) => (
                                        <ListItem key={index}>
                                            <Text>{l.name}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </Content >
                        </Container >
                    )
                }
            </React.Fragment>
        );
    }
}

// Trae del Storage Centralizado el objeto userData e interests
const mapStateToProps = state => {
    return {
        selectedInterests: state.selectedInterests
    }
}

export default connect(mapStateToProps)(ListInterests)

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
