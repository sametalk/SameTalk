// STYLES
import {StyleSheet, Platform} from 'react-native';

// UTILS

export const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'black',
    borderRadius: 8.5,
    height: 17,
    position: 'absolute',
    width: 17,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  icon: {height: 30, width: 30},
  miniBubble: {
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 11,
    height: 22,
    position: 'absolute',
    width: 22,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    left: 0,
    marginTop: Platform.OS === 'ios' ? 4 : -4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
