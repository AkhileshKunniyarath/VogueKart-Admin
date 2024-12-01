import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    container: {
      height: height * 0.98,
    },
    flatView: {flex: 1, padding: 5, marginBottom:50,},
    TouchStyle: {
      padding: 15,
      overflow: 'hidden',
      marginTop: 15,
      marginHorizontal: 15,
      borderRadius: 15,
      height: 190,
      backgroundColor: colors.light_gray,
      // alignSelf: 'center',
    },
    innerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: colors.pebble,
      borderBottomWidth: 2,
      paddingBottom: 10,
    },
    orderId: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black,
      lineHeight: 30,
    },
    OrderedOn: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.dark_green,
      lineHeight: 30,
    },
    address: {
      color: colors.iron,
      fontFamily: 'Lato-Regular',
      fontSize: 15,
      lineHeight: 20,
    },
    paidText: {
      color: '#000',
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    totalAmount: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black,
      lineHeight: 40,
    },
    itemCount: {
      color: colors.navy_blue,
      fontFamily: 'Lato-Bold',
      fontSize: 16,
      lineHeight: 30,
    },
    mapImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      overflow: 'hidden',
      resizeMode: 'cover',
    },
    bottomView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
    },
    bottomText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
  });

export default style;
