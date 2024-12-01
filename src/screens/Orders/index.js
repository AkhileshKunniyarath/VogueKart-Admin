import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import EmptyData from '../../components/common/EmptyData';
import CustomTextInput from '../../components/CustomTextInput';
import {useDimensionContext} from '../../context';
import style from './style';
import moment from 'moment';
import NavigationBack from '../../components/common/NavigationBack';

const Orders = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);

  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'OrderDetail',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );
  const getOrders = async () => {
    await firestore()
      .collection('Orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No products Found',
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
          setOrders(objArray);
        }
      });
  };

  const Header = () => {
    return (
      <CustomTextInput
        handleText={text => handleSearch(text)}
        placeholder={'Search Here'}
        width={'95%'}
        value={searchText}
      />
    );
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('Orders')
      .orderBy('orderId')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No results Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
          setOrders([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const dateFormat = time => {
    return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        style={responsiveStyle.flatView}
        data={orders}
        extraData={orders}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header />}
        ListEmptyComponent={() => <EmptyData />}
        renderItem={({item, index}) => {
          if (item.username === 'admin') {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OrderDetails', {order: item})
                }
                style={responsiveStyle.TouchStyle}>
                <View style={responsiveStyle.innerView}>
                  <View>
                    <Text style={responsiveStyle.orderId}>
                      ID: #{item?.orderId}
                    </Text>
                    <Text style={responsiveStyle.OrderedOn}>
                      Ordered On: {dateFormat(item?.created)}
                    </Text>
                    <Text style={responsiveStyle.address}>{item.address}</Text>
                    {/* <Text style={responsiveStyle.address}>{item.address2}</Text> */}
                    <Text style={responsiveStyle.paidText}>
                      Paid:
                      <Text style={responsiveStyle.totalAmount}>
                        ₹{item?.totalAmount}
                      </Text>
                      Items:
                      <Text style={responsiveStyle.itemCount}>
                        {item?.cartItems.length}
                      </Text>
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/images/map-image.jpg')}
                    style={responsiveStyle.mapImage}
                  />
                </View>
                <View style={responsiveStyle.bottomView}>
                  <Text style={responsiveStyle.bottomText}>
                    {typeof item?.orderStatus === 'string'
                      ? item.orderStatus
                      : item?.orderStatus?.name || 'Status unavailable'}
                  </Text>
                  <Text style={responsiveStyle.bottomText}>
                    Rate & Review Products
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default Orders;
