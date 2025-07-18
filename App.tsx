import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import SearchScreen from './src/screens/SearchScreen';
import HotelListScreen from './src/screens/HotelListScreen';
import HotelDetailScreen from './src/screens/HotelDetailScreen';
import BookingFormScreen from './src/screens/BookingFormScreen';
import BookingsScreen from './src/screens/BookingsScreen';

type RootStackParamList = {
  Search: undefined;
  HotelList: {
    city: string;
    checkInDate: string;
    checkOutDate: string;
  };
  HotelDetail: {
    hotel: any;
    checkInDate: string;
    checkOutDate: string;
  };
  BookingForm: {
    hotel: any;
    checkInDate: string;
    checkOutDate: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: { backgroundColor: '#f8f9fa' },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '🏨 Hotel Booking',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HotelList"
        component={HotelListScreen}
        options={{
          title: '🏨 Available Hotels',
        }}
      />
      <Stack.Screen
        name="HotelDetail"
        component={HotelDetailScreen}
        options={{
          title: '🏨 Hotel Details',
        }}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingFormScreen}
        options={{
          title: '📋 Book Your Stay',
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Bookings') {
            return <Ionicons name="book" size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="Bookings" component={BookingsScreen} options={{ title: 'Bookings' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark"/>
        <MainTabs />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}
