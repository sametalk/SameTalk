import React, { Component } from 'react';
import { Text, List, ListItem, Content, Container } from 'native-base';
import { connect } from 'react-redux';

class ListMatchs extends Component {

    render() {
        const { listMatchs } = this.props
        console.log(listMatchs)
        return (
            <Container>
                <Content>
                    <List>
                        {listMatchs.map((l) => (
                            <ListItem>
                                <Text>{l.user.full_name}</Text>
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
        listMatchs: state.listMatchs
    }
}

export default connect(mapStateToProps)(ListMatchs)
