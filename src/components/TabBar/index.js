// REACT
import React from 'react';

// COMPONENTS
import {SafeAreaView, View} from 'react-native';
import Tab from '../Tab';

// STYLES
import styles from './styles';

const TabBar = props => {
  const {navigationState} = props;
  const {routes} = navigationState;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {routes.map((route, index) => {
          const isFocused = navigationState.index === index;
          return (
            <Tab
              index={index}
              isFocused={isFocused}
              key={index}
              onPress={() => props.navigation.navigate(route.routeName)}
              title={route.routeName}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
