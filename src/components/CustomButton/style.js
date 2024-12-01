import {Dimensions, StyleSheet} from 'react-native';
import colors from '../common/colors';

const {width, height} = Dimensions.get('screen');
const style = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: colors.navy_blue_2,
    marginVertical: width * 0.08,
    // padding: width * 0.045,
    // marginTop: type === 'primary' ? height * 0.05 :  height * 0.005,
    // marginBottom: height * 0.02,
  },
  icon: {
    width: width * 0.07,
    height: width * 0.07,
    marginRight: width * 0.07,
  },
});

export default style;
