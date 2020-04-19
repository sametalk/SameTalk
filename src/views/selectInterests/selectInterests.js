import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { getListInterests, setInterest, deleteInterest } from '../../actions';
import {
  Text,
  Button,
  Icon,
  Title,
} from 'native-base';
import ModalRecommended from '../../components/modalRecommended';
import Toast, { DURATION } from 'react-native-easy-toast';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { DARK, DARK_2 } from '../../constant/colors';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const numColumns = 2;

class selectInterests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      count: 0,
      interests: [],
      backInterests: [],
    };
  }

  async componentDidMount() {
    // Add backHandlerListener when screen focused
    this.props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    });
    // Remove backHandlerListener when screen lost focus
    this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    });
    console.disableYellowBox = true;
    const { getListInterests, userData } = this.props;
    this.setState({ loading: true }, async () => {
      await getListInterests(userData.token);
      this.setState({
        interests: this.props.interests,
      });
      this.setState({ loading: false })
    })

  }

  onClickInterests = item => {
    if (this.state.level < 3) {
      this.setState({
        interests: item.children,
        parent: { id: item.id, name: item.name },
        backInterests: this.state.interests,
        level: this.state.level + 1,
      });
    } else {
      if (item.selected) {
        this.props.deleteInterest(this.props.userData.token, item.id);
        this.refs.toast.show('¡Interes eliminado!', DURATION.LENGTH_SHORT);
      } else {
        item.parent = this.state.parent;
        this.props.setInterest(item, this.props.userData.token);
        this.refs.toast.show('¡Interes seleccionado!', DURATION.LENGTH_SHORT);
      }
    }
  };

  handleBackButton = () => {
    if (this.state.level == 2) {
      this.setState({
        interests: this.props.interests,
        backInterests: [],
        level: 1,
      });
    } else if (this.state.level == 3) {
      this.setState({
        interests: this.state.backInterests,
        backInterests: this.props.interests,
        level: 2,
      });
    } else {
      return false;
    }
    return true;
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => this.onClickInterests(item, index)}
        style={styles.item}>
        <ImageBackground source={{ uri: item.image }}
          style={[item.selected ? styles.itemImageSelected : styles.itemImage]}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)']} style={{ flex: 1 }} />
          <View style={{ width: '100%' }} />
        </ImageBackground>
        <View style={{ flexDirection: 'row', justiftyContent: 'bottom', alignItems: 'flex-end', flex: 1 }}>
          <Text style={styles.itemText}>{item.name}</Text>
          {this.state.level == 3 &&
            <Icon
              type='FontAwesome'
              name={[item.selected ? 'check-square-o' : 'square-o']}
              style={{
                color: 'white', fontSize: 30, flex: 0.25, textAlign: 'right',
                paddingRight: item.selected ? 6 : 10,
                paddingBottom: 5
              }}
            />}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { loading } = this.state
    return (
      loading ? <SafeAreaView style={{ flex: 1, backgroundColor: DARK }}>
        <SkeletonPlaceholder style={{ flexDirection: 'row', backgroundColor: 'blue' }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5 }}>
            <View style={{
              width: Dimensions.get('window').width / numColumns,
              height: Dimensions.get('window').width / numColumns, borderRadius: 4, marginRight: 5
            }} />
            <View style={{
              width: Dimensions.get('window').width / numColumns,
              height: Dimensions.get('window').width / numColumns, borderRadius: 4
            }} />

          </View>
          <View style={{ marginTop: 5 }} />

          <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5 }}>
            <View style={{
              width: Dimensions.get('window').width / numColumns,
              height: Dimensions.get('window').width / numColumns, borderRadius: 4, marginRight: 5
            }} />
            <View style={{
              width: Dimensions.get('window').width / numColumns,
              height: Dimensions.get('window').width / numColumns, borderRadius: 4
            }} />

          </View>
          <View style={{ marginTop: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 5 }}>
            <View style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width / numColumns, borderRadius: 4, marginRight: 5
            }} />


          </View>


        </SkeletonPlaceholder>
      </SafeAreaView> :

        <React.Fragment>
          <View style={{ flex: 1, backgroundColor: DARK }}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={[
                  styles.header,
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 48,
                    backgroundColor: DARK_2
                  },
                ]}>
                {this.state.level !== 1 ? (
                  <Button transparent onPress={() => this.handleBackButton()}>
                    <Icon name="arrow-back" style={{ color: 'white' }} />
                  </Button>
                ) : (
                    <View />
                  )}
                <Title style={{ color: 'white' }}>Selecciona tus intereses </Title>
                <View />
              </View>
              <FlatList
                data={this.state.interests.map(obj => (
                  {
                    ...obj,
                    selected: this.props.selectedInterests.some(int => int.category.id === obj.id)
                  }
                ))}
                renderItem={this.renderItem}
                numColumns={numColumns}
                extraData={this.state}
              />
              <Toast ref="toast" style={{ backgroundColor: 'grey' }} positionValue={180} />
            </SafeAreaView>
          </View>
          <ModalRecommended />
        </React.Fragment>
    );
  }
}

// Trae del Storage Centralizado el objeto interests
const mapStateToProps = state => {
  return {
    userData: state.userData,
    interests: state.interests,
    selectedInterests: state.selectedInterests
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    getListInterests: token => dispatch(getListInterests(token)),
    setInterest: (interest, token) => dispatch(setInterest(interest, token)),
    deleteInterest: (token, id) => dispatch(deleteInterest(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(selectInterests);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    margin: 2,
    width: Dimensions.get('window').width / numColumns,
    height: Dimensions.get('window').width / numColumns,
    maxHeight: 200,
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  itemImageSelected: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.6
  },
  itemText: {
    flex: 1,
    padding: 10,
    color: 'white',
  },

  color: {
    color: '#EE4B3B',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});
