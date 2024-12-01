import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, { useLayoutEffect } from 'react';
import NavigationBack from '../../components/common/NavigationBack';
import { useNavigation } from '@react-navigation/native';
import { useDimensionContext } from '../../context';
import style from './style';


const Profile = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'OrderDetail',
      headerLeft: () => (
        <NavigationBack handleButtonPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;