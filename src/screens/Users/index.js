import {Text, FlatList, View, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../components/common/colors';
import NavigationBack from '../../components/common/NavigationBack';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import CustomTextInput from '../../components/CustomTextInput';
import EmptyData from '../../components/common/EmptyData';
import {useDimensionContext} from '../../context';
import style from './style';

const Users = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Users',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

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

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );
  const getUsers = async () => {
    await firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No users Found',
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
          setUsers(objArray);
        }
      });
  };

  const handleSearch = async text => {
    setSearchText(text);
    await firestore()
      .collection('users')
      .orderBy('username')
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
          setUsers([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => (
    <TouchableOpacity
      onPress={() => handleBlockUser(data)}
      style={[
        responsiveStyle.blockTouch,
        {backgroundColor: data?.active ? colors.red_4 : colors.green},
      ]}>
      <Text style={responsiveStyle.blockTexts}>
        {data?.active ? 'Block' : 'UnBlock'}
      </Text>
    </TouchableOpacity>
  );

  const handleBlockUser = async data => {
    try {
      await firestore()
        .collection('users')
        .doc(data.id)
        .update({
          active: data?.active ? false : true,
        })
        .then(() => {
          const updated_users = users.map(obj => {
            if (obj?.id === data?.id) {
              obj.active = data?.active ? false : true;
            }
            return obj;
          });
          Snackbar.show({
            text: 'User Blocked Successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.green,
            textColor: colors.white,
          });
          setUsers(updated_users);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <FlatList
      style={responsiveStyle.flatList}
      data={users}
      extraData={users}
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Header />}
      ListEmptyComponent={() => <EmptyData />}
      renderItem={({item, index}) => {
        if (item.username === 'admin') {
          return null;
        } else {
          return (
            <View
              style={responsiveStyle.mainView}>
              <Image
                source={
                  item?.profileimage
                    ? {uri: item?.profileimage}
                    : require('../../assets/images/account.png')
                }
                style={responsiveStyle.profileImage}
              />
              <View
                style={responsiveStyle.ContentView}>
                <Text
                  style={responsiveStyle.userName}>
                  {item?.username}
                </Text>
                <Text
                  style={responsiveStyle.email}>
                  {item?.email}
                </Text>
                <Text
                  style={responsiveStyle.mobNumber}>
                  {item?.mobilenumber}
                </Text>
              </View>
              <BlockUser data={item} indexItem={index} />
            </View>
          );
        }
      }}
    />
  );
};

export default Users;
