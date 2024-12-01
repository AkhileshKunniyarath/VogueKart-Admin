import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import colors from '../common/colors';
import {useDimensionContext} from '../../context';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropDown = props => {
  const {data, setData, prevData} = props;
  const dimension = useDimensionContext();
  const responsiveStyle = style(dimension.windowWidth, dimension.windowHeight);
  const [activeSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState(
    prevData ? prevData : data[0].name
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(prevData || data[0].name);
      // console.log('prevdata#####', prevData);
    }
  }, [data, prevData]);

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  const SECTIONS = [
    {id: 0, sectionData: (prevData ? prevData.name : data[0].name)},
  ];
  
  // console.warn('selscted', selected);
  

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <Text style={responsiveStyle.descriptionHead}>{selected}</Text>
        <AntDesign name="down" size={20} color={colors.black_lvl_3} />
      </View>
    );
  };
  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        style={{marginTop: 20}}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(item.name);
                  setSelected(item.name);
                  setActiveSections([]);
                }}
                style={{
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderTopColor: colors.black_lvl_3,
                  paddingVertical: 10,
                }}>
                <Text style={responsiveStyle.descriptionDetail}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  };

  return (
    <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor={'transparent'}
        sectionContainerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 15,
          backgroundColor: colors.alice_blue,
        }}
      />
    </View>
  );
};
export default CustomDropDown;
