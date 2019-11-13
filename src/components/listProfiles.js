import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { Card, CardItem, Text, Left, Body } from 'native-base';
import CardStack from 'react-native-card-stack-swiper';
import { getListProfiles } from '../actions'

class listProfiles extends Component {
    async componentDidMount() {
        console.disableYellowBox = true;
        await this.props.getListProfiles()
    }

    render() {
        const { listProfiles, interests } = this.props
        console.log(interests)
        return (
            <View style={{ flex: 1 }}>
                <CardStack
                    style={styles.content}
                    renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>No more cards :(</Text>}
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    onSwiped={() => console.log('onSwiped')}
                    onSwipedLeft={() => console.log('onSwipedLeft')}
                >
                    {listProfiles.map((l) => (
                        <Card style={styles.card}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{l.full_name} ({l.age} años)</Text>
                                        <Text note>{l.country}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={l.profile_picture} style={styles.profile} />
                            </CardItem>
                            <CardItem>
                                {l.interests.map((x) => (
                                    <Avatar
                                        size="small"
                                        source={x.avatar_url}
                                        rounded
                                        activeOpacity={0.5}
                                        containerStyle={{ marginLeft: 11 }}
                                    />
                                ))}
                            </CardItem>
                        </Card>
                    ))}
                </CardStack>

                <View style={styles.footer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
                            this.swiper.swipeLeft();
                        }}>
                            <Image source={require('../../assets/image/red.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.orange]} onPress={() => {
                            this.swiper.goBackFromLeft();
                        }}>
                            <Image source={require('../../assets/image/back.png')} resizeMode={'contain'} style={{ height: 32, width: 32, borderRadius: 5 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                            this.swiper.swipeRight();
                        }}>
                            <Image source={require('../../assets/image/green.png')} resizeMode={'contain'} style={{ height: 62, width: 62 }} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

// Trae del Storage Centralizado el objeto listProfile e interests
const mapStateToProps = state => {
    return {
        listProfiles: state.listProfiles,
        interests: state.interests
    }
}

// Trae de action las funciones definidas en ese archivo
const mapDispatchToProps = dispatch => {
    return {
        getListProfiles: () => dispatch(getListProfiles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(listProfiles)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fee9d7'
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fee9d7'
    },
    card: {
        width: 320,
        height: 470,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fee9d7'
    },
    buttonContainer: {
        width: 220,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        backgroundColor: 'white'
    },
    orange: {
        width: 55,
        height: 55,
        borderWidth: 6,
        borderColor: 'rgb(246,190,66)',
        borderRadius: 55,
        marginTop: -15
    },
    green: {
        width: 75,
        height: 75,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#01df8a',
    },
    red: {
        width: 75,
        height: 75,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#fd267d',
    },
    profile: {
        height: 345, width: null, flex: 1
    }
});
