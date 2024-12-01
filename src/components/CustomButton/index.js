// import {Image, Text, TouchableOpacity, Dimensions} from 'react-native';

// const CustomButton = () => {
//   return (
//     <TouchableOpacity>
//       <Text>Haiiiiiii</Text>
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;

import React from 'react';
import {Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import style from './style';
import colors from '../common/colors';

const {width, height} = Dimensions.get('screen');
const CustomButton = props => {
  const {type, handleButtonPress, buttonText, icon, width, height} = props;
  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={[style.button, {width: width, height: height}]}>
      {type !== 'primary' ? <Image source={icon} style={style.icon} /> : null}
      <Text
        style={[
          {
            color: type === 'primary' ? colors.white : colors.black_lvl_3,
            fontFamily: type === 'primary' ? 'Lato-Bold' : 'Lato-Regular',
            fontSize: type === 'primary' ? 22 : 16,
          },
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
