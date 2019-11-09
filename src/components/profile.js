import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Text, Button } from 'native-base';
import { connect } from 'react-redux';

class profile extends Component {

    render() {
        const { userData, interests } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.perfilZone}>
                    <View style={styles.imageZone}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: userData.profile_picture }}
                            containerStyle={styles.avatar}
                        />
                    </View>
                    <View style={styles.dateZone}>
                        <View style={styles.textZone}>
                            <Text style={styles.name}>{userData.full_name}</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.age}>{userData.age} años</Text>
                        </View>
                        <View style={styles.textZone}>
                            <Text style={styles.country}>{userData.country_id.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.interestZone}>
                    <Button transparent>
                        <Text style={{ textAlign: "center" }}>Sus intereses seleccionados son:</Text>
                    </Button>
                    {interests.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: l.avatar_url }}
                            title={l.name}
                            subtitle={l.subtitle}
                            bottomDivider
                        />
                    ))}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        interests: state.interests
    }
}

export default connect(mapStateToProps)(profile)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    perfilZone: {
        flex: 1,
        flexDirection: 'row'
    },
    interestZone: {
        flex: 2,
        flexDirection: 'column'
    },
    imageZone: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dateZone: {
        flex: 1,
        flexDirection: 'column'
    },
    textZone: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 25
    },
    age: {
        fontSize: 20,
        color: 'green'
    },
    country: {
        fontSize: 20
    },
    avatar: {
        alignSelf: 'center'
    }
});