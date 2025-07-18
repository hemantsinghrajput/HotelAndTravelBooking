import { Hotel, Booking, SearchParams } from '../types';
import { hotels } from '../data/hotels';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Demo API Service
export class HotelAPI {
  // Search hotels by city and dates
  static async searchHotels(params: SearchParams): Promise<Hotel[]> {
    await delay(1000); // Simulate network delay
    
    const { city } = params;
    const filteredHotels = hotels.filter(hotel => 
      hotel.city.toLowerCase().includes(city.toLowerCase())
    );
    
    return filteredHotels;
  }

  // Get hotel by ID
  static async getHotelById(id: string): Promise<Hotel | null> {
    await delay(500);
    
    const hotel = hotels.find(h => h.id === id);
    return hotel || null;
  }

  // Get hotels by city
  static async getHotelsByCity(city: string): Promise<Hotel[]> {
    await delay(800);
    
    return hotels.filter(hotel => 
      hotel.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  // Filter hotels by price and rating
  static async filterHotels(
    city: string, 
    maxPrice?: number, 
    minRating?: number
  ): Promise<Hotel[]> {
    await delay(600);
    
    let filtered = hotels.filter(hotel => 
      hotel.city.toLowerCase().includes(city.toLowerCase())
    );

    if (maxPrice) {
      filtered = filtered.filter(hotel => hotel.pricePerNight <= maxPrice);
    }

    if (minRating) {
      filtered = filtered.filter(hotel => hotel.rating >= minRating);
    }

    return filtered;
  }

  // Create a booking
  static async createBooking(booking: Omit<Booking, 'id' | 'bookingDate'>): Promise<Booking> {
    await delay(1500); // Simulate booking processing
    
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString(),
    };

    // Simulate API response
    return newBooking;
  }

  // Get user bookings
  static async getUserBookings(email: string): Promise<Booking[]> {
    await delay(800);
    
    // In a real app, this would fetch from backend
    // For demo, we'll return empty array
    return [];
  }

  // Cancel booking
  static async cancelBooking(bookingId: string): Promise<boolean> {
    await delay(1000);
    
    // Simulate successful cancellation
    return true;
  }

  // Get popular destinations
  static async getPopularDestinations(): Promise<string[]> {
    await delay(300);
    
    return ['New York', 'Miami', 'Los Angeles', 'Denver', 'Boston'];
  }

  // Get hotel recommendations
  static async getHotelRecommendations(city: string): Promise<Hotel[]> {
    await delay(700);
    
    const cityHotels = hotels.filter(hotel => 
      hotel.city.toLowerCase().includes(city.toLowerCase())
    );
    
    // Return top 3 rated hotels
    return cityHotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }
}

// Error handling wrapper
export const apiCall = async <T>(
  apiFunction: () => Promise<T>,
  errorMessage: string = 'Something went wrong'
): Promise<T> => {
  try {
    return await apiFunction();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(errorMessage);
  }
}; 