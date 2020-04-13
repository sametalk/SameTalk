import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  RefreshControl,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Title,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Icon,
  Thumbnail,
  Right,
} from 'native-base';
import CardStack from 'react-native-card-stack-swiper';
import { setLike, setSuperLike, setDontLike } from '../../api';
import { getListProfiles, filterProfiles, setListProfiles, discountCoins } from '../../actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import IconCoin from 'react-native-vector-icons/AntDesign';
import ModalMatch from '../../components/listOfCompatibleProfiles/modalMatch';
import ModalFilter from '../../components/listOfCompatibleProfiles/modalFilter';

class ListProfiles extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Personas',
      swipeEnabled: navigation.getParam('swipeAll', true),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      modalMatchVisible: false,
      modalFilterVisible: false,
      selectCountryOn: false,
      alert: {
        show: false,
        showConfirmButton: true,
        type: 'superlike',
        title: '',
        message: ''
      },
      profileMatch: this.props.userData,
      listProfiles: this.props.listProfiles,
      swipedAll: true,
    };
    this._onRefresh = this._onRefresh.bind(this);
    this._onSwipedAll = this._onSwipedAll.bind(this);
  }

  goBack = () => {
    if (this.state.swipedAll && typeof this.lastProfile !== 'undefined') {
      this.props.setListProfiles(this.lastProfile);
      this.setState({ swipedAll: false });
      this.props.navigation.setParams({ swipeAll: false });
    } else {
      if (this.props.listProfiles.length > 0) {
        this.swiper.goBackFromLeft();
        this.props.navigation.setParams({ swipeAll: false });
      }
    }
  };

  async componentDidMount() {
    console.disableYellowBox = true;
    const { getListProfiles, userData } = this.props;
    await getListProfiles(userData.token);
    if (this.props.listProfiles.length > 0) {
      this.setState({ swipedAll: false });
      this.props.navigation.setParams({ swipeAll: false });
    }
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    await this.props.getListProfiles(this.props.userData.token);
    this.setState({ refreshing: false });
    if (this.props.listProfiles.length == 0) {
      this.setState({ swipedAll: true });
      this.props.navigation.setParams({ swipeAll: true });
    } else {
      this.setState({ swipedAll: false });
      this.props.navigation.setParams({ swipeAll: false });
    }
  }

  async _onSwipedAll() {
    this.lastProfile = new Array();
    this.lastProfile[0] = this.props.listProfiles[
      this.props.listProfiles.length - 1
    ];
    await this.props.setListProfiles([]);
    this.setState({ swipedAll: true });
    this.props.navigation.setParams({ swipeAll: true });
  }

  async onNoLike(profile) {
    const response = await setDontLike(this.props.userData.token, profile.id);
  }

  async onLike(profile, type) {
    try {
      let response = null;
      if (type === 'like') {
        response = await setLike(this.props.userData.token, profile.id); //Seteo el Like
      } else {
        if (this.props.userData.coins - 10 <= 0) {
          this.setState({
            alert: {
              show: true,
              title: 'No puedes dar Superlikes',
              message: 'Necesitas 10 monedas, comparte nuestra aplicación con tus amigos y obtenlas',
              type: 'superlike'
            }
          });
          this.goBack()
        } else {
          response = await setSuperLike(this.props.userData.token, profile.id); //Seteo el superLike
          this.props.discountCoins(this.props.userData);
        }
      }
      if (response.match.status == 'accepted') {
        this.setState({ modalMatchVisible: true, profileMatch: profile }); //Abro el modal
      }
    } catch (error) {
      console.log(error);
    }
  }

  onFilter(gender, age, countryCode) {
    let token = this.props.userData.token;
    let data = {
      gender: gender,
      age: age,
      country: countryCode,
    };
    this.props.filterProfiles(token, data);
    this.setState({
      modalFilterVisible: false,
    });
  }

  goToInstagram() {
    this.setState({ modalMatchVisible: false });
    Linking.openURL(
      'https://www.instagram.com/' + this.state.profileMatch.username,
    );
  }

  calculateCoinsForSuperLike() {
    let coins = this.props.userData.coins;
    let permitted = true;
    let title = "¿Quieres ver quien te dio Like?";
    let message = ''

    if (coins - 10 <= 0) {
      permitted = false;
      message = 'Necesitas 10 monedas, comparte nuestra aplicación con tus amigos y obtenlas';
    } else {
      message = 'Se te descontarán 10 monedas';
    }

    this.setState({
      alert: {
        show: true,
        showConfirmButton: permitted,
        message: message,
        title: title,
        type: 'likeMee'
      },
    });
  }

  render() {
    let { listProfiles, userData, discountCoins} = this.props;
    return (
      <React.Fragment>
        {!this.state.selectCountryOn &&
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            style={styles.container}
            refreshControl={
              this.state.swipedAll && (
                <RefreshControl
                  tintColor="white"
                  progressViewOffset={80}
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              )
            }>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
              <StatusBar barStyle="light-content" />
              <SafeAreaView style={{ flex: 1 }}>
                <View
                  style={[
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 48,
                      width: '100%',
                      paddingHorizontal: 10,
                    },
                  ]}>
                  <Title style={{ color: 'white' }}>
                    Selecciona tus intereses{' '}
                  </Title>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.calculateCoinsForSuperLike()}>
                      <IconCoin name="hearto" color="white" size={22} />
                    </TouchableOpacity>
                    <View style={{ marginRight: 8 }} />

                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ modalFilterVisible: true })
                      }>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="filter-variant"
                        style={{ color: 'white' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <CardStack
                  style={styles.content}
                  renderNoMoreCards={() => (
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 18,
                        color: 'gray',
                      }}>
                      No hay más perfiles compatibles!
                    </Text>
                  )}
                  onSwipedAll={this._onSwipedAll}
                  ref={swiper => {
                    this.swiper = swiper;
                  }}
                  key={listProfiles.length}>
                  {listProfiles.map(profile => (
                    <Card
                      key={profile.id}
                      style={styles.card}
                      onSwipedLeft={() => this.onNoLike(profile)}
                      onSwipedRight={() => this.onLike(profile, 'like')}>
                      <CardItem key={profile.id}>
                        <Left>
                          <Thumbnail
                            small
                            source={{ uri: profile.country.flag }}
                          />
                          <Body>
                            <Text style={{ color: '#212121' }}>
                              {profile.full_name}
                            </Text>
                            <Text note>{profile.age} Años</Text>
                          </Body>
                        </Left>
                        <Right>
                          <TouchableOpacity
                            onPress={() => {
                              this.onLike(profile, 'super-like'),
                                this.swiper.swipeBottom();
                            }}>
                            <Icon
                              type="FontAwesome"
                              name="star"
                              style={{ fontSize: 25, color: '#37D7DE' }}
                            />
                          </TouchableOpacity>
                        </Right>
                      </CardItem>
                      <CardItem cardBody>
                        <Image
                          source={{ uri: profile.profile_picture }}
                          style={styles.profile}
                        />
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Body>
                            <Text
                              style={{
                                color: '#4B515D',
                                fontSize: 20,
                                fontWeight: '600',
                              }}>
                              Compatibilidad: {profile.compatibility}
                            </Text>
                          </Body>
                        </Body>
                      </CardItem>
                    </Card>
                  ))}
                </CardStack>
                <View style={styles.footer}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.swiper.swipeLeft()}>
                      <Image
                        source={require('../../../assets/image/buttons/dislike.png')}
                        resizeMode={'contain'}
                        style={styles.dislike}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.goBack()}>
                      <Image
                        source={require('../../../assets/image/buttons/refresh.png')}
                        resizeMode={'contain'}
                        style={styles.goBack}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.swiper.swipeRight()}>
                      <Image
                        source={require('../../../assets/image/buttons/like.png')}
                        resizeMode={'contain'}
                        style={styles.like}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </ScrollView>
        }
        <ModalMatch
          modalMatchVisible={this.state.modalMatchVisible}
          profileMatch={this.state.profileMatch}
          closeModal={() => this.setState({ modalMatchVisible: false })}
          goToInstagram={() => this.goToInstagram()}
        />
        <ModalFilter
          modalFilterVisible={this.state.modalFilterVisible}
          closeModal={() => this.setState({ modalFilterVisible: false })}
          filter={(gender, age, countryCode) => this.onFilter(gender, age, countryCode)}
          selectCountry={(value) => this.setState({ selectCountryOn: value })}
        />
        <AwesomeAlert
          show={this.state.alert.show}
          showProgress={false}
          title={this.state.alert.title}
          message={this.state.alert.message}
          messageStyle={{ textAlign: 'center' }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={this.state.alert.showConfirmButton}
          cancelText={
            this.state.alert.showConfirmButton ? 'No, cancelar' : 'Salir'
          }
          confirmText="Si, continuar"
          cancelButtonColor="#d9534f"
          confirmButtonColor="#4B62A5"
          onCancelPressed={() => {
            this.setState({
              alert: {
                show: false,
              },
            });
          }}
          onConfirmPressed={() => {
            this.setState({
              alert: {
                show: false,
              },
            });
            discountCoins(userData);
            this.props.navigation.navigate('SeeWhoLikeMee');
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    listProfiles: state.listProfiles,
  };
};

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
  return {
    getListProfiles: token => dispatch(getListProfiles(token)),
    filterProfiles: (token, data) => dispatch(filterProfiles(token, data)),
    setListProfiles: profiles => dispatch(setListProfiles(profiles)),
    discountCoins: user => dispatch(discountCoins(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListProfiles);

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  header: {
    backgroundColor: '#F1F3F5',
  },
  card: {
    width: 320,
    flex: 1,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  buttonContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  dislike: {
    width: 80,
    height: 80,
  },
  goBack: {
    width: 70,
    height: 70,
    marginTop: -15,
  },
  like: {
    width: 80,
    height: 80,
  },
  profile: {
    height: win.width / 1.5,
    width: null,
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },

  buttonModal: {
    width: '48%',
    borderRadius: 10,
    justifyContent: 'center',
  },

});
