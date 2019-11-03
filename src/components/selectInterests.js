import React, { Component } from 'react';
import { ListItem, CheckBox } from 'react-native-elements'
import { View } from 'react-native';
import { Container, Content } from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../actions';
import list from '../constant/interests'

class selectInterests extends Component {

    componentDidMount() {
        console.disableYellowBox = true;
    }

    /*
        Funcion para refrescar el checkbox del interes
        Se fija que el id del interes este en el storage de intereses seleccionados
    */
    refreshCheck(id){
        let flag = false
        this.props.interests.forEach(item => {
            if(item.id === id){
                flag = true
            }
        });
        return flag
    }

    render() {
        const {selectedInterests} = this.props
        return (
            <Container>
                <Content padder>
                    <View>
                        {list.map((l, i) => (
                            <ListItem
                                key={i}
                                leftAvatar={{ source: l.avatar_url }}
                                title={<CheckBox
                                    title={l.name}
                                    checked={this.refreshCheck(l.id)}
                                    onPress={() => selectedInterests(l)}
                                />}
                                subtitle={l.subtitle}
                                bottomDivider
                            />
                        ))}
                    </View>
                </Content>
            </Container>

        )
    }
}

const mapStateToProps = state => {
    return {interests: state.interests}
}

export default connect(mapStateToProps, actions)(selectInterests)
