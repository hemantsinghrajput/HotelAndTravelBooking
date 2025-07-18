import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchParams } from '../types';
import { HotelAPI, apiCall } from '../services/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const insets = useSafeAreaInsets();

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

  const handleSearch = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    if (checkInDate >= checkOutDate) {
      Alert.alert('Error', 'Check-out date must be after check-in date');
      return;
    }

    setIsLoading(true);

    try {
      const searchParams: SearchParams = {
        city: city.trim(),
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
      };

      await apiCall(
        () => HotelAPI.searchHotels(searchParams),
        'Failed to search hotels. Please try again.'
      );

      navigation.navigate('HotelList', searchParams);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.container,{paddingTop:insets.top}]}>
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
            <Text style={styles.logo}>🏨</Text>
          </View>
          <Text style={styles.title}>Find Your Perfect Stay</Text>
          <Text style={styles.subtitle}>Discover amazing hotels in your preferred city</Text>
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
            <Text style={styles.label}>📍 Destination City</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name (e.g. Delhi)"
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
                placeholderTextColor="#95a5a6"
              />
            </View>
          </View>

          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>📅 Check-in Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowCheckInPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateButtonText}>{formatDate(checkInDate)}</Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateInputContainer}>
            <Text style={styles.label}>📅 Check-out Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowCheckOutPicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateButtonText}>{formatDate(checkOutDate)}</Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.searchButton, isLoading && styles.searchButtonDisabled]} 
            onPress={handleSearch}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text style={styles.searchButtonText}>🔍 Search Hotels</Text>
                <Text style={styles.searchButtonSubtext}>Find the best deals</Text>
              </>
            )}
          </TouchableOpacity>
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
          <Text style={styles.featuresTitle}>Why Choose Us?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⭐</Text>
              <Text style={styles.featureText}>Best Price Guarantee</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureText}>Secure Booking</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>24/7 Support</Text>
            </View>
          </View>
        </Animated.View>

        {showCheckInPicker && (
          <DateTimePicker
            value={checkInDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckInPicker(false);
              if (selectedDate) {
                setCheckInDate(selectedDate);
              }
            }}
            minimumDate={new Date()}
          />
        )}

        {showCheckOutPicker && (
          <DateTimePicker
            value={checkOutDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowCheckOutPicker(false);
              if (selectedDate) {
                setCheckOutDate(selectedDate);
              }
            }}
            minimumDate={new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  dateInputContainer: {
    marginBottom: 18,
  },
  dateButton: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  dateIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  searchButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  searchButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  featuresTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SearchScreen; 