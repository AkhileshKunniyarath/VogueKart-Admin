import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import NavigationBack from '../../components/common/NavigationBack';
import Snackbar from 'react-native-snackbar';
import {useDimensionContext} from '../../context';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import colors from '../../components/common/colors';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
// import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [offercode, setOffercode] = useState('');
  const [offer, setOffer] = useState('');
  const [head, setHead] = useState('');
  const [subhead, setSubhead] = useState('');
  const [type, setType] = useState(null);
  const actionSheetRef = useRef(null);
  const actionSheetRefChooseOption = useRef(null);
  const [selected, setSelected] = useState(null);
  const [offerId, setOfferId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          actionSheetRef.current?.show();
        }}>
        <AntDesign name="plussquareo" size={28} color={colors.black} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
          // console.warn(objArray)
        }
      });
  };

  const handleCreate = async () => {
    if (head !== '' && subhead !== '' && offer !== '' && offercode !== '') {
      // const responseUri = await uploadImage(uploadUri);
      const product = {
        head: head,
        subhead: subhead,
        offer: offer,
        offercode: offercode,
      };
      await firestore()
        .collection('Offers')
        .add(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Offer Added Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setHead('');
          setSubhead('');
          setOffer('');
          setOffercode('');
          getOffers();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const handleEdit = () => {
    actionSheetRefChooseOption.current.hide();
    setTimeout(() => {
      setOfferId(selected.id);
      setHead(selected.head);
      setSubhead(selected.subhead);
      setOffer(selected.offer);
      setOffercode(selected.offercode);
      setType('edit');
      actionSheetRef.current?.show();
    }, 500);
  };

  const handleUpdateOffer = async () => {
    if (
      offerId &&
      head !== '' &&
      subhead !== '' &&
      offer !== '' &&
      offercode !== ''
    ) {
      // const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri ;
      const product = {
        head: head,
        subhead: subhead,
        offer: offer,
        offercode: offercode,
      };
      await firestore()
        .collection('Offers')
        .doc(offerId)
        .update(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Offer Updated Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setHead('');
          setSubhead('');
          setOffer('');
          setOffercode('');
          getOffers();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  // const handleCopy = async () => {
  //   actionSheetRefChooseOption.current.hide();
  //   setTimeout(() => {
  //     Clipboard.setString(selected.offercode);
  //   }, 500);
  // };

  const handleDelete = async () => {
    actionSheetRefChooseOption.current.hide();
    Alert.alert('CONFIRM  DELETION', 'Do you want to DELETE this Offer ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'DELETE Offer',
        onPress: async () => {
          await firestore()
            .collection('Offers')
            .doc(selected.id)
            .delete()
            .then(() => {
              setTimeout(() => {
                Snackbar.show({
                  text: 'Offer Deleted Successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.white,
                  textColor: colors.black,
                });
              }, 1000);
            });
          setSelected(null);
          getOffers();
        },
      },
    ]);
  };

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <ActionSheet ref={actionSheetRef}>
          <View style={responsiveStyle.ActionSheetView}>
            <View style={responsiveStyle.ItemHedView}>
              <Text style={responsiveStyle.ItemHedText}>
                {type === 'add' ? 'Create Offer' : 'Update Offer'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current?.hide();
                  setType(null);
                  setSelected(null);
                  setHead('');
                  setSubhead('');
                  setOffer('');
                  setOffercode('');
                }}>
                <AntDesign name="closecircleo" size={25} color={colors.black} />
              </TouchableOpacity>
            </View>

            <CustomTextInput
              value={head}
              width={'100%'}
              type="Default"
              handleText={text => setHead(text)}
              placeholder="Heading"
              searchIcon={false}
            />

            <CustomTextInput
              value={subhead}
              width={'100%'}
              type="Default"
              handleText={text => setSubhead(text)}
              placeholder="Description"
              searchIcon={false}
            />

            <CustomTextInput
              value={offer}
              width={'100%'}
              type="Default"
              handleText={text => setOffer(text)}
              placeholder="Offer Percentage"
              searchIcon={false}
            />

            <CustomTextInput
              value={offercode}
              width={'100%'}
              type="Default"
              handleText={text => setOffercode(text)}
              placeholder="Offer Code"
              searchIcon={false}
            />

            <View style={responsiveStyle.buttonView}>
              <CustomButton
                width={'100%'}
                height={55}
                type="primary"
                handleButtonPress={
                  type === 'add' ? handleCreate : handleUpdateOffer
                }
                buttonText={type === 'add' ? 'Create' : 'Update'}
              />
            </View>
          </View>
        </ActionSheet>

        <ActionSheet ref={actionSheetRefChooseOption}>
          <View style={responsiveStyle.ActionSheetView}>
            <View style={responsiveStyle.ItemHedView}>
              <Text style={responsiveStyle.ItemHedText}>Choose Action</Text>
              <TouchableOpacity
                onPress={() => actionSheetRefChooseOption.current.hide()}>
                <AntDesign name="closecircleo" size={25} color={colors.black} />
              </TouchableOpacity>
            </View>

            <View style={responsiveStyle.ActionSheetContentView}>
              <View style={responsiveStyle.ChooseIconView}>
                <Feather
                  onPress={handleEdit}
                  name="edit"
                  size={35}
                  color={colors.black}
                />
                <Text style={responsiveStyle.ChooseIconText}>Edit</Text>
              </View>

              <View style={responsiveStyle.ChooseIconView}>
                <AntDesign
                  // onPress={handleCopy}
                  name="copy1"
                  size={35}
                  color={colors.dark_green}
                />
                <Text style={responsiveStyle.ChooseIconText}>Copy</Text>
              </View>

              <View style={responsiveStyle.ChooseIconView}>
                <AntDesign
                  onPress={handleDelete}
                  name="delete"
                  size={35}
                  color={colors.red}
                />
                <Text style={responsiveStyle.ChooseIconText}>Delete</Text>
              </View>
            </View>
          </View>
        </ActionSheet>

        <FlatList
          data={offers}
          extraData={offers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={responsiveStyle.contentStyle}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  actionSheetRefChooseOption.current.show();
                }}
                style={responsiveStyle.renderView}>
                {/* startcode */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>

                <View style={responsiveStyle.couponView}>
                  <View style={responsiveStyle.OfferCountView}>
                    <Text style={responsiveStyle.OfferCountText}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text style={responsiveStyle.OfferPercentText}>%</Text>
                      <Text style={responsiveStyle.OFFText}>OFF</Text>
                    </View>
                    <View style={responsiveStyle.commonHedView}>
                      <Text style={responsiveStyle.headText}>{item.head}</Text>
                      <Text style={responsiveStyle.subHedText}>
                        {item.subhead}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={responsiveStyle.divisionColor}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View
                    style={[
                      responsiveStyle.circleCenter,
                      {marginBottom: -25 / 2},
                    ]}></View>
                </View>
                <View
                  style={responsiveStyle.codeHedView}>
                  <Text
                    style={responsiveStyle.codeHedText}>
                    Use Code
                  </Text>
                  <View
                    style={responsiveStyle.CodeView}>
                    <Text
                      style={responsiveStyle.CodeText}>
                      {item.offercode}
                    </Text>
                  </View>
                </View>

                {/* end code */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;

// import React, {useEffect} from 'react';
// import style from './style';
// import {FlatList, ScrollView, Text, View} from 'react-native';
// import CustomSearch from '../../components/CustomSearch';
// import {useDimensionContext} from '../../context';
// import {useNavigation} from '@react-navigation/native';
// import CommonHeaderLeft from '../../components/CommonHeaderLeft';
// import colors from '../../components/common/colors';

// const Offers = () => {
//   const dimensions = useDimensionContext();
//   const responsiveStyle = style(
//     dimensions.windowWidth,
//     dimensions.windowHeight,
//     dimensions.isPortrait,
//   );
//   const navigation = useNavigation();

//

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => <CommonHeaderLeft />,
//     });
//   }, []);

//   const OffersArray = [
//     {
//       offer: '41',
//       head: 'Midnight Sale Offer',
//       content: 'On orders above Rs.999',
//       code: 'TY67HB',
//     },
//     {
//       offer: '50',
//       head: 'Mansoon  Offer',
//       content: 'On orders above Rs.1499',
//       code: 'HUB75G',
//     },
//     {
//       offer: '20',
//       head: 'Pink Sale Offer',
//       content: 'On orders above Rs.499',
//       code: 'JIU85D',
//     },
//     {
//       offer: '65',
//       head: ' Onam Sale Offer',
//       content: 'On orders above Rs.2499',
//       code: 'JSW457',
//     },
//     {
//       offer: '75',
//       head: 'Eid Sale Offer',
//       content: 'On orders above Rs.2999',
//       code: 'HSP094',
//     },
//     {
//       offer: '80',
//       head: 'New year  Offer',
//       content: 'On orders above Rs.3999',
//       code: 'APVB38',
//     },
//   ];
//   return (
//     <View style={responsiveStyle.main}>
//       <ScrollView
//         style={responsiveStyle.container}
//         nestedScrollEnabled
//         showsVerticalScrollIndicator={false}>
//         <CustomSearch />

//         <FlatList
//           data={OffersArray}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={responsiveStyle.contentStyle}
//           keyExtractor={(item, index) => String(index)}
//           renderItem={({item, index}) => {
//             return (
//               <View style={responsiveStyle.renderView}>
//                 {/* startcode */}
//                 <View style={responsiveStyle.offCircleView}>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                 </View>

//                 <View
//                   style={{
//                     width: '67%',
//                     height: 100,
//                     backgroundColor: colors.blue,
//                     padding: 20,
//                   }}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Bold',
//                         color: colors.brown,
//                         fontSize: 50,
//                         marginTop: -7,
//                         marginLeft: -4,
//                       }}>
//                       {item.offer}
//                     </Text>
//                     <View>
//                       <Text
//                         style={{
//                           fontFamily: 'Lato-Regular',
//                           color: colors.brown,
//                           fontSize: 25,
//                           marginTop: 10,
//                         }}>
//                         %
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: 'Lato-Bold',
//                           color: colors.brown,
//                           fontSize: 16,
//                         }}>
//                         OFF
//                       </Text>
//                     </View>
//                     <View style={{marginLeft: 5}}>
//                       <Text
//                         style={{
//                           fontFamily: 'Lato-Bold',
//                           color: colors.black,
//                           fontSize: 18,
//                         }}>
//                         {item.head}
//                       </Text>
//                       <Text
//                         style={{
//                           fontFamily: 'Lato-Regular',
//                           color: colors.black,
//                           fontSize: 14,
//                         }}>
//                         {item.content}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     justifyContent: 'space-between',
//                     height: 100,
//                     backgroundColor: colors.blue,
//                   }}>
//                   <View style={responsiveStyle.circleCenter}></View>
//                   <View
//                     style={[
//                       responsiveStyle.circleCenter,
//                       {marginBottom: -25 / 2},
//                     ]}></View>
//                 </View>
//                 <View
//                   style={{
//                     width: '25%',
//                     height: 100,
//                     backgroundColor: colors.blue,
//                     padding: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontFamily: 'Lato-Bold',
//                       color: colors.black,
//                       fontSize: 15,
//                       marginRight: 3,
//                     }}>
//                     Use Code
//                   </Text>
//                   <View
//                     style={{
//                       marginVertical: 10,
//                       padding: 8,
//                       justifyContent: 'center',
//                       borderRadius: 15,
//                       backgroundColor: colors.green,
//                       overflow: 'hidden',
//                       marginRight: 7,
//                       marginLeft: -5,
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: 'Lato-Regular',
//                         color: colors.white,
//                         alignSelf: 'center',
//                       }}>
//                       {item.code}
//                     </Text>
//                   </View>
//                 </View>
//                 {/* end code */}
//                 <View style={{marginLeft: -25 / 2}}>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                   <View style={responsiveStyle.circleRight}></View>
//                 </View>
//               </View>
//             );
//           }}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default Offers;
