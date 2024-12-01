import {View, Text} from 'react-native';
import React from 'react';
import colors from './colors';

const EmptyData = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: 8,
        backgroundColor: colors.light_gray,
        padding: 10,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Lato-Black',
          fontSize: 22,
          color: colors.black,
        }}>
        No Results Found
      </Text>
    </View>
  );
};

export default EmptyData;
