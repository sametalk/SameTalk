import React, {Component} from 'react';
import {
  BackHandler, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  View,
  Thumbnail,
  Text,
} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {WHITE} from '../constant/colors'; 
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

class selectCountry extends Component {
  
  constructor(props) {
    super(props);
    let { width } = Dimensions.get("window");
    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });
    this._layoutProvider = new LayoutProvider(
      index => {
        return 0;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 46.2;
      }
    );
    this._rowRenderer = this._rowRenderer.bind(this);
    this.state = {
        dataProvider: dataProvider.cloneWithRows(this.props.countries)
    };
  }

  _rowRenderer(type, data) {
    return (
      <View key={data.id}>
        <TouchableOpacity key={data.id} onPress={() => this.props.handleSelect(data)}>
          <View style={styles.row}>
          <Thumbnail
            small
            source={{uri: data.flag}}
          />
          <View style={{marginRight: 10}} />
          <Text style={{fontSize: 20}}>{data.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
  }

  componentDidMount() {
    console.disableYellowBox = true;
    if(this.props.handleBack) {
      BackHandler.addEventListener('hardwareBackPress', this.props.handleBack);
    }
  }

  componentWillUnmount() {
    if(this.props.handleBack) {
      BackHandler.removeEventListener('hardwareBackPress', this.props.handleBack);
    }
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderColor: 'gray',
    borderBottomWidth: 0.2,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: WHITE
  }
});

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
