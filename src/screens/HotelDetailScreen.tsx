import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import { Hotel } from '../types';

const { width } = Dimensions.get('window');

interface HotelDetailScreenProps {
  navigation: any;
  route: {
    params: {
      hotel: Hotel;
      checkInDate: string;
      checkOutDate: string;
    };
  };
}

const HotelDetailScreen: React.FC<HotelDetailScreenProps> = ({ navigation, route }) => {
  const { hotel, checkInDate, checkOutDate } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));

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

  const renderImageItem = ({ item, index }: { item: string; index: number }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  const renderRoomType = ({ item }: { item: any }) => (
    <Animated.View 
      style={[
        styles.roomTypeCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.roomTypeHeader}>
        <Text style={styles.roomTypeName}>{item.name}</Text>
        <Text style={styles.roomTypePrice}>Rs. {item.price}</Text>
      </View>
      <Text style={styles.roomTypeCapacity}>👥 Up to {item.capacity} guests</Text>
      <View style={styles.roomTypeFeatures}>
        <Text style={styles.roomFeature}>🛏️ King Bed</Text>
        <Text style={styles.roomFeature}>🛁 Private Bath</Text>
        <Text style={styles.roomFeature}>📺 Smart TV</Text>
      </View>
    </Animated.View>
  );

  const handleBookNow = () => {
    navigation.navigate('BookingForm', {
      hotel,
      checkInDate,
      checkOutDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.imageContainer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <FlatList
            data={hotel.images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          />
          <View style={styles.pagination}>
            {hotel.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentImageIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
          <View style={styles.imageOverlay}>
            <Text style={styles.imageCount}>{currentImageIndex + 1} / {hotel.images.length}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.hotelHeader}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, { color: hotel.rating >= 4.5 ? '#27ae60' : '#f39c12' }]}>★ {hotel.rating}</Text>
              <Text style={styles.ratingText}>Excellent</Text>
            </View>
          </View>
          
          <Text style={styles.hotelCity}>📍 {hotel.city}</Text>

          <Text style={styles.description}>{hotel.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.price}>Rs. {hotel.pricePerNight}</Text>
            <Text style={styles.priceUnit}>per night</Text>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>🏨 Hotel Amenities</Text>
            <View style={styles.amenitiesGrid}>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>🏊</Text>
                <Text style={styles.amenityText}>Swimming Pool</Text>
              </View>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>🍽️</Text>
                <Text style={styles.amenityText}>Restaurant</Text>
              </View>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>🚗</Text>
                <Text style={styles.amenityText}>Free Parking</Text>
              </View>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>💼</Text>
                <Text style={styles.amenityText}>Business Center</Text>
              </View>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>🏋️</Text>
                <Text style={styles.amenityText}>Fitness Center</Text>
              </View>
              <View style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>🛎️</Text>
                <Text style={styles.amenityText}>24/7 Service</Text>
              </View>
            </View>
          </View>

          <View style={styles.roomTypesSection}>
            <Text style={styles.sectionTitle}>🛏️ Available Room Types</Text>
            <FlatList
              data={hotel.roomTypes}
              renderItem={renderRoomType}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>📅 Your Stay</Text>
            <Text style={styles.dateText}>
              {checkInDate} - {checkOutDate}
            </Text>
            <View style={styles.dateDetails}>
              <Text style={styles.dateDetail}>Check-in: 3:00 PM</Text>
              <Text style={styles.dateDetail}>Check-out: 11:00 AM</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View 
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={handleBookNow}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>📋 Book Now</Text>
          <Text style={styles.bookButtonSubtext}>Secure your reservation</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
  },
  carouselImage: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  imageOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 15,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    // color set dynamically
  },
  ratingText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  hotelCity: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  priceUnit: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  amenitiesSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
  },
  roomTypesSection: {
    marginBottom: 25,
  },
  roomTypeCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  roomTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  roomTypePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  roomTypeCapacity: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  roomTypeFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomFeature: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 12,
  },
  dateDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateDetail: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  bookButton: {
    backgroundColor: '#3498db',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bookButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
});

export default HotelDetailScreen; 