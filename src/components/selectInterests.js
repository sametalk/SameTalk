import React, { Component } from 'react';
import { ListItem, CheckBox } from 'react-native-elements'
import { View } from 'react-native';
import { Container, Content, Footer, Button , Text, FooterTab } from 'native-base';
import Storage from '../storage';

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
        selectedInterestsId: [],
    };

    componentDidMount() {
        console.disableYellowBox = true;
    }
    
    _perfil = () => {

        /*const data = {
            id: this.state.data.id,
            username: this.state.data.username,
            full_name: this.state.data.full_name,
            profile_picture: this.state.data.profile_picture,
            bio: this.state.data.bio,
            follows: this.state.data.counts.follows,
            followed_by: this.state.data.counts.followed_by
          };
          fetch("https://sametalk-backend.herokuapp.com/api/users/", {
            method: "POST", 
            body: JSON.stringify(data), 
            headers: {
              "Content-Type": "application/json"
            }
          });*/
        //await Storage.setItem('interests',{interests: this.state.selectedInterestsId}); 
        let objeto = this.props.navigation.state.params
        this.props.navigation.navigate('Perfil',{
            data: objeto.data, 
            date: objeto.date, 
            country: objeto.country, 
            sex: objeto.sex,
            interests: this.state.selectedInterestsId
        });
    }


    onCheckBoxPress(id) {
        let tmp = this.state.selectedInterestsId;

        if (tmp.includes(id)) {
            tmp.splice(tmp.indexOf(id), 1);
        } else {
            tmp.push(id);
        }

        this.setState({
            selectedInterestsId: tmp
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