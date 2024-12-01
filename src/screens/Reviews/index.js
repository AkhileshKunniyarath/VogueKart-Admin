import { View, Text } from 'react-native'
import React from 'react'
import { useDimensionContext } from '../../context';
import style from './style';

 const Reviews = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  return (
    <View>
      <Text>Reviews</Text>
    </View>
  )
}

export default Reviews;