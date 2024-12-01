import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    actionView:{padding: 15},
    HeadView:{
      paddingBottom: 5,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.navy_blue,
    },
    container: {
      flex: 1,
    },
    scrollView: {
      padding: width* 0.03,
    //   backgroundColor: colors.blue_2,
      marginBottom:15,
    },
    sect_1mainView: {
      marginVertical: width* 0.03,
      backgroundColor: colors.dark_green,
      borderRadius: width* 0.03,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sect_1View: {
      marginLeft: width* 0.035,
    },
    orderIdText: {
      color: colors.white,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    orderedText: {
      color: colors.white,
      fontFamily: 'Lato-Black',
      fontSize: 20,
    },
    sect_2containView: {
      marginVertical: 20,
    },
    ItemHedText: {
      color: colors.dark_green,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    sect_2mainView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    sect_2quantityView: {
      backgroundColor: colors.dark_green,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginRight: 15,
    },
    quantityText: {
      color: colors.white,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    sect_2Name_DesView: {
      width: '55%',
      overflow: 'hidden',
      marginLeft: 15,
    },
    eleNameText: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 20,
    },
    eleDesText: {
      color: colors.black_lvl_3,
      fontFamily: 'Lato-Light',
      fontSize: 15,
    },
    sect_2priceView: {
      width: '20%',
    },
    priceText: {
      color: colors.black_lvl_3,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    sect_3containView: {
      marginVertical: 15,
    },
    payDetailText: {
      color: colors.dark_green,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    sect_3mainView: {
      marginVertical: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 20,
      borderBottomColor: colors.black_lvl_3,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    sect_3firstView: {},
    bagTotal: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    couponDiscount: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    Delivery: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    sect_3secondView: {
      alignItems: 'flex-end',
    },
    totalPrice: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    applyCoupon: {
      color: colors.red,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    deliveryCharge: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 25,
    },
    sect_3TotalAmountView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    TotalAmount: {
      color: colors.black,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    TotalRs: {
      color: colors.black,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    sect_4addView: {
        width: '80%',
      marginVertical: 15,
    },
    addressHead: {
      color: colors.dark_green,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      lineHeight: 25,
    },
    address: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      lineHeight: 20,
    },
    sect_4payMethodContainView: {
      marginVertical: 15,
    },
    payMethod: {
      color: colors.dark_green,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    sect_4iconView: {
      marginVertical: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },
    sect_4payMethodView: {
      marginLeft: 15,
    },
    card: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    online: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    ButtonView: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 15,
      backgroundColor: colors.white,

    }
  });

export default style;
