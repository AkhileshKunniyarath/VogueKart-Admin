import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

const uploadImage = async image => {
  return new Promise(async resolve => {
    try {
      
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const pathForFirebaseStorage = await getPathForFirebaseStorage(image);
      await storage().ref(filename).putFile(pathForFirebaseStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => resolve(url));
    } catch (error) {}
  });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};

export default uploadImage;
