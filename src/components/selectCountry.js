import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions';

class selectCountry extends Component {

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    const { countries, handleSelect } = this.props;
    return (
        <Container>
            <Content>
                <List>
                    {countries.map((country, index) => (
                        <TouchableOpacity key={index}>
                            <ListItem thumbnail onPress={() => handleSelect(country)}>
                                <Left>
                                    <Thumbnail
                                        scaleX={0.8} scaleY={0.8}
                                        source={{ uri: country.flag }} />
                                </Left>
                                <Body>
                                    <Text>{country.name}</Text>
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

// Trae del Storage Centralizado el objeto userData
const mapStateToProps = state => {
  return {
    countries: state.countries
  }
}

export default connect(mapStateToProps, actions)(selectCountry)
