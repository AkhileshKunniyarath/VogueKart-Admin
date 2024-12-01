import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../context';
import style from './style';

const Home = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [orders, setOrders] = useState(0);
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/images/drawer.png')}
            style={responsiveStyle.headerLeftIcon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={responsiveStyle.headerRightLogo}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getAllCount();
  }, []);

  const getAllCount = async () => {
    const productRef = await firestore().collection('Products').get();
    const userRef = await firestore().collection('users').get();
    const ordersRef = await firestore().collection('Orders').get();

    setProducts(productRef.size);
    setUsers(ordersRef.size);
    setOrders(userRef.size);
  };

  return (
    <View style={responsiveStyle.Container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={responsiveStyle.OrderTouch}>
        <Image
          source={require('../../assets/images/orders.png')}
          style={responsiveStyle.Icon}
        />
        <View style={responsiveStyle.TextView}>
          <Text style={responsiveStyle.CountText}>{orders}</Text>
          <Text style={responsiveStyle.Text}>Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products')}
        style={responsiveStyle.ProductTouch}>
        <Image
          source={require('../../assets/images/products.png')}
          style={responsiveStyle.Icon}
        />
        <View style={responsiveStyle.TextView}>
          <Text style={responsiveStyle.CountText}>{products}</Text>
          <Text style={responsiveStyle.Text}>product</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={responsiveStyle.UserTouch}>
        <Image
          source={require('../../assets/images/account.png')}
          style={responsiveStyle.Icon}
        />
        <View style={responsiveStyle.TextView}>
          <Text style={responsiveStyle.CountText}>{users}</Text>
          <Text style={responsiveStyle.Text}>Users</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
