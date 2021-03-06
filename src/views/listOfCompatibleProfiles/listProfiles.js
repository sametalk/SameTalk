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
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Thumbnail, Card } from 'native-base';
import CardStack from 'react-native-card-stack-swiper';
import { setLike, setSuperLike, setDontLike } from '../../api';
import {
  getListProfiles,
  filterProfiles,
  setListProfiles,
  discountCoins,
} from '../../actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import IconCoin from 'react-native-vector-icons/AntDesign';
import IconLike from 'react-native-vector-icons/AntDesign';
import IconRef from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalMatch from '../../components/listOfCompatibleProfiles/modalMatch';
import ModalFilter from '../../components/listOfCompatibleProfiles/modalFilter';
import { DARK, DARK_2 } from '../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';

const win = Dimensions.get('window');

class ListProfiles extends Component {
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
        message: '',
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
      this.props.navigation
        .dangerouslyGetParent()
        .setParams({ swipeAll: false });
    } else {
      if (this.props.listProfiles.length > 0) {
        this.swiper.goBackFromLeft();
        this.props.navigation
          .dangerouslyGetParent()
          .setParams({ swipeAll: false });
      }
    }
  };

  async componentDidMount() {
    console.disableYellowBox = true;
    const { getListProfiles, userData } = this.props;
    await getListProfiles(userData.token);
    if (this.props.listProfiles.length > 0) {
      this.setState({ swipedAll: false });
      this.props.navigation
        .dangerouslyGetParent()
        .setParams({ swipeAll: false });
    }
  }

  async _onRefresh() {
    this.setState({ refreshing: true });
    await this.props.getListProfiles(this.props.userData.token);
    this.setState({ refreshing: false });
    if (this.props.listProfiles.length === 0) {
      this.setState({ swipedAll: true });
      this.props.navigation
        .dangerouslyGetParent()
        .setParams({ swipeAll: true });
    } else {
      this.setState({ swipedAll: false });
      this.props.navigation
        .dangerouslyGetParent()
        .setParams({ swipeAll: false });
    }
  }

  async _onSwipedAll() {
    this.lastProfile = new Array();
    this.lastProfile[0] = this.props.listProfiles[
      this.props.listProfiles.length - 1
    ];
    await this.props.setListProfiles([]);
    this.setState({ swipedAll: true });
    this.props.navigation.dangerouslyGetParent().setParams({ swipeAll: true });
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
              message:
                'Necesitas 10 monedas, comparte nuestra aplicación con tus amigos y obtenlas',
              type: 'superlike',
            },
          });
          this.goBack();
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
      'https://www.instagram.com/' + this.state.profileMatch.username
    );
  }

  calculateCoinsForSuperLike() {
    let coins = this.props.userData.coins;
    let permitted = true;
    let title = '¿Quién te dio like?';
    let message = '';

    if (coins - 10 <= 0) {
      permitted = false;
      message =
        'Necesitas 10 monedas, comparte nuestra aplicación con tus amigos y obtenlas';
    } else {
      message = 'Se te descontarán 10 monedas';
    }

    this.setState({
      alert: {
        show: true,
        showConfirmButton: permitted,
        message: message,
        title: title,
        type: 'likeMee',
      },
    });
  }

  render() {
    let { listProfiles, userData, discountCoins } = this.props;
    return (
      <React.Fragment>
        {!this.state.selectCountryOn && (
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
            }
          >
            <View style={{ flex: 1, backgroundColor: DARK }}>
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
                      backgroundColor: DARK_2,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => this.calculateCoinsForSuperLike()}
                  >
                    <IconCoin name="hearto" color="white" size={22} />
                  </TouchableOpacity>
                  <Image
                    source={require('../../../assets/image/logo3.png')}
                    style={{ width: 300, height: 25, resizeMode: 'contain' }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({ modalFilterVisible: true })}
                  >
                    <Icon
                      type="MaterialCommunityIcons"
                      name="filter-variant"
                      style={{ color: 'white' }}
                    />
                  </TouchableOpacity>
                </View>

                <CardStack
                  style={styles.content}
                  renderNoMoreCards={() => (
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 18,
                        color: 'gray',
                      }}
                    >
                      No hay más perfiles compatibles!
                    </Text>
                  )}
                  onSwipedAll={this._onSwipedAll}
                  ref={swiper => {
                    this.swiper = swiper;
                  }}
                  key={listProfiles.length}
                >
                  {listProfiles.map(profile => (
                    <Card
                      key={profile.id}
                      style={styles.item}
                      onSwipedLeft={() => this.onNoLike(profile)}
                      onSwipedRight={() => this.onLike(profile, 'like')}
                    >
                      <ImageBackground
                        source={{ uri: profile.profile_picture }}
                        style={[
                          styles.itemImage,
                          { backgroundColor: DARK, borderRadius: 10 },
                        ]}
                        imageStyle={{
                          borderRadius: 10,
                        }}
                      >
                        <LinearGradient
                          colors={[
                            'rgba(0,0,0,0)',
                            'rgba(0,0,0,0.1)',
                            'rgba(0,0,0,0.9)',
                          ]}
                          style={{ flex: 1, borderRadius: 10 }}
                        />
                        <View style={{ width: '100%' }} />
                      </ImageBackground>
                      <View
                        style={{
                          alignItems: 'flex-end',
                          marginTop: 15,
                          marginRight: 15,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'white',
                            width: 40,
                            height: 40,
                            borderRadius: 150,
                            elevation: 10,
                            shadowColor: 'rgba(0,0,0, .4)', // IOS
                            shadowOffset: { height: 1, width: 1 }, // IOS
                            shadowOpacity: 1, // IOS
                            shadowRadius: 1, //IOS
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            this.onLike(profile, 'super-like'),
                              this.swiper.swipeBottom();
                          }}
                        >
                          <Icon
                            type="FontAwesome"
                            name="star"
                            style={{ fontSize: 25, color: '#37D7DE' }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-end',
                          marginLeft: 15,
                          marginBottom: 15,
                        }}
                      >
                        <Text style={styles.name}>{profile.full_name}</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <Text style={styles.age}>{profile.age} Años </Text>
                          <Thumbnail
                            small
                            source={{ uri: profile.country.flag }}
                            style={styles.flag}
                          />
                        </View>
                        <Text style={styles.compatibility}>
                          Compatibilidad: {profile.compatibility}
                        </Text>
                      </View>
                    </Card>
                  ))}
                </CardStack>
                <View style={styles.footer}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={{
                        paddingTop: 10,
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 180 / 2,
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => this.swiper.swipeLeft()}
                    >
                      <IconLike
                        name="dislike2"
                        size={50}
                        color="white"
                        style={{ textAlign: 'center' }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 180 / 2,
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => this.goBack()}
                    >
                      <IconRef
                        name="backup-restore"
                        size={50}
                        color="white"
                        style={{ textAlign: 'center' }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 180 / 2,
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => this.swiper.swipeRight()}
                    >
                      <IconLike
                        name="like2"
                        size={50}
                        color="white"
                        style={{ textAlign: 'center' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </ScrollView>
        )}
        <ModalMatch
          modalMatchVisible={this.state.modalMatchVisible}
          profileMatch={this.state.profileMatch}
          closeModal={() => this.setState({ modalMatchVisible: false })}
          goToInstagram={() => this.goToInstagram()}
        />
        <ModalFilter
          modalFilterVisible={this.state.modalFilterVisible}
          closeModal={() => this.setState({ modalFilterVisible: false })}
          filter={(gender, age, countryCode) =>
            this.onFilter(gender, age, countryCode)
          }
          selectCountry={value => this.setState({ selectCountryOn: value })}
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
    discountCoins: user => dispatch(discountCoins(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProfiles);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    margin: 2,
    width: win.width / 1.05,
    height: win.width / 1.05,
    position: 'relative',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footer: {
    flex: 1,
    marginBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonModal: {
    width: '48%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    color: 'white',
    fontWeight: '700',
  },
  flag: {
    width: 30,
    height: 20,
    borderRadius: 4,
    marginBottom: 2.5,
  },
  age: {
    fontSize: 18,
    color: '#D7D7D7',
    fontWeight: '500',
  },
  compatibility: {
    color: '#80FF00',
    fontSize: 20,
    fontWeight: '600',
  },
});
