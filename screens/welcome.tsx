import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {images, fontsize} from '../constants';
import {UIButton} from '../components/index';
function Welcome() {
  //State => Khi state thay đổi thì UI sẽ được load lại
  const [accountTypes, setaccountTypes] = useState([
    {
      name: 'Influencer',
      isSelected: true,
    },
    {
      name: 'Business',
      isSelected: false,
    },
    {
      name: 'Individual',
      isSelected: false,
    },
  ]);
  // //giống getter and setter
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View style={styles.containerTieuDe}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={images.icon_fire}
              style={{
                width: 35,
                height: 35,
                marginStart: 10,
                marginEnd: 5,
              }}
            />

            <Text style={styles.textContent}>STUDY REACT NATIVE</Text>

            <View style={{flex: 1}} />
            <Image
              source={images.icon_question}
              style={{
                width: 40,
                height: 40,
                marginRight: 10,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{marginBottom: 7, color: 'white', fontSize: fontsize.h5}}>
            Welcome to React Native
          </Text>
          <Text
            style={{
              marginBottom: 7,
              color: 'white',
              fontWeight: 'bold',
              fontSize: fontsize.h3,
            }}>
            Dai hoc Kinh te Ky thuat Cong nghiep
          </Text>
          <Text
            style={{marginBottom: 7, color: 'white', fontSize: fontsize.h5}}>
            Please select your acount type
          </Text>
        </View>

        <View
          style={{
            flex: 40,
          }}>
          {accountTypes.map(accountType => (
            <UIButton
              onPress={() => {
                setaccountTypes(
                  accountTypes.map(each => {
                    return {...each, isSelected: each.name == accountType.name};
                  }),
                );
              }}
              title={accountType.name}
              isSelected={accountType.isSelected}
            />
          ))}
        </View>

        <View
          style={{
            flex: 20,
          }}>
          <UIButton title="LOGIN" />
          <Text
            style={{
              marginBottom: 7,
              color: 'gray',
              fontWeight: 'bold',
              fontSize: fontsize.h3,
              alignSelf: 'center',
            }}>
            Bạn có muốn đăng kí tài khoản?
          </Text>

          <TouchableOpacity
            onPress={() => {
              alert('Đăng kí tài khoản?');
            }}>
            <Text
              style={{
                marginBottom: 10,
                color: 'white',
                fontWeight: 'bold',
                fontSize: fontsize.h3,
                alignSelf: 'center',
                textDecorationLine: 'underline',
              }}>
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 100,
  },
  textContent: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
  },
  containerTieuDe: {
    flex: 20,
  },
});
export default Welcome;
