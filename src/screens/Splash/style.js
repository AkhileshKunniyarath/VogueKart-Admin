import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    logo: {
      width: width * 0.5,
      height: width * 0.1,
      resizeMode: 'contain',
    },
  });

export default style;
