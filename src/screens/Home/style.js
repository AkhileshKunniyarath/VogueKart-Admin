import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    headerLeftIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
      marginHorizontal: 10,
      // marginRight: 5,
    },
    headerRightLogo: {width: 180, height: 50, resizeMode: 'contain', right: 15},
    Container: {flex: 1, padding: 15},
    OrderTouch: {
      width: '95%',
      height: '25%',
      padding: 15,
      borderRadius: 15,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      backgroundColor: colors.blue_2,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    Icon: {width: 90, height: 90, resizeMode: 'contain'},
    TextView: {marginLeft: 15},
    CountText: {
      fontFamily: 'Lato-Bold',
      fontSize: 32,
      color: colors.black,
    },
    Text: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black,
    },
    ProductTouch: {
      width: '95%',
      height: '25%',
      padding: 15,
      borderRadius: 15,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      backgroundColor: '#0eaf',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    UserTouch: {
      width: '95%',
      height: '25%',
      padding: 15,
      borderRadius: 15,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      backgroundColor: colors.orange_2,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
  });

export default style;
