import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    FlatList : {
        flex: 1,
        padding: 10,
        backgroundColor: colors.light_gray,
        alignSelf: 'center',
      },
      TouchableOpacity:{
        justifyContent: 'center',
        // alignItems: 'center',
        // marginVertical: 1,
        margin: 1,
        // borderRadius: 15,
        width: '50%',
        height: height * 0.26,
        backgroundColor: colors.white,
        alignSelf: 'center',
        overflow: 'hidden',
      },
      editDeleteView :{
        position: 'absolute',
        top: 10,
        right: 3,
        // overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        justifyContent: 'space-around',
      },
      imageView: {
        top: -1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.green,
        width: '95%',
        height: height * 0.16,
        marginTop: 10,
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        // borderRadius: 40,
        overflow: 'hidden',
        // margin: 10,
      },
      detailsView: {
        // marginHorizontal: 5,
        // alignSelf: 'center',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: colors.cream_2,
        // width: '80%',
        height: height * 0.099,
      },
      name: {
        left: 10,
        fontFamily: 'Lato-Black',
        fontSize: 20,
        color: colors.black,
        lineHeight: 30,
      },
      description: {
        left: 10,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        width: '95%',
        color: colors.gray,
        lineHeight: 18,
      },
      priceText : {
        left: 10,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black,
        lineHeight: 30,
      },
  });
export default style;
