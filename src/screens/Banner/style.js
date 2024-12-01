import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {flex: 1},
    ActionSheetCont: {padding: 15},
    ItemHedView: {
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
    ImageTouch: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      marginVertical: 10,
      borderColor: colors.green,
      borderWidth: 1,
      borderRadius: 8,
    },
    imageText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black,
      lineHeight: 55,
    },
    TouchClose: {
      position: 'absolute',
      zIndex: 9,
      right: -10,
      top: -10,
      overflow: 'hidden',
    },
    ImageSize: {width: 100, height: 100, resizeMode: 'contain'},
    commonView: {
      padding: 20,
      paddingBottom: 15,
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
    },
    CamGlyView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    CamGlyText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.black,
      lineHeight: 25,
    },
    buttonView: {marginVertical: 20},
    FlatListContainer: {
      paddingBottom: 20,
      alignSelf: 'center',
      margin: 10,
    },
    ImageBackground: {
      width: width * 0.95,
      height: height * 0.2,
      resizeMode: 'cover',
      borderRadius: 10,
      overflow: 'hidden',
      margin: 5,
      backgroundColor: colors.black,
    },
    EditDeleteView: {
      position: 'absolute',
      top: 10,
      right: 3,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
      justifyContent: 'space-around',
      backgroundColor: colors.white,
      padding: 5,
      borderRadius: 8,
    },
    NameView: {alignItems: 'flex-start', left: 10, top: 5},
    NameText: {
      color: colors.iron,
      fontFamily: 'Lato-Regular',
      fontSize: 20,
      backgroundColor: colors.white,
      padding: 5,
      borderRadius: 8,
    },
  });

export default style;
