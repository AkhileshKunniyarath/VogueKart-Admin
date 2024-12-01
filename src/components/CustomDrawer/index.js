import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDimensionContext} from '../../context';
import {useDispatch} from 'react-redux';
import {signout} from '../../storage/actions';
import style from './style';
import colors from '../common/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { CommonActions } from '@react-navigation/native';

const CustomDrawer = ({ navigation }) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  // const [selected, setSelected] = useState('');
  // const navigation = useNavigation();
  const dispatch = useDispatch(); // Dispatch for logout

  const handleLogout = () => {
    dispatch(signout()); // Call signout action
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Reset to the Login screen
      })
    );
  };

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigateTo: 'Home',
      icon: () => {
        return (
          <Entypo
            name="home"
            size={29}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    {
      itemId: 1,
      itemName: 'Products',
      navigateTo: 'Products',
      icon: () => {
        return (
          <Feather
            name="shopping-bag"
            size={27}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    {
      itemId: 2,
      itemName: 'Orders',
      navigateTo: 'Orders',
      icon: () => {
        return (
          <Octicons
            name="list-ordered"
            size={25}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    {
      itemId: 3,
      itemName: 'Reviews',
      navigateTo: 'Reviews',
      icon: () => {
        return (
          <MaterialIcons
            name="reviews"
            size={26}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    {
      itemId: 4,
      itemName: 'Banner',
      navigateTo: 'Banner',
      icon: () => {
        return (
          <Feather
            name="sliders"
            size={26}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    {
      itemId: 5,
      itemName: 'Offers',
      navigateTo: 'Offers',
      icon: () => {
        return (
          <MaterialIcons
            name="discount"
            size={27}
            color={colors.black}
            style={responsiveStyle.icon}
          />
        );
      },
    },
    // {
    //   itemId: 6,
    //   itemName: 'Logout',
    //   onPress: handleSignOut,
    //   icon: () => {
    //     return (
    //       <MaterialIcons
    //         name="logout"
    //         size={27}
    //         color={colors.black}
    //         style={responsiveStyle.icon}
    //       />
    //     );
    //   },
    // },
  ];
  
  const handleNavigation = (navigateTo) => {
    if (['Home', 'Products', 'Orders', 'Profile'].includes(navigateTo)) {
      navigation.navigate('Footer', {
        screen: navigateTo, // Specify the screen inside the tab navigator
      });
    } else {
      navigation.navigate(navigateTo); // Direct screens in Drawer
    }
  };

  return (
    <ScrollView style={responsiveStyle.mainCon}>
      <View
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // alignSelf:'flex-start',
        }}>
        <View
          style={{
            width: 85,
            height: 85,
            borderRadius: 85 / 2,
            backgroundColor: colors.black,
          }}></View>
        <View style={{marginRight: 80}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Lato-Regular',
              color: colors.black,
            }}>
            Admin
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Lato-Regular',
              color: colors.black,
            }}>
            Admin@gmail.com
          </Text>
        </View>
      </View>
      {/* // drawer */}
      <View style={responsiveStyle.commonMargin}>
        <View>
          {contents.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleNavigation(item.navigateTo)}
                style={responsiveStyle.drawerView}>
                <View style={responsiveStyle.drawerInnerView}>
                  {item.icon()}
                  <Text style={responsiveStyle.drawerText}>
                    {item.itemName}
                  </Text>
                </View>
                <Image
                  source={require('../../assets/images/arrow-right.png')}
                  style={responsiveStyle.iconSecond}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={{ padding: 16 }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 80,
        }}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={{
            width: 180,
            height: 50,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Lato-Regular',
            color: colors.black,
          }}>
          All rights reserved
        </Text>
      </View>
    </ScrollView>
  );
};
export default CustomDrawer;

