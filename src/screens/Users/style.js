import {StyleSheet} from 'react-native';
import colors from '../../components/common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
   blockTouch: {
    position: 'absolute',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 2,
    right: 5,
  },
  blockTexts: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.white,
  },
  flatList: {flex: 1, padding: 5},
  mainView : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 15,
    width: '92%',
    backgroundColor: colors.light_gray,
    padding: 5,
    alignSelf: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 40,
    overflow: 'hidden',
    margin: 10,
  },
  ContentView : {
    marginLeft: 15,
  },
  userName: {
    fontFamily: 'Lato-Black',
    fontSize: 20,
    color: colors.black,
    lineHeight: 30,
  },
  email : {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.navy_blue_2,
    lineHeight: 25,
  },
  mobNumber: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: colors.black,
    lineHeight: 20,
  },

  });
export default style;