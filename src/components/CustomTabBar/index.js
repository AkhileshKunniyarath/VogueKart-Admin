import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDimensionContext} from '../../context';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomTabBar = ({state, navigation}) => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [active, setActive] = useState('Home');
  const activeSize = 32;
  const activeFamily = 'Lato-Black';
  const activeColor = '#000';

  return (
    <View style={responsiveStyle.mainContainer}>
      {state.routes.map((route, index) => {
        console.warn(route);
        {
          Size = route.name === active ? activeSize : 25;
          clr = route.name === active ? activeColor : '#000';
        }
        const icon =
          route.name === 'Home' ? (
            <AntDesign name="home" size={Size} color={clr} />
          ) : route.name === 'Products' ? (
            <AntDesign
              name="inbox"
              size={Size}
              // size={active === 'Products' ? activeSize : 25}
              color={clr}
            />
          ) : route.name === 'Orders' ? (
            <AntDesign
              name="database"
              size={Size}
              // size={active === 'Orders' ? activeSize : 25}
              color={clr}
            />
          ) : route.name === 'Profile' ?  (
            <AntDesign
              name="user"
              size={Size}
              // size={active === 'Profile' ? activeSize : 25}
              color={clr}
            />
          ) : null ;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(route.name), setActive(route.name);
            }}
            style={responsiveStyle.touchContainer}>
            <View style={responsiveStyle.iconStyle}>{icon}</View>z
            <Text
              style={[
                responsiveStyle.footerText,
                route.name === active
                  ? {fontFamily: activeFamily}
                  : {fontFamily: 'Lacto-Regular'},
              ]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* <TouchableOpacity
        onPress={() => handleNavigation('Home')}
        style={responsiveStyle.touchContainer}>
        <AntDesign
          name="home"
          size={active === 'Home' ? activeSize : 25}
          color="#000"
        />
        <Text
          style={[
            responsiveStyle.footerText,
            active === 'Home' ? {fontFamily:activeFamily} : {fontFamily:'Lato-Light'},
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Products')}
        style={responsiveStyle.touchContainer}>
        <AntDesign
          name="inbox"
          size={active === 'Products' ? activeSize : 25}
          color="#000"
        />
        <Text
          style={[
            responsiveStyle.footerText,
            active === 'Products' ? {fontFamily:activeFamily} : {fontFamily:'Lato-Light'},
          ]}>
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Orders')}
        style={responsiveStyle.touchContainer}>
        <AntDesign
          name="database"
          size={active === 'Orders' ? activeSize : 25}
          color="#000"
        />
        <Text
          style={[
            responsiveStyle.footerText,
            active === 'Orders' ? {fontFamily:activeFamily} : {fontFamily:'Lato-Light'},
          ]}>
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Profile')}
        style={responsiveStyle.touchContainer}>
        <AntDesign
          name="user"
          size={active === 'Profile' ? activeSize : 25}
          color="#000"
        />
        <Text
          style={[
            responsiveStyle.footerText,
            active === 'Profile' ? {fontFamily:activeFamily} : {fontFamily:'Lato-Light'},
          ]}>
          Profile
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomTabBar;

// import React, {useEffect} from 'react';
// import {Image, Text, TouchableOpacity, View} from 'react-native';
// import {useDimensionContext} from '../../context';
// import style from './style';
// import {useDispatch, useSelector} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import { updateCartCount } from '../../storage/action';

// const CustomFooter = ({state, descriptors, navigation}) => {
//   const dimensions = useDimensionContext();
//   const responsiveStyle = style(
//     dimensions.windowWidth,
//     dimensions.windowHeight,
//     dimensions.isPortrait,
//   );

// const {cartCount, userId} = useSelector(state => state);
// const dispatch = useDispatch();

// useEffect(() => {
//     getCartProducts();
//   }, []);

// const getCartProducts = async () => {
//   await firestore()
//     .collection('Cart')
//     .where('userId', '==', userId)
//     .get()
//     .then(snapshot => {
//       dispatch(updateCartCount(snapshot.size));
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

//   return (
//     <View style={responsiveStyle.mainContainer}>
//       {state.routes.map((route, index) => {
//         const isFocused = state.index === index;
//         const icon =
//           route.name === 'Home'
//             ? require('../../assets/images/home.png')
//             : route.name === 'Products'
//             ? require('../../assets/images/categories.png')
//             : route.name === 'Orders'
//             ? require('../../assets/images/search.png')
//             : require('../../assets/images/offers.png');
//         return (
//           <TouchableOpacity
//             key={index}
//             onPress={() => navigation.navigate(route.name)}
//             style={responsiveStyle.touchContainer}>
//             {/* {isFocused? <Text style={responsiveStyle.dot}>.</Text>: null} */}
//             {/* {route.name === 'Cart' ? (
//               <View style={responsiveStyle.cartCount}>
//                 <Text style={responsiveStyle.count}>{cartCount}</Text>
//               </View>
//             ) : null} */}
//             <Image source={icon} style={responsiveStyle.iconStyle} />
//             <Text style={responsiveStyle.footerText}>{route.name}</Text>
//             {isFocused ? <Text style={responsiveStyle.dot}>.</Text> : null}
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };
// export default CustomFooter;
