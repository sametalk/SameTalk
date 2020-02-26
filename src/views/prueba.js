import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

class ListMatchs extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    const { listMatchs } = this.props
    return (
      <React.Fragment>
        <View style={styles.container}>
            <Text style={styles.text}>¡Aún no posee matchs!</Text>
        </View>
      </React.Fragment>
    );
  }
}

export default ListMatchs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: 'gray',
    textAlign: 'center'
  }
})
