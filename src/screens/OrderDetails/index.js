import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import colors from '../../components/common/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationBack from '../../components/common/NavigationBack';
import {useDimensionContext} from '../../context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import style from './style';
import CustomButton from '../../components/CustomButton';
import ActionSheet from 'react-native-actions-sheet';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../components/CustomDropDown';
import firestore from '@react-native-firebase/firestore';

const OrderDetails = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const navigation = useNavigation();
  const route = useRoute();
  const order = route.params.order;
  const actionSheetRef = useRef(null);
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || '');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Orders')
      .doc(order.id)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const updatedOrder = snapshot.data();
          setOrderStatus(
            typeof updatedOrder.orderStatus === 'string'
              ? updatedOrder.orderStatus
              : updatedOrder.orderStatus?.name || 'Unknown'
          );
        }
      });

    return () => unsubscribe();
  }, [order.id]);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'OrderDetail',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order?.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Order Status is Updated',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.green,
                textColor: colors.white,
              });
            }, 1000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {name: 'Ordered'},
    {name: 'Order In Progress'},
    {name: 'Order packed'},
    {name: 'Order Shipped'},
    {name: 'Out for Delivery'},
    {name: 'Delivered'},
    {name: 'Returned'},
    {name: 'Failed'},
  ];
  return (
    <View>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionView}>
          <View style={responsiveStyle.HeadView}>
            <Text style={responsiveStyle.ItemHedText}>Update Order</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign name="closecircleo" size={25} color={colors.black} />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 20}}>
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
            />

            <CustomButton
              width={'100%'}
              height={55}
              type="primary"
              handleButtonPress={handleUpdateOrder}
              buttonText={'Update'}
            />
          </View>
        </View>
      </ActionSheet>
      
      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}
        style={responsiveStyle.scrollView}>
        {/* section 1  Order Status*/}
        <View style={responsiveStyle.sect_1mainView}>
          <Feather name="box" size={50} color={colors.white} />
          <View style={responsiveStyle.sect_1View}>
            <Text style={responsiveStyle.orderIdText}>
              Order Id: #{order?.orderId ?? 'UF5HK68'}
            </Text>
            <Text style={responsiveStyle.orderedText}>
            {orderStatus}
            </Text>
          </View>
        </View>

        {/* section 2  Item details*/}
        <View style={responsiveStyle.sect_2containView}>
          <Text style={responsiveStyle.ItemHedText}>Items:</Text>
          {order?.cartItems &&
            order.cartItems.map((item, index) => {
              return (
                <View key={index} style={responsiveStyle.sect_2mainView}>
                  <View style={responsiveStyle.sect_2quantityView}>
                    <Text style={responsiveStyle.quantityText}>
                      {item?.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={colors.black_lvl_2}
                  />

                  <View style={responsiveStyle.sect_2Name_DesView}>
                    <Text style={responsiveStyle.eleNameText}>
                      {item?.name}
                    </Text>
                    <Text style={responsiveStyle.eleDesText}>
                      {item?.description}
                    </Text>
                  </View>
                  <View style={responsiveStyle.sect_2priceView}>
                    <Text style={responsiveStyle.priceText}>
                      {' '}
                      ₹{item?.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        {/* section 3 Payment Details */}

        <View style={responsiveStyle.sect_3containView}>
          <Text style={responsiveStyle.payDetailText}>Payment Details</Text>
          <View style={responsiveStyle.sect_3mainView}>
            {/* left side  */}
            <View style={responsiveStyle.sect_3firstView}>
              <Text style={responsiveStyle.bagTotal}>Bag Total</Text>
              <Text style={responsiveStyle.couponDiscount}>
                Coupon Discount
              </Text>
              <Text style={responsiveStyle.Delivery}>Delivery</Text>
            </View>

            {/* right side */}
            <View style={responsiveStyle.sect_3secondView}>
              <Text style={responsiveStyle.totalPrice}>
                ₹{parseFloat(order.totalAmount) - 50}
              </Text>
              <Text style={responsiveStyle.applyCoupon}>Apply Coupon</Text>
              <Text style={responsiveStyle.deliveryCharge}>₹50.00</Text>
            </View>
          </View>

          {/* total  */}
          <View style={responsiveStyle.sect_3TotalAmountView}>
            <Text style={responsiveStyle.TotalAmount}>Total Amount</Text>
            <Text style={responsiveStyle.TotalRs}>₹{order?.totalAmount}</Text>
          </View>
        </View>

        {/* section 4  */}

        {/* address  */}
        <View style={responsiveStyle.sect_4addView}>
          <Text style={responsiveStyle.addressHead}>Address:</Text>
          <Text style={responsiveStyle.address}>{order?.userName} </Text>
          <Text style={responsiveStyle.address} numberOfLines={3}>
            {order?.address}
          </Text>
          <Text style={responsiveStyle.address}>{order?.userPhone}</Text>
        </View>

        {/* Payment Method  */}
        <View style={responsiveStyle.sect_4payMethodContainView}>
          <Text style={responsiveStyle.payMethod}>Payment Method:</Text>
          <View style={responsiveStyle.sect_4iconView}>
            <FontAwesome name="cc-visa" size={30} color={colors.navy_blue} />
            <View style={responsiveStyle.sect_4payMethodView}>
              <Text style={responsiveStyle.card}> **** **** **** 7867 </Text>
              <Text style={responsiveStyle.online}>
                {order?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={(StyleSheet.absoluteFillObject, {bottom: 50})}>
        <CustomButton
          width={'90%'}
          height={'22%'}
          type="primary"
          handleButtonPress={() => actionSheetRef.current?.show()}
          buttonText={'Update Status'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
