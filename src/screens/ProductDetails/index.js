import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import colors from '../../components/common/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationBack from '../../components/common/NavigationBack';
import {useDimensionContext} from '../../context';
import style from './style';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from '../../components/CustomTextInput';
import ActionSheet from "react-native-actions-sheet";

const ProductDetails = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const [curActiveSections, setActiveSections] = useState([0]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Description',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        <FontAwesome name="edit" size={28} color={colors.black} />
      </TouchableOpacity>
    );
  };


  const DetailsArray = [
    {
      title: 'Manufacture Details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      title: 'Product Disclimer',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      title: 'Features & Details',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
  ];

  const _renderHeader = sections => {
    return (
      <View
        style={responsiveStyle.renderHeaderView}>
        <Text style={responsiveStyle.descriptionHead}>{sections.title}</Text>
        <AntDesign name="down" size={20} color={colors.gray} />
      </View>
    );
  };
  const _renderContent = sections => {
    return (
      <View>
        <Text style={responsiveStyle.descriptionDetail}>
          {sections.content}
        </Text>
      </View>
    );
  };
  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView style={responsiveStyle.ScrollView}>
      <View style={responsiveStyle.productImagView}>
        <Image
          source={{uri: product.image}}
          style={responsiveStyle.productImage}
        />
      </View>

      <View style={responsiveStyle.mainView}>
        <View style={responsiveStyle.Padding}>
          <Text style={responsiveStyle.productName}>{product.name}</Text>

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <StarRating rating={rating} onChange={setRating} />
            <Text style={responsiveStyle.ratingText}>(3 rating)</Text>
          </View> */}

          <View style={responsiveStyle.priceView}>
            <Text style={responsiveStyle.productPrice}>
              ₹{parseFloat(product.price).toFixed(2)}
              {'   '}
            </Text>
            <Text style={responsiveStyle.offerText}>25% Off</Text>
          </View>

          <View style={responsiveStyle.descriptionView}>
            <Text style={responsiveStyle.descriptionHead}>ProductDetails</Text>
            <Text style={responsiveStyle.descriptionDetail}>
              {product.description}
            </Text>
          </View>

          <>
            <Accordion
              activeSections={curActiveSections}
              sections={DetailsArray}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              underlayColor={'transparent'}
              sectionContainerStyle={{
                paddingVertical: 10,
                borderBottomColor: colors.gray,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </>

          <View style={responsiveStyle.checkDeliveryView}>
            <Text style={responsiveStyle.DeliveryHead}>Check Delivery</Text>
            <Text style={responsiveStyle.DlvyCommonText}>
              Enter PinCode to Check Delivery date/pickup option.
            </Text>
            <CustomTextInput
              searchIcon={false}
              type={'default'}
              check={true}
              handleText={() => console.log('Hello')}
              placeholder={'Pin Code'}
              width={'90%'}
            />
            <Text style={responsiveStyle.DlvyCommonText}>
              Free Delivery on orders above 200.00.
            </Text>
            <Text style={responsiveStyle.DlvyCommonText}>
              Cash-on Delivery available.
            </Text>
            <Text style={responsiveStyle.DlvyCommonText}>
              Easy 21 Day return and exchange.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

// import {
//   Animated,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import style from './style';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useEffect, useRef, useState} from 'react';
// import CommonHeaderLeft from '../../components/CommonHeaderLeft';
// import CommonHeaderRight from '../../components/CommonHeaderRight';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import colors from '../../components/common/colors';
// import StarRating from 'react-native-star-rating-widget';
// import MoreInfo from './components/MoreInfo';
// import ExtraInfo from './components/ExtraInfo';
// import ProductReview from './components/ProductReview';
// import DeliveryInfo from './components/DeliveryInfo';
// import ProductScroll from '../../components/ProductScroll';
// import firestore from '@react-native-firebase/firestore';
// import { updateCartCount } from '../../storage/action';
// import { useDispatch, useSelector } from 'react-redux';
// import { useDimensionContext } from '../../context';

// const ProductDetails = props => {
//   const dimensions = useDimensionContext();
//   const responsiveStyle = style(
//     dimensions.windowWidth,
//     dimensions.windowHeight,
//     dimensions.isPortrait,
//   );
//   const {userId, cartCount} = useSelector(state => state);
//   const navigation = useNavigation();
//   const [ProductDetailsObj, setProductDetails] = useState({});
//   const [rating, setRating] = useState(4);
//   const scrollRef = useRef(null);
//   const route = useRoute();
//   const {product} = route.params;
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => <CommonHeaderLeft type="back" />,
//       headerRight: () => <CommonHeaderRight cart={true} share={true} />,
//       title: '',
//     });
//   }, []);

//   useEffect(() => {
//     setProductDetails(product);
//   }, [product]);

//   const navigationNeeded = (val, item) => {
//     if (val) {
//       scrollRef.current.scrollTo({x: 0, y: 0, Animated: true});
//       setProductDetails(item);
//     }
//   };

//   const handleQuantity = type => {
//     if (type === 'plus') {
//       setQuantity(quantity + 1);
//     } else {
//       if (quantity === 1) {
//         return;
//       } else {
//         setQuantity(quantity - 1);
//       }
//     }
//   };

//   const handleAddToCart = async () => {
//     await firestore()
//       .collection('Cart')
//       .where('userId', '==', userId)
//       .where('productId', '==', ProductDetailsObj)
//       .get()
//       .then(snapshot => {
//         if (snapshot.empty) {
//           firestore().collection('Cart').add({
//             created: Date.now(),
//             description: ProductDetailsObj.description,
//             name: ProductDetailsObj.name,
//             price: ProductDetailsObj.price,
//             quantity: quantity,
//             userId: userId,
//             productId: ProductDetailsObj.id,
//             image: ProductDetailsObj.image,
//           });
//           dispatch(updateCartCount(cartCount + 1));
//         } else {
//           firestore()
//           .collection('Cart')
//           .doc(snapshot?.docs[0].id)
//           .update({
//           quantity: parseInt(snapshot?.docs[0].data().quantity, 10)+ quantity,
//         });
//       }
//       });
//   };

//   return (
//     <View >
//       <ScrollView ref={scrollRef}>
//         {/* <View > */}
//         <View style={responsiveStyle.heart}>
//           {/* <Ionicons name="heart-outline" size={30} color={colors.black} /> */}
//           <Ionicons name="heart-sharp" size={30} color={colors.red} />
//         </View>
//         <View style={responsiveStyle.productImagView}>
//           <Image
//             source={{uri: ProductDetailsObj.image}}
//             style={responsiveStyle.productImage}
//           />
//         </View>
//         <View style={responsiveStyle.mainView}>
//           <View style={responsiveStyle.Padding}>
//             <Text style={responsiveStyle.productName}>
//               {ProductDetailsObj.name}
//             </Text>

//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <StarRating rating={rating} onChange={setRating} />
//               <Text style={responsiveStyle.ratingText}>(3 rating)</Text>
//             </View>

//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <Text style={responsiveStyle.productPrice}>
//                 ₹{parseFloat(ProductDetailsObj.price).toFixed(2)}
//               </Text>
//               <Text style={responsiveStyle.offerText}>25% Off</Text>
//             </View>

//             <MoreInfo />

//             <View style={responsiveStyle.descriptionView}>
//               <Text style={responsiveStyle.descriptionHead}>
//                 ProductDetails
//               </Text>
//               <Text style={responsiveStyle.descriptionDetail}>
//                 {ProductDetailsObj.description}
//               </Text>
//             </View>
//             {/* </View> */}
//             <ExtraInfo />
//             <ProductReview product={props} />
//             <DeliveryInfo />
//           </View>
//           <ProductScroll isNavigationNeeded={navigationNeeded} />
//         </View>
//       </ScrollView>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0.0001,
//           alignSelf: 'center',
//           // padding: 5,
//           backgroundColor: colors.dark_green,
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           alignItems: 'center',
//           width: '100%',

//         }}>
//         <View
//           style={{
//             padding: 10,
//             borderRadius: 8,
//             backgroundColor: colors.white,
//             justifyContent: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             left:50,
//           }}>
//           <TouchableOpacity onPress={() => handleQuantity('minus')}>
//             <AntDesign name="minus" size={20} color={colors.black} />
//           </TouchableOpacity>
//           <Text
//             style={{
//               color: colors.black,
//               fontFamily: 'Lato-Black',
//               fontSize: 20,
//               marginHorizontal: 15,
//             }}>
//             {quantity}
//           </Text>
//           <TouchableOpacity onPress={() => handleQuantity('plus')}>
//             <Feather name="plus" size={20} color={colors.black} />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//         style={{
//           backgroundColor: colors.yellow_2,
//           width:'50%',
//           alignItems: 'center',

//         }}
//         onPress={handleAddToCart}>
//           <Text
//             style={{
//               margin:21,
//               overflow:'hidden',
//               color: colors.black,
//               fontFamily: 'Lato-Bold',
//               fontSize: 22,
//             }}>
//             Add to Cart
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProductDetails;
