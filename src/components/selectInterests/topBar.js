import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);

const BackAction = () => (
  <TopNavigationAction icon={BackIcon}/>
);

export default TopNavigationSimpleUsageShowcase = () => (
  <TopNavigation
    leftControl={BackAction()}
    title='Application Title'
  />
);