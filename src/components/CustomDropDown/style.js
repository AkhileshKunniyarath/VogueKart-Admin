import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
      // position: 'absolute',
      // flex: 1,
      // zIndex:1,
    },
    descriptionDetail: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.iron,
      lineHeight: 40,
    },
  });

export default style;
