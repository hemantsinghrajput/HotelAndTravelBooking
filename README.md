# Hotel & Travel Booking App

A React Native mobile application for searching and booking hotels in selected cities. Built with TypeScript and Expo.

## Features

### Core Features
- **Search Screen**: Search hotels by city with check-in and check-out date selection
- **Hotel List Screen**: Display available hotels with filtering by price and rating
- **Hotel Detail Screen**: View detailed hotel information with image carousel and room types
- **Booking Form Screen**: Complete booking process with form validation

### Additional Features
- **Form Validation**: Email validation and required field checks
- **Local Storage**: Bookings are saved using AsyncStorage
- **Responsive Design**: Optimized for both Android and iOS
- **TypeScript**: Full type safety throughout the application
- **Modern UI/UX**: Clean and intuitive user interface

## Screenshots

The app includes the following screens:
1. **Search Screen** - City input and date selection
2. **Hotel List Screen** - Available hotels with filters
3. **Hotel Detail Screen** - Hotel information and room types
4. **Booking Form Screen** - Guest information and booking confirmation

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **AsyncStorage** for local data persistence
- **React Native Picker** for dropdown selections
- **DateTimePicker** for date selection
- **Demo API Service** for simulating real API calls

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HotelBookingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

5. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

6. **Run on Web**
   ```bash
   npm run web
   ```

## Project Structure

```
HotelBookingApp/
├── src/
│   ├── screens/
│   │   ├── SearchScreen.tsx
│   │   ├── HotelListScreen.tsx
│   │   ├── HotelDetailScreen.tsx
│   │   └── BookingFormScreen.tsx
│   ├── data/
│   │   └── hotels.ts
│   └── types/
│       └── index.ts
├── App.tsx
├── package.json
└── README.md
```

## App Flow

1. **Search Screen**: Users enter city name and select check-in/check-out dates
2. **Hotel List**: Displays available hotels with filtering options
3. **Hotel Detail**: Shows hotel information, images, and room types
4. **Booking Form**: Collects guest information and confirms booking
5. **Success**: Booking confirmation with stored booking data

## Demo API & Mock Data

The app includes a comprehensive demo API service that simulates real API calls:

### API Endpoints
- `searchHotels()` - Search hotels by city and dates
- `getHotelsByCity()` - Get hotels in a specific city
- `filterHotels()` - Filter hotels by price and rating
- `getHotelById()` - Get specific hotel details
- `createBooking()` - Create a new booking
- `getUserBookings()` - Get user's booking history
- `cancelBooking()` - Cancel an existing booking
- `getPopularDestinations()` - Get popular cities
- `getHotelRecommendations()` - Get recommended hotels

### Mock Data
- 6-7 sample hotels in different cities (Delhi,Mumbai,Pune,Jaipur,Hyderabad,Chennai, etc.)
- Various room types with different prices and capacities
- Hotel images from Unsplash
- Ratings and detailed descriptions
- Simulated API delays for realistic experience

## Features Implemented

### ✅ Core Requirements
- [x] Search functionality with city and date inputs
- [x] Hotel list with name, image, price, and rating
- [x] Hotel detail screen with description and room types
- [x] Booking form with guest information
- [x] Form validation and success messages

### ✅ Bonus Features
- [x] Price and rating filters
- [x] Local storage for bookings
- [x] Form validation
- [x] Image carousel
- [x] Responsive design
- [x] TypeScript implementation
- [x] Demo API service with simulated delays
- [x] Loading states and error handling
- [x] Reusable components

## Dependencies

```json
{
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/stack": "^6.x.x",
  "@react-native-async-storage/async-storage": "^1.x.x",
  "@react-native-community/datetimepicker": "^7.x.x",
  "@react-native-picker/picker": "^2.x.x",
  "react-native-screens": "^3.x.x",
  "react-native-safe-area-context": "^4.x.x",
  "react-native-gesture-handler": "^2.x.x"
}
```

## Development Notes

- The app uses Expo for easier development and deployment
- All components are built with TypeScript for better type safety
- Navigation is handled with React Navigation v6
- Local storage is implemented using AsyncStorage
- The UI follows modern design principles with consistent styling

## Testing

To test the app:
1. Run the app on a device or simulator
2. Search for hotels in cities like "Delhi", "Mumbai", "Pune", "Hyderabad", or "Jaipur"
3. Try the filtering options on the hotel list
4. Complete a booking to test the form validation
5. Check that bookings are saved locally

## Future Enhancements

- User authentication
- Real API integration
- Payment processing
- Booking history
- Push notifications
- Offline support
- Multi-language support

## License

This project is created for educational purposes as part of a React Native assignment. 
