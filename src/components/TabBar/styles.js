// LIBS
import {StyleSheet} from 'react-native';
import {WHITE} from '../../constant/colors'; 
// STYLES

// ────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    },
    elevation: 10,
  },
});

export default styles;
