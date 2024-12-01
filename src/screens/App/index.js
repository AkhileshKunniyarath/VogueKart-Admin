import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {DimensionContextProvider} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomDrawer from '../../components/CustomDrawer';
import CustomTabBar from '../../components/CustomTabBar';
import {Provider, useSelector} from 'react-redux';
import {store} from '../../storage/store';

import Home from '../Home';
import Splash from '../Splash';
import Login from '../Login';
import Profile from '../Profile';
import Orders from '../Orders';
import Products from '../Products';
import Users from '../Users';
import OrderDetails from '../OrderDetails';
import ProductDetails from '../ProductDetails';
import colors from '../../components/common/colors';
import CreateProduct from '../CreateProduct';
import Banner from '../Banner';
import Offers from '../Offers';
import Reviews from '../Reviews';


const Drawer = createDrawerNavigator();
const AppDrawer = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Footer"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
      }}>
      <Drawer.Screen
        name="Footer"
        component={AppFooter}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="CreateProduct" component={CreateProduct} />
      <Drawer.Screen name="Banner" component={Banner} />
      <Drawer.Screen name="Offers" component={Offers} />
      <Drawer.Screen name="Reviews" component={Reviews} />
    </Drawer.Navigator>
  );
};

const Footer = createBottomTabNavigator();
const AppFooter = props => {
  return (
    <Footer.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white_Bg,
          height: 75,
        },
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
          fontSize: 26,
        },
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: true}}
      />
      <Footer.Screen name="Products" component={Products} />
      <Footer.Screen name="Orders" component={Orders} />
      <Footer.Screen name="Profile" component={Profile} />
    </Footer.Navigator>
  );
};

const AppStack = createNativeStackNavigator();
const AppNavigator = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoggedIn]);

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {loading ? (
            <AppStack.Screen name="Splash" component={Splash} />
          ) : (
            <>
              {isLoggedIn ? (
                <AppStack.Screen name="Drawer" component={AppDrawer} />
              ) : (
                <AppStack.Screen name="Login" component={Login} />
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const App = () => {
  // store available in all screens
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;

