import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { Hotel, SearchParams } from '../types';
import { HotelAPI, apiCall } from '../services/api';

const { width } = Dimensions.get('window');

interface HotelListScreenProps {
  navigation: any;
  route: {
    params: SearchParams;
  };
}

const HotelListScreen: React.FC<HotelListScreenProps> = ({ navigation, route }) => {
  const { city, checkInDate, checkOutDate } = route.params;
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadHotels();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [city, priceFilter, ratingFilter]);

  const loadHotels = async () => {
    setIsLoading(true);
    try {
      let hotels: Hotel[];
      
      if (priceFilter || ratingFilter) {
        const maxPrice = priceFilter ? parseInt(priceFilter) : undefined;
        const minRating = ratingFilter ? parseFloat(ratingFilter) : undefined;
        hotels = await apiCall(
          () => HotelAPI.filterHotels(city, maxPrice, minRating),
          'Failed to load hotels'
        );
      } else {
        hotels = await apiCall(
          () => HotelAPI.getHotelsByCity(city),
          'Failed to load hotels'
        );
      }
      
      setFilteredHotels(hotels);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHotelItem = ({ item, index }: { item: Hotel; index: number }) => (
    <Animated.View
      style={[
        styles.hotelCard,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.hotelCardContent}
        onPress={() => navigation.navigate('HotelDetail', { 
          hotel: item, 
          checkInDate, 
          checkOutDate 
        })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.hotelImage} />
        <View style={styles.hotelInfo}>
          <View style={styles.hotelHeader}>
            <Text style={styles.hotelName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, { color: item.rating >= 4.5 ? '#27ae60' : '#f39c12' }]}>★ {item.rating}</Text>
            </View>
          </View>
          <Text style={styles.hotelCity}>📍 {item.city}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>Rs. {item.pricePerNight}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
          <View style={styles.amenitiesContainer}>
            <Text style={styles.amenity}>🏊 Pool</Text>
            <Text style={styles.amenity}>🍽️ Restaurant</Text>
            <Text style={styles.amenity}>🚗 Parking</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            })}],
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>🏨 Hotels in {city}</Text>
          <Text style={styles.subtitle}>
            {checkInDate} - {checkOutDate}
          </Text>
          <Text style={styles.resultCount}>
            {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
          </Text>
        </View>
      </Animated.View>

      <Animated.View 
        style={[
          styles.filters,
          {
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            })}],
          }
        ]}
      >
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>💰 Max Price</Text>
          <View style={styles.filterInputWrapper}>
            <TextInput
              style={styles.filterInput}
              placeholder="Any"
              value={priceFilter}
              onChangeText={setPriceFilter}
              keyboardType="numeric"
              placeholderTextColor="#95a5a6"
            />
          </View>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>⭐ Min Rating</Text>
          <View style={styles.filterInputWrapper}>
            <TextInput
              style={styles.filterInput}
              placeholder="Any"
              value={ratingFilter}
              onChangeText={setRatingFilter}
              keyboardType="numeric"
              placeholderTextColor="#95a5a6"
            />
          </View>
        </View>
      </Animated.View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Searching for hotels...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredHotels}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Animated.View 
              style={[
                styles.emptyContainer,
                {
                  opacity: fadeAnim,
                }
              ]}
            >
              <Text style={styles.emptyIcon}>🏨</Text>
              <Text style={styles.emptyText}>No hotels found in {city}</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters or search for a different city</Text>
            </Animated.View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  resultCount: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  filterInputWrapper: {
    borderWidth: 2,
    borderColor: '#e8f4fd',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  filterInput: {
    padding: 10,
    fontSize: 14,
    color: '#2c3e50',
  },
  listContainer: {
    padding: 15,
  },
  hotelCard: {
    marginBottom: 15,
  },
  hotelCardContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  hotelInfo: {
    padding: 16,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    backgroundColor: '#eafaf1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  hotelCity: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  priceUnit: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 2,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amenity: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HotelListScreen; 