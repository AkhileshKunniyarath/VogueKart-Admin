import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    container: {
      height: height,
    },
    ActionSheetView: {padding: 15},
    ItemHedView: {
      paddingBottom: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.navy_blue,
    },
    ItemHedText: {
      color: colors.dark_green,
      fontFamily: 'Lato-Black',
      fontSize: 25,
    },
    buttonView: {marginVertical: 5},
    ActionSheetContentView: {
      margin: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ChooseIconView: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    ChooseIconText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      marginTop: 10,
    },
    contentStyle: {
      alignSelf: 'center',
      marginVertical: height * 0.05,
    },
    renderView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width,
      alignSelf: 'center',
      justifyContent: 'center',
      marginBottom: height * 0.018,
    },
    offCircleView: {
      marginRight: (-height * 0.025) / 2,
      zIndex: 99,
    },
    circleRight: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white_Bg,
    },
    couponView: {
      width: '67%',
      height: 100,
      backgroundColor: colors.golden_yellow,
      padding: 20,
    },
    OfferCountView: {flexDirection: 'row', alignItems: 'center'},
    OfferCountText: {
      fontFamily: 'Lato-Bold',
      color: colors.brown,
      fontSize: 50,
      marginTop: -7,
      marginLeft: -4,
    },
    OfferPercentText: {
      fontFamily: 'Lato-Regular',
      color: colors.brown,
      fontSize: 25,
      marginTop: 10,
    },
    OFFText: {
      fontFamily: 'Lato-Bold',
      color: colors.brown,
      fontSize: 16,
    },
    commonHedView: {marginLeft: 5},
    headText: {
      fontFamily: 'Lato-Bold',
      color: colors.black,
      fontSize: 18,
    },
    subHedText: {
      fontFamily: 'Lato-Regular',
      color: colors.black,
      fontSize: 14,
    },
    divisionColor: {
      justifyContent: 'space-between',
      height: 100,
      backgroundColor: colors.navy_blue_2,
    },
    circleCenter: {
      width: 18,
      height: 18,
      borderRadius: 18 / 2,
      backgroundColor: colors.white_Bg,
      marginTop: -25 / 2,
    },
    codeHedView: {
      width: '25%',
      height: 100,
      backgroundColor: colors.golden_yellow,
      padding: 10,
    },
    codeHedText: {
      fontFamily: 'Lato-Bold',
      color: colors.black,
      fontSize: 15,
      marginRight: 3,
    },
    CodeView :{
      marginVertical: 10,
      padding: 8,
      justifyContent: 'center',
      borderRadius: 15,
      backgroundColor: colors.green,
      overflow: 'hidden',
      marginRight: 7,
      marginLeft: -5,
    },
    CodeText: {
      fontFamily: 'Lato-Regular',
      color: colors.white,
      alignSelf: 'center',
    },
    
   
  });

export default style;
