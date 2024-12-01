import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {
      padding:15,
    },
    ActionSheetView :{padding: 15},
    ActionSheetHeadView: {
      paddingBottom: 5,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.navy_blue,
    },
    ItemHedText: {
      color: colors.dark_green,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    commonView:{
      padding: 20,
      paddingBottom: 15,
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
    },
    camGlyView : {
      justifyContent:'center',
      alignItems: 'center',
    },
    camGlyText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color:colors.black,
      lineHeight:45,
    },
    imageText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color:colors.black,
      lineHeight:55,
    },
    CloseIcon: {
      position: 'absolute',
      zIndex: 9,
      right: -10,
      top: -10,
      overflow: 'hidden',
    },
    imageView:{width: 100, height: 100, resizeMode: 'contain'},
  });

export default style;
