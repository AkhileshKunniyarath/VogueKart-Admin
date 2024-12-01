// import {
//   Image,
//   Platform,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import colors from '../common/colors';

// const CustomTextInput = () => {
//   return (
//   <View>
//     <TextInput
//       style={{}}
//         placeholder='Enter Here'
//         placeholderTextColor={colors.gray}
//         selectionColor={colors.navy_blue_2}
//       />
//     <Text></Text>
//   </View>
//   );
// };

// export default CustomTextInput;

import React, {useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import style from './style';
import colors from '../common/colors';
import {useDimensionContext} from '../../context';

const CustomTextInput = props => {
  const {
    type,
    handleText,
    placeholder,
    value,
    check = false,
    multiline = false,
    width,
    searchIcon = true,
  } = props;
  const dimensions = useDimensionContext();
  const [show, setShow] = useState(false);
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';

  const secureTextEntry = type === 'password' ? (show ? false : true) : false;
  const icon =
    type === 'email'
      ? require('../../assets/images/email.png')
      : type === 'password'
      ? show
        ? require('../../assets/images/view.png')
        : require('../../assets/images/hide.png')
      : false;

  const handlePassword = () => {
    setShow(!show);
  };
  return (
    <View style={[style.container, {width: width}]}>
      <TextInput
        style={[
          style.textInput,
          {
            height:
              Platform.OS === 'android'
                ? multiline
                  ? dimensions.windowHeight * 0.12
                  : dimensions.windowHeight * 0.049
                : multiline
                ? dimensions.windowHeight * 0.01
                : dimensions.windowHeight * 0.02,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.navy_blue_2}
        onChangeText={handleText}
        value={value}
        multiline={multiline}
      />
      {searchIcon ? (
        <Image
          source={require('../../assets/images/search_header.png')}
          style={style.searchIcon}
        />
      ) : null}
      {check ? <Text style={style.checkText}>Check</Text> : null}
      {!icon ? null : (
        <TouchableOpacity
          onPress={handlePassword}
          disabled={type !== 'password' ? true : false}>
          <Image style={style.icon} source={icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
