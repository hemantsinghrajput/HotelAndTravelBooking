import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Hotel, Booking } from '../types';
import { HotelAPI, apiCall } from '../services/api';
import Toast from 'react-native-toast-message';

interface BookingFormScreenProps {
  navigation: any;
  route: {
    params: {
      hotel: Hotel;
      checkInDate: string;
      checkOutDate: string;
    };
  };
}

const BookingFormScreen: React.FC<BookingFormScreenProps> = ({ navigation, route }) => {
  const { hotel, checkInDate, checkOutDate } = route.params;
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('1');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [guestModalVisible, setGuestModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateTotalPrice = () => {
    if (!selectedRoomType) return 0;
    const roomType = hotel.roomTypes.find(rt => rt.id === selectedRoomType);
    if (!roomType) return 0;
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    return roomType.price * nights;
  };

  const handleConfirmBooking = async () => {
    if (!guestName.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter your name' });
      return;
    }

    if (!email.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter your email' });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid email address' });
      return;
    }

    if (!selectedRoomType) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a room type' });
      return;
    }

    setIsLoading(true);

    try {
      const roomType = hotel.roomTypes.find(rt => rt.id === selectedRoomType);
      if (!roomType) throw new Error('Room type not found');

      const bookingData = {
        hotelId: hotel.id,
        hotelName: hotel.name,
        guestName: guestName.trim(),
        email: email.trim(),
        numberOfGuests: parseInt(numberOfGuests),
        roomType: roomType.name,
        checkInDate,
        checkOutDate,
        totalPrice: calculateTotalPrice(),
      };

      const booking = await apiCall(
        () => HotelAPI.createBooking(bookingData),
        'Failed to create booking. Please try again.'
      );

      const existingBookings = await AsyncStorage.getItem('bookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      bookings.push(booking);
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));

      Toast.show({
        type: 'success',
        text1: '🎉 Booking Confirmed!',
        text2: `Your booking for ${hotel.name} is confirmed!`,
        autoHide: true,
        visibilityTime: 3500,
      });
      setTimeout(() => navigation.navigate('Search'), 1200);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to confirm booking. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>📋</Text>
            </View>
            <Text style={styles.title}>Complete Your Booking</Text>
            <Text style={styles.subtitle}>Fill in your details to secure your stay</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.hotelInfo,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={styles.hotelName}>🏨 {hotel.name}</Text>
            <Text style={styles.hotelCity}>📍 {hotel.city}</Text>
            <Text style={styles.dateInfo}>
              📅 {checkInDate} - {checkOutDate}
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.form,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>👤 Full Name *</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={guestName}
                  onChangeText={setGuestName}
                  autoCapitalize="words"
                  placeholderTextColor="#95a5a6"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>📧 Email Address *</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#95a5a6"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>👥 Number of Guests</Text>
              <TouchableOpacity
                style={styles.selector}
                onPress={() => setGuestModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.selectorText}>{numberOfGuests} guest{numberOfGuests !== '1' ? 's' : ''}</Text>
              </TouchableOpacity>
              <Modal
                visible={guestModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setGuestModalVisible(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setGuestModalVisible(false)} activeOpacity={1}>
                  <View style={styles.modalContent}>
                    {[1,2,3,4,5,6].map(num => (
                      <TouchableOpacity
                        key={num}
                        style={styles.modalOption}
                        onPress={() => {
                          setNumberOfGuests(num.toString());
                          setGuestModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalOptionText}>{num} guest{num !== 1 ? 's' : ''}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>🛏️ Room Type *</Text>
              <TouchableOpacity
                style={styles.selector}
                onPress={() => setRoomModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.selectorText}>
                  {selectedRoomType
                    ? `${hotel.roomTypes.find(rt => rt.id === selectedRoomType)?.name} - Rs. ${hotel.roomTypes.find(rt => rt.id === selectedRoomType)?.price}/night`
                    : 'Select a room type'}
                </Text>
              </TouchableOpacity>
              <Modal
                visible={roomModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setRoomModalVisible(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setRoomModalVisible(false)} activeOpacity={1}>
                  <View style={styles.modalContent}>
                    {hotel.roomTypes
                      .filter(roomType => roomType.capacity >= parseInt(numberOfGuests))
                      .map(roomType => (
                        <TouchableOpacity
                          key={roomType.id}
                          style={styles.modalOption}
                          onPress={() => {
                            setSelectedRoomType(roomType.id);
                            setRoomModalVisible(false);
                          }}
                        >
                          <Text style={styles.modalOptionText}>{roomType.name} - Rs. {roomType.price}/night</Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            {selectedRoomType && (
              <Animated.View 
                style={[
                  styles.priceSummary,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: fadeAnim }],
                  }
                ]}
              >
                <Text style={styles.priceLabel}>💰 Total Price</Text>
                <Text style={styles.totalPrice}>Rs. {calculateTotalPrice()}</Text>
                <Text style={styles.priceBreakdown}>
                  {(() => {
                    const roomType = hotel.roomTypes.find(rt => rt.id === selectedRoomType);
                    const checkIn = new Date(checkInDate);
                    const checkOut = new Date(checkOutDate);
                    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
                    return `${nights} night${nights !== 1 ? 's' : ''} × Rs. ${roomType?.price}/night`;
                  })()}
                </Text>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View 
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <Text style={styles.featuresTitle}>✅ What's Included</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🔒</Text>
                <Text style={styles.featureText}>Secure Booking</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>💰</Text>
                <Text style={styles.featureText}>Best Price Guarantee</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📧</Text>
                <Text style={styles.featureText}>Instant Confirmation</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🆓</Text>
                <Text style={styles.featureText}>Free Cancellation</Text>
              </View>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]}
            onPress={handleConfirmBooking}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text style={styles.confirmButtonText}>✅ Confirm Booking</Text>
                <Text style={styles.confirmButtonSubtext}>Secure your reservation now</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logo: {
    fontSize: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  hotelInfo: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  hotelCity: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  dateInfo: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    minWidth: 120,
    width: '100%',
    marginTop: 2,
    height: 56,
    justifyContent: 'center',
  },
  picker: {
    height: 56,
    fontSize: 16,
    width: '100%',
    lineHeight: 22,
    paddingVertical: 0,
  },
  priceSummary: {
    backgroundColor: '#e8f4fd',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 4,
  },
  priceBreakdown: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#27ae60',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  confirmButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  selector: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 2,
  },
  selectorText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 220,
    elevation: 8,
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
  }
});

export { Toast };
export default BookingFormScreen; 