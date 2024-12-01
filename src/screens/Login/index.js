import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import style from './style';
import {useDimensionContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import colors from '../../components/common/colors';
import { useDispatch } from 'react-redux';
import { login } from '../../storage/actions';

const Login = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === 'admin@gmail.com' && password.trim() === '123') {
      await firestore()
        .collection('users')
        .where('email', '==', email.trim())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const respData = documentSnapshot.data();
              if (password.trim() === respData.password) {
                dispatch(login({
                  userId: documentSnapshot.id,
                }))
                Snackbar.show({
                  text: 'Login successful',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.green,
                  textColor: colors.white,
                });
              } else {
                Snackbar.show({
                  text: 'The password you entered is wrong.',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.red,
                  textColor: colors.white,
                });
              }
            });
          }
        })
        .catch(err => console.warn(err));
    } else {
      Snackbar.show({
        text: ' The entered credentials are wrong. please check again',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.jpg')}
        style={responsiveStyle.TopBg}
      />
      <ScrollView style={style.ScrollView} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={responsiveStyle.logo}
        />
        <CustomTextInput
        searchIcon= {false}
          width={'90%'}
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
        />
        <CustomTextInput
        searchIcon= {false}
          width={'90%'}
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />
        <CustomButton
          width={'90%'}
          height={'16%'}
          type="primary"
          handleButtonPress={handleLogin}
          buttonText={'Login'}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Image, ScrollView, Text, View } from "react-native";
// import style from './style';
// import CustomTextInput from "../../components/CustomTextInput/index";
// import CustomButton from "../../components/CustomButton";
// import { useNavigation } from "@react-navigation/native";
// import colors from "../../components/common/colors";
// import Snackbar from "react-native-snackbar";
// import firestore from '@react-native-firebase/firestore';
// import Home from "../Home";
// import { useDimensionContext } from "../../context";
// import { validateEmail } from "../../components/common/validations";
// import { useDispatch } from "react-redux";
// import { login } from "../../storage/action";

// const Login = () => {
//     const dimensions =useDimensionContext();
//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const responsiveStyle = style (dimensions.windowWidth, dimensions.windowHeight);

//     const handleLogin = async() => {
//         if (email.trim() !== '' && password.trim() !== '') {
//             if (validateEmail(email.trim())){
//                 await firestore()
//                 .collection('users')
//                 .where('email', '==', email.trim().toLocaleLowerCase())
//                 .get()
//                 .then(async snapshot => {
//                     if(snapshot.empty){
//                         Snackbar.show({
//                             text: 'This user is not registered with us, try creating a new account.',
//                             duration: Snackbar.LENGTH_LONG,
//                             backgroundColor: colors.red,
//                             textColor: colors.white,
//                           });
//                     } else {
//                         snapshot.forEach(documentSnapshot => {
//                             const respData = documentSnapshot.data();
//                             if(password.trim() === respData.password) {
//                                 Snackbar.show({
//                                     text: 'Login successful',
//                                     duration: Snackbar.LENGTH_LONG,
//                                     backgroundColor: colors.green,
//                                     textColor: colors.white,
//                                   });
//                                   dispatch(
//                                     login({
//                                         userId: documentSnapshot.id,
//                                         firstName:respData.firstName,
//                                         lastName: respData.lastName,
//                                         email: respData.email,
//                                         mobileNumber: respData.mobilenumber,
//                                         profileImage: respData.profileimage,
//                                     }),
//                             );
//                                 //   navigation.navigate('MyDrawer');
//                             } else {
//                                 Snackbar.show({
//                                     text: 'The password you entered is wrong.',
//                                     duration: Snackbar.LENGTH_LONG,
//                                     backgroundColor: colors.red,
//                                     textColor: colors.white,
//                                   });
//                             }
//                         });
//                     }
//                 }).catch(err => console.warn(err));
//             } else {
//                 Snackbar.show({
//                     text: 'Enter a valid email.',
//                     duration: Snackbar.LENGTH_LONG,
//                     backgroundColor: colors.red,
//                     textColor: colors.white,
//                   });
//             }
//         } else {
//             Snackbar.show({
//                 text: 'Fill up the fields to continue',
//                 duration: Snackbar.LENGTH_LONG,
//                 backgroundColor: colors.red,
//                 textColor: colors.white,
//               });
//         }
//     };

//     const handleGoToSignUp = () => {
//         navigation.navigate('SignUp');
//     };

//     const handleButtonPress = () => {

//     };

//     const handleGoToLoginPhone = () => {
//         navigation.navigate('LoginPhone');
//     };

//     return(
//         <View style={responsiveStyle.container}>
//             <Image source={require('../../assets/images/topBg.jpg')}
//             style= {responsiveStyle.TopBg}
//             />
//             <ScrollView style={responsiveStyle.ScrollView} showsVerticalScrollIndicator={false} >
//             <Image source={require('../../assets/images/logo.jpg')}
//             style= {responsiveStyle.logo}
//             />
//             <Text style={responsiveStyle.loginText}>Login Account</Text>

//             <CustomTextInput type= "email"
//             handleText={text=> setEmail(text)}
//             placeholder="Email Address"
//             />

//             <CustomTextInput type= "password"
//             handleText={text=> setPassword(text)}
//             placeholder= "Password"
//             />

//             <CustomButton
//             type="primary"
//             handleButtonPress={handleLogin}
//             buttonText={'Sign In'}
//             />

//             <Text onPress={handleGoToSignUp} style={responsiveStyle.getStarted}>Get started here if you're new!</Text>

//             <View style={responsiveStyle.OrLogin}>
//                 <View style={responsiveStyle.OrLoginLine} />
//                     <Text style={responsiveStyle.OrLoginText}>Or Login With</Text>
//                 <View style={responsiveStyle.OrLoginLine} />
//             </View>

//             <CustomButton
//             type="secondary"
//             handleButtonPress={handleGoToLoginPhone}
//             buttonText={'Sign In with phone'}
//             icon= {require('../../assets/images/smartphone.png')}
//             />

//             <CustomButton
//             type="secondary"
//             handleButtonPress={handleButtonPress}
//             buttonText={'Sign In with Google'}
//             icon={require('../../assets/images/google.png')}
//             />

//             </ScrollView>

//             <View style={responsiveStyle.footer} >
//                 <Text style={responsiveStyle.footerText}>Login as a guest</Text>
//             </View>

//         </View>
//     );
// };

// export default Login;
