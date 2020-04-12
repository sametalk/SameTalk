import React, { Component } from 'react';
import {
    Modal,
    View,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import {
    CardItem,
    Text,
    Button,
    H1,
    Thumbnail
} from 'native-base';

class ModalMatch extends Component {

    render() {
        const { modalMatchVisible, profileMatch, closeModal, goToInstagram } = this.props
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMatchVisible}>
                <View style={styles.containerMatch}>
                    <View style={styles.modal}>
                        <View
                            style={{
                                paddingBottom: 10,
                                width: '80%',
                                height: 50,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: 50,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                }}>
                                <H1 style={[styles.title]}>Has hecho match 🤙</H1>
                            </View>
                        </View>
                        <CardItem cardBody>
                            <View
                                style={{
                                    height: 175,
                                    width: '80%',
                                    borderRadius: 175 / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 30,
                                }}>
                                <Image
                                    source={{ uri: profileMatch.profile_picture }}
                                    style={[
                                        styles.profile,
                                        { height: 175, width: 175, borderRadius: 175 / 2 },
                                    ]}
                                />
                            </View>
                        </CardItem>

                        <View
                            style={{
                                paddingHorizontal: 10,
                                width: '80%',
                                paddingTop: 20,
                                paddingBottom: 10,
                                backgroundColor: 'white',
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'center',
                                    paddingBottom: 10,
                                }}>
                                <Thumbnail
                                    small
                                    source={{ uri: profileMatch.country.flag }}
                                />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ color: '#212121' }}>
                                        {profileMatch.full_name}
                                    </Text>
                                    <Text note>{profileMatch.age} Años</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    paddingHorizontal: 10,
                                    width: '100%',
                                    flexDirection: 'row',
                                    paddingTop: 10,
                                    backgroundColor: 'white',
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                }}>
                                <Button
                                    rounded
                                    onPress={() =>
                                        closeModal()
                                    }
                                    style={[
                                        styles.buttonModal,
                                        {
                                            marginLeft: 0,
                                            backgroundColor: '#b32821',
                                        },
                                    ]}>
                                    <Text style={{ fontWeight: 'bold' }}>Cerrar </Text>
                                </Button>
                                <Button
                                    rounded
                                    onPress={() => goToInstagram()}
                                    style={[
                                        styles.buttonModal,
                                        {
                                            marginLeft: 10,
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        },
                                    ]}>
                                    <Text style={{ fontWeight: 'bold' }}>Seguir </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalMatch;

const win = Dimensions.get('window');
const styles = StyleSheet.create({
    containerMatch: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },

    modal: {
        flexDirection: 'column',
        marginTop: 50,
        alignItems: 'center',
        width: 350,
        height: 500,
        borderRadius: 20,
    },

    titleView: {
        justifyContent: 'center',
        backgroundColor: '#D9544E',
        width: '100%',
    },

    title: {
        color: 'white',
        fontSize: 22,
    },

    buttonModal: {
        width: '48%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    profile: {
        height: win.width / 1.5,
        width: null,
        flex: 1,
      },
})