import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import CustomButton from '../../components/CustomButton';
import {useDimensionContext} from '../../context';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import NavigationBack from '../../components/common/NavigationBack';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../../components/CustomTextInput';
import CustomDropDown from '../../components/CustomDropDown';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../components/common/colors';
import ActionSheet from 'react-native-actions-sheet';
import uploadImage from '../../components/common/storage';
import Snackbar from 'react-native-snackbar';


const CreateProduct = () => {
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const navigation = useNavigation();
  const route = useRoute();
  const {type, data} = route.params;
  const actionSheetRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [qun, setQun] = useState(0);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setUploadUri(data.image || null);
      setDesc(data.description || '');
      setPrice(data.price || '');
      setQun(data?.quantity ?? 1);
    }
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'create' ? 'Create Product' : 'Edit Product',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  const getCategories = async () => {
    await firestore()
      .collection('Categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setCategories(objArray);
          setCategoryWithObj(objArray);
          // console.warn('objArray-setcategories', setCategories);
        }
      });
  };

  const setCategoryWithObj = objArray => {
    if (data && data.categoryId) {
      const result = objArray.find(ele => ele.id === data.categoryId);
      setCategory(result?.name || null);
    }
  };

  // // camera handle function
  // const handleCamera = async options => {
  // const options = {
  //   mediaType: 'photo',
  // };
  // await launchCamera(options, response => {
  //   actionSheetRef.current?.hide()
  // if(response && response.assets){
  // setUploadUri(response.assets[0]?.uri);
  // }
  // });
  // };

  const handleCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setUploadUri(image?.path || '');
      actionSheetRef.current?.hide();
    } catch (err) {
      console.error('Camera Error:', err);
    }
  };

  // // gallery handle function
  // const handleGallery = async () => {
  // const options = {
  //   mediaType: 'photo',
  // };
  // await launchImageLibrary(options, response => {
  // actionSheetRef.current?.hide()
  // if(response && response.assets){
  // setUploadUri(response.assets[0]?.uri);
  // }
  // });
  // };
  const handleGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });
      setUploadUri(image?.path || '');
      actionSheetRef.current?.hide();
    } catch (err) {
      console.error('Gallery Error:', err);
    }
  };
  const handelUpdateProduct = async () => {
    const selectedCategory = categories.find(cat => cat.name === category);

    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      selectedCategory !== '' &&
      price !== '' &&
      qun !== 0
    ) {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;

      const product = {
        updated: Date.now(),
        name: name,
        description: desc,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        price: price,
        quantity: qun,
        image: responseUri,
      };
      // console.warn('category.id', selectedCategory.id);

      await firestore()
        .collection('Products')
        .doc(data.id)
        .update(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Product Updated Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          navigation.goBack();
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

  const handleCreateProduct = async () => {
    // console.warn('category, name, desc, qun, price' , category, name, desc, qun, price);
    const selectedCategory = categories.find(cat => cat.name === category);

    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      selectedCategory !== '' &&
      price !== '' &&
      qun !== 0
    ) {
      const responseUri = await uploadImage(uploadUri);
      // console.warn('responseUri', responseUri);

      const product = {
        created: Date.now(),
        updated: Date.now(),
        name: name,
        description: desc,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        price: price,
        quantity: qun,
        image: responseUri,
      };
      // console.warn('category.id', selectedCategory.id);

      await firestore()
        .collection('Products')
        .add(product)
        .then(() => {
          setTimeout(() => {
            Snackbar.show({
              text: 'Product Added Successfully',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: colors.green,
              textColor: colors.white,
            });
          }, 1000);
          navigation.goBack();
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={responsiveStyle.container}>
        <ActionSheet ref={actionSheetRef}>
          <View style={responsiveStyle.ActionSheetView}>
            <View
              style={responsiveStyle.ActionSheetHeadView}>
              <Text style={responsiveStyle.ItemHedText}>Select Option</Text>
              <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
                <AntDesign name="closecircleo" size={25} color={colors.black} />
              </TouchableOpacity>
            </View>
            <View
              style={responsiveStyle.commonView}>
              <TouchableOpacity
                onPress={handleCamera}
                style={responsiveStyle.camGlyView}>
                <AntDesign
                  name="camerao"
                  size={32}
                  color={colors.navy_blue_2}
                />
                <Text style={responsiveStyle.camGlyText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleGallery}
                style={responsiveStyle.camGlyView}>
                <Entypo name="image" size={30} color={colors.navy_blue_2} />
                <Text style={responsiveStyle.camGlyText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ActionSheet>

        <CustomTextInput
          value={name}
          width={'100%'}
          type="Default"
          handleText={text => setName(text)}
          placeholder="Name"
          searchIcon={false}
        />

        <CustomTextInput
          value={desc}
          width={'100%'}
          type="Default"
          handleText={text => setDesc(text)}
          placeholder="Description"
          searchIcon={false}
          multiline={true}
        />

        {categories.length > 0 ? (
          <CustomDropDown
            prevData={category}
            data={categories}
            setData={obj => setCategory(obj)}
          />
        ) : null}

        <CustomTextInput
          value={price}
          width={'100%'}
          type="Default"
          handleText={text => setPrice(text)}
          placeholder="Price"
          searchIcon={false}
        />

        <CustomTextInput
          value={qun}
          width={'100%'}
          type="Default"
          handleText={text => setQun(Number(text))}
          placeholder="Quantity"
          searchIcon={false}
        />

        <TouchableOpacity
          onPress={() => actionSheetRef.current?.show()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginVertical: 10,
            borderColor: colors.green,
            borderWidth: 1,
            borderRadius: 8,
          }}>
          <Text style={responsiveStyle.imageText}>Upload Product Image</Text>
          {uploadUri ? (
            <View>
              <TouchableOpacity
                style={responsiveStyle.CloseIcon}
                onPress={() => setUploadUri(null)}>
                <AntDesign name="closecircleo" size={25} color={colors.black} />
              </TouchableOpacity>
              {uploadUri && (
                <Image
                  source={{uri: uploadUri}}
                  style={responsiveStyle.imageView}
                />
              )}
            </View>
          ) : (
            <Entypo name="images" size={40} color={colors.black_lvl_3} />
          )}
        </TouchableOpacity>

        <CustomButton
          width={'100%'}
          height={60}
          type="primary"
          handleButtonPress={
            type === 'create' ? handleCreateProduct : handelUpdateProduct
          }
          buttonText={type === 'create' ? 'Create' : 'Update'}
        />
      </View>
    </ScrollView>
  );
};
export default CreateProduct;
