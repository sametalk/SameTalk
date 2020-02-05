import React, { Component } from 'react';
import { Text, List, ListItem, Content, Container } from 'native-base';
import { connect } from 'react-redux';

class ListInterests extends Component {

    render() {
        const { selectedInterests } = this.props
        return (
            <Container>
                <Content>
                    <List>
                        {selectedInterests.map((l) => (
                            <ListItem>
                                <Text>{l.name}</Text>
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
        selectedInterests: state.selectedInterests
    }
}

export default connect(mapStateToProps)(ListInterests)
