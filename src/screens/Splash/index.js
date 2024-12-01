import {View, Text, Image} from 'react-native';
import React from 'react';
import {useDimensionContext} from '../../context';
import style from './style';

const Splash = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/logo.jpg')}
        style={responsiveStyle.logo}
      />
    </View>
  );
};

export default Splash;
