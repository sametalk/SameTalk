import React, {Component} from 'react';
import {BackHandler, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  List,
  View,
  Thumbnail,
  Text,
} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {WHITE} from '../constant/colors'; 

class selectCountry extends Component {
  
  componentDidMount() {
    console.disableYellowBox = true;
    BackHandler.addEventListener('hardwareBackPress', this.props.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.handleBack);
  }

  render() {
    const {countries, handleSelect} = this.props;
    return (
      <Container>
        <Content>
          <List>
            {countries.map((country, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(country)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15,
                    borderColor: 'gray',
                    borderBottomWidth: 0.2,
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: WHITE
                  }}>
                  <Thumbnail
                    scaleX={0.8}
                    scaleY={0.8}
                    source={{uri: country.flag}}
                  />
                  <View style={{marginRight: 10}} />

                  <Text style={{fontSize: 20}}>{country.name}</Text>
                </View>
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
    countries: state.countries,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(selectCountry);
