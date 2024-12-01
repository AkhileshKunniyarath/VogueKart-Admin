import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    renderHeaderView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
    },
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
    },
    descriptionDetail: {
      fontFamily: 'Lato-Regular',
      fontSize: 17,
      color: colors.gray,
    },
    ScrollView:{flex: 1},
    productImagView: {
      width: width,
      height: height * 0.39,
      marginVertical: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: colors.white_Bg,
      // borderBottomWidth: 0.5,
    },
    productImage: {
      width: width * 0.95,
      height: width * 0.89,
      resizeMode: 'contain',
      marginTop: 15,
      overflow: 'hidden',
    },
    mainView: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      width: width,
      shadowColor: colors.black,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 15,
      marginBottom: 60,
    },
    Padding: {
      padding: width * 0.05,
    },
    productName: {
      fontFamily: 'Lato-Bold',
      fontSize: 25,
      color: colors.black,
      marginBottom: 10,
    },
    priceView:{flexDirection: 'row', alignItems: 'center'},
    productPrice: {
      fontFamily: 'Lato-Bold',
      fontSize: 28,
      color: colors.black_lvl_3,
      marginVertical: 5,
    },
    offerText: {
      fontFamily: 'Lato-Regular',
      fontSize: 20,
      color: colors.green,
      marginLeft: 10,
    },
    descriptionView: {
      borderBottomWidth: 1,
      borderBottomColor: colors.gray_2,
      paddingVertical: 10,
    },
    checkDeliveryView: {
      marginTop: 10,
    },
    DeliveryHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
      marginBottom: 10,
    },
    DlvyCommonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: colors.black_lvl_2,
      lineHeight: 25,
    },
    // productContainer: {
    // position: 'relative', // Allows child elements to use absolute positioning
    // width: width,
    // alignItems: 'center',
    // backgroundColor: colors.white_lvl_1,
    // marginBottom: 15,
    // },
    // heart: {
    //   position: 'absolute',
    //   top: 15, // Adjust to position the icon as needed
    //   right: 28, // Adjust to position the icon as needed
    //   zIndex: 1, // Ensures the icon is on top of the image
    // },
    // productDescription: {
    //   fontFamily: 'Lato-Regular',
    //   fontSize: 19,
    //   color: colors.gray,
    //   // marginBottom: 10,
    // },
    // ratingText: {
    //   fontFamily: 'Lato-Regular',
    //   fontSize: 20,
    //   color: colors.black_lvl_3,
    //   marginLeft: 10,
    // },
  });
export default style;
