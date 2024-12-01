import {TouchableOpacity, Image} from 'react-native';
import React from 'react';

const NavigationBack = props => {
  const { handleButtonPress} = props;
  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <Image
        source={require('../../assets/images/left-arrow-header.png')}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};
export default NavigationBack;
