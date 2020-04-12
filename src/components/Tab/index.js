// REACT
import React, {useEffect, useRef} from 'react';

// COMPONENTS
import {Animated, Easing, TouchableWithoutFeedback} from 'react-native';

// STYLES
import {styles} from './styles';

// ICONS
import {DashboardIcon, InboxIcon, ProfileIcon} from '../../assets/images';

const Tab = props => {
  const {index, isFocused, onPress, title} = props;

  const animatedBubbleValues = useRef(new Animated.Value(0)).current;
  const animatedBubbleScaleValues = animatedBubbleValues.interpolate({
    inputRange: [0, 0.25, 0.4, 0.525, 0.8, 1],
    outputRange: [0.01, 3, 1.65, 1.65, 3.2, 3],
  });
  const animatedBubbleStyle = {transform: [{scale: animatedBubbleScaleValues}]};

  const animatedIconValues = useRef(new Animated.Value(0)).current;
  const animatedIconColorValues = animatedIconValues.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', 'white'],
  });
  const animatedIconStyles = {
    tintColor: animatedIconColorValues,
  };

  const animatedItemValues = useRef(new Animated.Value(0)).current;
  const animatedItemStyle = {transform: [{translateY: animatedItemValues}]};

  const animatedMiniBubbleValues = useRef(new Animated.Value(0)).current;
  const animatedMiniBubbleHeightValues = animatedMiniBubbleValues.interpolate({
    inputRange: [0, 0.01, 1],
    outputRange: [0, 1, 1],
  });
  const animatedMiniBubbleTranslateValues = animatedMiniBubbleValues.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [13, 0],
    },
  );
  const animatedMiniBubbleStyle = {
    opacity: animatedMiniBubbleHeightValues,
    transform: [{translateY: animatedMiniBubbleTranslateValues}],
  };

  const animatedTitleValues = animatedBubbleValues.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 60],
  });
  const animatedTitleStyle = {
    transform: [{translateY: animatedTitleValues}],
  };

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(animatedBubbleValues, {
        duration: 600,
        easing: Easing.inOut(Easing.out(Easing.ease)),
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(animatedIconValues, {
        duration: 2600,
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(animatedItemValues, {
        delay: 100,
        duration: 600,
        easing: Easing.in(Easing.elastic(1.5)),
        toValue: -30,
        useNativeDriver: true,
      }),
      Animated.timing(animatedMiniBubbleValues, {
        delay: 20000,
        duration: 1600,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const endAnimation = () => {
    Animated.parallel([
      Animated.timing(animatedBubbleValues, {
        duration: 850,
        easing: Easing.out(Easing.ease),
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animatedIconValues, {
        delay: 300,
        duration: 1600,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(animatedItemValues, {
        duration: 600,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animatedMiniBubbleValues, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isFocused) {
      startAnimation();
    } else {
      endAnimation();
    }
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[animatedItemStyle, styles.container]}>
        <Animated.View style={[animatedBubbleStyle, styles.bubble]} />
        <Animated.View style={[animatedMiniBubbleStyle, styles.miniBubble]} />
        <Animated.Image
          source={
            title === 'CompatibleProfileStack'
              ? DashboardIcon
              : title === 'SelectInterests'
              ? InboxIcon
              : ProfileIcon
          }
          style={[animatedIconStyles, styles.icon]}
        />

        <Animated.View style={[animatedTitleStyle, styles.titleContainer]}>
          <Animated.Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{color: isFocused ? 'black' : 'white'}}>
            {title === 'CompatibleProfileStack'
              ? 'Personas'
              : title === 'SelectInterests'
              ? 'Intereses'
              : 'Perfil'}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Tab;
