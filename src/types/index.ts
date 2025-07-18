export interface Hotel {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  pricePerNight: number;
  rating: number;
  city: string;
  roomTypes: RoomType[];
}

export interface RoomType {
  id: string;
  name: string;
  price: number;
  capacity: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  guestName: string;
  email: string;
  numberOfGuests: number;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  bookingDate: string;
}

export interface SearchParams {
  city: string;
  checkInDate: string;
  checkOutDate: string;
} 