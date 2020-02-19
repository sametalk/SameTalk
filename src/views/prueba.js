import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Header,
  Icon,
  Item,
  Input,
  Label,
  Text,
  Thumbnail
} from 'native-base';

class Settings extends Component {

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Container>
        <Header />
        <View style={styles.content}>
          <View style={styles.formGroup}>
            <View style={styles.input}>
              <Item stackedLabel>
                <Label>Nombre de usuario</Label>
                <Input onChangeText={(name) => this.setState({name})} value={this.state.name}/>
              </Item>
            </View>
            <View style={styles.input}>
              <Item stackedLabel last>
                <Label>Edad</Label>
                <Input keyboardType="numeric" onChangeText={(age) => this.setState({age})} value={this.state.age}/>
              </Item>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.country}>
                <Label>Argentina</Label>
                <Thumbnail
                  small
                  source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAexQTFRFAMT/AMT+BcP4FsPlFcPnFcPmFsPmBcP5Icz/JMz7OsjUXsiqa8icacidasicbcmbOsjVI8z84vj/4vj83+zH6Oag6eF959505NdW5dhW6N906Oim3+3L///////++/PM+uuh995c9txV9tc38tQ19NU19tg59t1X+N9g+uqd/PTP/frs+OmZ9+R+9dpG89Ux8dZF8tY/89Y/8tdG89Uw9+SA+Oqd/fvv+/TR9+aM9+Fo9dc08NZN8s8c88sA88sB89Ae8NVJ9NY09+Fp9uaN+vTU+vPP9+WJ9NpN8tU47tE76cIA6cMA79I98dQ589pU9uaQ9+WI9NlH8dU+79E1/NMA+NAA+dEA/dQA8NM68tU99NhD9uSE+vPO9+eS9+Fr9NUv7tNF+NIN8skA9csA+dMP79ZO9dYw9+Bn9+eP/frr+OiT9+N29dlD8NRB9NQr9dUv8dZJ8tU39dpH9+N3+OiR/Pnp//79+/HA+uqa99xR9tpK8dQ88dQ79dUw9tlE99xQ+uqb+/C+//783Pf/2/X41+e25OWa5uB85dxo49VL5NVL5dxn5+B65OSV1+e42/X5G8r/G8r+Hcn4RsjHasibc8iRc8eMcseNc8iQbsmXSsnDAcT+DcPvJMPVJcPVJMPWJ8PSEMPtAcT96IDw8AAAAAFiS0dEHesDcZEAAAAJcEhZcwAAAEgAAABIAEbJaz4AAADxSURBVDjLY2AYBTQBjEzMLKxs7IwYEhyogJOLm4eXj59bQBBNgkEIBQiLiIqJS0hKiUnLCKPKMMgiAzl5BUUlZRVVNXUNTS0UGVlUhdo6unr6BoZGxiZ6pmbmeBRaWFpZ29ja2Ts4Ojm7uOJR6Obu4enl7ePj4+vnH4BXYWBQcEhoWHhEZFR0TCwehbFx8QmJSckpqWnpGZn4FGZl5+R65uUXFBYVl5SW4VFYXlFZVV1QU1tX39DY1IyqsAUFtLa1d3R2dff09vVPQJVhmIgCJk2eMnXa9BkzZ82ejCoxESPu58ydN3/BwkWLBzpxDlcAAHiob+kULOLoAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTEwLTA3VDEzOjE1OjIwKzAyOjAwNNFndgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMC0wN1QxMzoxNToyMCswMjowMEWM38oAAAAASUVORK5CYII=" }} />
              </View>
              <Button danger style={styles.button}>
                <Text> Elegir </Text>
              </Button>
            </View>
          </View>
        </View>
        <Footer>
          <FooterTab>
            <Button full danger>
              <Text>Confirmar </Text>
              <Icon type="FontAwesome" name="check-circle" style={{ color: "white" }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default Settings

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  formGroup: {
    flex: 0.9
  },
  input: {
    flex: 1,
    justifyContent: 'center'
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f5f5f5',
  },
  button: {
    borderRadius: 10
  }
})