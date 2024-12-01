import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EmptyData from '../../components/common/EmptyData';
import CustomTextInput from '../../components/CustomTextInput';
import NavigationBack from '../../components/common/NavigationBack';
import {useDimensionContext} from '../../context';
import style from './style';

const Products = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('screen');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign name="plussquareo" size={28} color={colors.black} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, []),
  );
  const getProducts = async () => {
    await firestore()
      .collection('Products')
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
          setProducts(objArray);
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
      .collection('Products')
      .orderBy('name')
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
          setProducts([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setProducts(objArray);
        }
      });
  };

  const handleDelete = async productData => {
    Alert.alert(
      'CONFIRM  DELETION',
      'Do you want to DELETE this Product, deleting the product will lose the product data',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'DELETE Product',
          onPress: async () => {
            await firestore()
              .collection('Products')
              .doc(productData.id)
              .delete()
              .then(() => {
                setTimeout(() => {
                  Snackbar.show({
                    text: 'Product Deleted Successfully',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.green,
                    textColor: colors.white,
                  });
                }, 1000);
              });
            getProducts();
          },
        },
      ],
    );
  };

  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };

  return (
    <FlatList
      style={responsiveStyle.FlatList}
      data={products}
      numColumns={2}
      extraData={products}
      contentContainerStyle={{paddingBottom: 20}}
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
                navigation.navigate('ProductDetails', {product: item})
              }
              style={responsiveStyle.TouchableOpacity}>
              <View style={responsiveStyle.editDeleteView}>
                <Feather
                  onPress={() => handleEdit(item)}
                  name="edit"
                  size={24}
                  color={colors.black}
                />
                <AntDesign
                  onPress={() => handleDelete(item)}
                  name="delete"
                  size={25}
                  color={colors.black}
                  style={{marginLeft: 15}}
                />
              </View>

              <View style={responsiveStyle.imageView}>
                <Image
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../assets/images/account.png')
                  }
                  style={responsiveStyle.image}
                />
              </View>

              <View
                style={responsiveStyle.detailsView}>
                <Text
                  numberOfLines={1}
                  style={responsiveStyle.name}>
                  {item?.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={responsiveStyle.description}>
                  {item?.description}
                </Text>
                <Text
                  style={responsiveStyle.priceText}>
                  ₹{item?.price}
                </Text>
              </View>
              {/* <BlockUser data={item} indexItem={index} /> */}
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

export default Products;
