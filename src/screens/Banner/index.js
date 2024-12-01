import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavigationBack from '../../components/common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../components/common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useDimensionContext} from '../../context';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import uploadImage from '../../components/common/storage';

const Banner = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [banners, setBanners] = useState([]);
  const actionSheetRef = useRef(null);
  const [uploadUri, setUploadUri] = useState(null);
  const [type, setType] = useState(null);
  const [bannerId, setBannerId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
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
      getBanners();
    }, []),
  );
  const getBanners = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banners Found',
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
          setBanners(objArray);
        }
      });
  };

  const handleCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setUploadUri(image?.path || '');
      // actionSheetRef.current?.hide();
    } catch (err) {
      console.error('Camera Error:', err);
    }
  };

  const handleGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 740,
        height: 415,
        cropping: true,
      });
      setUploadUri(image?.path || '');
      // actionSheetRef.current?.hide();
    } catch (err) {
      console.error('Gallery Error:', err);
    }
  };

  const handleCreate = async () => {
    if (uploadUri && name !== '') {
      const responseUri = await uploadImage(uploadUri);
      const product = {
        name: name,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .add(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Banner Added Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setName('');
          setUploadUri(null);
          getBanners();
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

  const handleDelete = async bannerData => {
    Alert.alert(
      'CONFIRM  DELETION',
      'Do you want to DELETE this Banner, deleting the Banner will lose the Banner data displayed on user dashboard',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'DELETE Banner',
          onPress: async () => {
            await firestore()
              .collection('Banners')
              .doc(bannerData.id)
              .delete()
              .then(() => {
                setTimeout(() => {
                  Snackbar.show({
                    text: 'Banner Deleted Successfully',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: colors.white,
                    textColor: colors.black,
                  });
                }, 1000);
              });
            getBanners();
          },
        },
      ],
    );
  };

  const handleEdit = bannerData => {
    setBannerId(bannerData.id);
    setName(bannerData.name);
    setUploadUri(bannerData.image);
    setType('Update');
    actionSheetRef.current?.show();
  };

  const handleUpdateSubmit = async () => {
    if (bannerId && uploadUri && name !== '') {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;
      const product = {
        name: name,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .doc(bannerId)
        .update(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Banner Updated Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          actionSheetRef.current?.hide();
          setName('');
          setUploadUri(null);
          getBanners();
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

  return (
    <View style={responsiveStyle.container}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.ActionSheetCont}>
          <View style={responsiveStyle.ItemHedView}>
            <Text style={responsiveStyle.ItemHedText}>
              {type === 'add' ? 'Create Banner' : 'Update Banner'}
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign name="closecircleo" size={25} color={colors.black} />
            </TouchableOpacity>
          </View>

          <CustomTextInput
            value={name}
            width={'100%'}
            type="Default"
            handleText={text => setName(text)}
            placeholder="Head Name"
            searchIcon={false}
          />

          <TouchableOpacity style={responsiveStyle.ImageTouch}>
            <Text style={responsiveStyle.imageText}>Upload Image</Text>
            {uploadUri ? (
              <View>
                <TouchableOpacity
                  style={responsiveStyle.TouchClose}
                  onPress={() => setUploadUri(null)}>
                  <AntDesign
                    name="closecircleo"
                    size={25}
                    color={colors.black}
                  />
                </TouchableOpacity>
                {uploadUri && (
                  <Image
                    source={{uri: uploadUri}}
                    style={responsiveStyle.ImageSize}
                  />
                )}
              </View>
            ) : (
              <Entypo name="images" size={40} color={colors.black_lvl_3} />
            )}
          </TouchableOpacity>

          {/* camera , Gallery */}
          <View style={responsiveStyle.commonView}>
            <TouchableOpacity
              onPress={handleCamera}
              style={responsiveStyle.CamGlyView}>
              <AntDesign name="camerao" size={32} color={colors.navy_blue_2} />
              <Text style={responsiveStyle.CamGlyText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGallery}
              style={responsiveStyle.CamGlyView}>
              <Entypo name="image" size={30} color={colors.navy_blue_2} />
              <Text style={responsiveStyle.CamGlyText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={responsiveStyle.buttonView}>
            <CustomButton
              width={'100%'}
              height={55}
              type="primary"
              handleButtonPress={
                type === 'add' ? handleCreate : handleUpdateSubmit
              }
              buttonText={type === 'add' ? 'Create Banner' : 'Update Banner'}
            />
          </View>
        </View>
      </ActionSheet>

      <FlatList
        data={banners}
        contentContainerStyle={responsiveStyle.FlatListContainer}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={responsiveStyle.ImageBackground}>
              <View style={responsiveStyle.EditDeleteView}>
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
                  style={{marginLeft: 20}}
                />
              </View>

              <View style={responsiveStyle.NameView}>
                <Text style={responsiveStyle.NameText}>{item.name}</Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};
export default Banner;
