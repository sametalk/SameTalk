import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {getListInterests, selectedInterests, setInterest} from '../../actions';
import {
  Container,
  Header,
  Left,
  Body,
  Text,
  Button,
  Icon,
  Title,
} from 'native-base';
import ModalRecommended from '../../components/modalRecommended';
import Toast, {DURATION} from 'react-native-easy-toast';
import {SafeAreaView} from 'react-navigation';

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
    const {getListInterests, userData} = this.props;
    await getListInterests(userData.token);
    this.setState({
      interests: this.props.interests,
    });
  }

  onClickInterests = item => {
    if (this.state.level < 3) {
      this.setState({
        interests: item.children,
        backInterests: this.state.interests,
        level: this.state.level + 1,
      });
    } else {
      this.refs.toast.show('¡Interes seleccionado!', DURATION.LENGTH_SHORT);
      this.props.setInterest(item, this.props.userData.token);
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

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => this.onClickInterests(item)}
        style={styles.item}>
        <ImageBackground style={styles.itemImage} source={{uri: item.image}} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <React.Fragment>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={{flex: 1}}>
            <View
              style={[
                styles.header,
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 48,
                },
              ]}>
              {this.state.level !== 1 ? (
                <Button transparent onPress={() => this.handleBackButton()}>
                  <Icon name="arrow-back" style={{color: 'white'}} />
                </Button>
              ) : (
                <View />
              )}
              <Title style={{color: 'white'}}>Selecciona tus intereses </Title>
              <View />
            </View>
            <FlatList
              data={this.state.interests}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
            <Toast ref="toast" style={{backgroundColor: 'grey'}} />
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
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    getListInterests: token => dispatch(getListInterests(token)),
    selectedInterests: interest => dispatch(selectedInterests(interest)),
    setInterest: (interest, token) => dispatch(setInterest(interest, token)),
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
    backgroundColor: '#fff',
    width: Dimensions.get('window').width / numColumns,
    height: 150,
    position: 'relative',
  },
  itemImage: {
    width: Dimensions.get('window').width / numColumns,
    height: 150,
    position: 'absolute',
  },
  itemText: {
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(238, 75, 59, 0.8)',
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
