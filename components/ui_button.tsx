import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

function UIButton(props: any) {
  const {onPress, title, isSelected} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 1,
        height: 45,
        borderRadius: 5,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? 'gray' : null,
      }}>
      <Text
        style={{
          color: isSelected == true ? '#fff' : 'gray',
          fontSize: 23,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default UIButton;
