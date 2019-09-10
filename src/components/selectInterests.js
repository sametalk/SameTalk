import React, { Component } from 'react';
import { ListItem, CheckBox } from 'react-native-elements'
import { View } from 'react-native';
import { Container, Content, Footer, Button , Text, FooterTab } from 'native-base';

const list = [
    {
        id: 1,
        name: 'Deporte',
        avatar_url: require('../../assets/image/deporte.jpg')
    },
    {
        id: 2,
        name: 'Politica',
        avatar_url: require('../../assets/image/politica.jpg')
    },
    {
        id: 3,
        name: 'Arte',
        avatar_url: require('../../assets/image/arte.jpeg')
    },
    {
        id: 4,
        name: 'Economia',
        avatar_url: require('../../assets/image/economia.jpg')
    },
    {
        id: 5,
        name: 'Cultura',
        avatar_url: require('../../assets/image/cultura.jpg')
    },
    {
        id: 6,
        name: 'Entretenimiento',
        avatar_url: require('../../assets/image/entretenimiento.jpg')
    }
];

export default class selectInterests extends Component {

    state = {
        interests: [list],
        selectedInterestsId: []
    };

    _perfil = () => {
        this.props.navigation.navigate('Perfil')
    }

    onCheckBoxPress(id) {
        let tmp = this.state.selectedInterestsId;

        if (tmp.includes(id)) {
            tmp.splice(tmp.indexOf(id), 1);
        } else {
            tmp.push(id);
        }

        this.setState({
            selectInterests: tmp
        });
    }

    render() {
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
                                    checked={this.state.selectedInterestsId.includes(i) ? true : false}
                                    onPress={() => this.onCheckBoxPress(i)}
                                />}
                                subtitle={l.subtitle}
                                bottomDivider
                            />
                        ))}
                    </View>
                </Content>
                <Footer>
                    <FooterTab>                
                        <Button full onPress={this._perfil}>
                            <Text>Siguiente ></Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        )
    }
}