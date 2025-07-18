import { Hotel } from '../types';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'The Taj Mahal Palace',
    description: 'Iconic luxury hotel overlooking the Gateway of India, offering world-class amenities and heritage charm in Mumbai.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400'
    ],
    pricePerNight: 8500,
    rating: 4.9,
    city: 'Mumbai',
    roomTypes: [
      { id: '1', name: 'Deluxe Room', price: 8500, capacity: 2 },
      { id: '2', name: 'Luxury Suite', price: 15000, capacity: 4 },
      { id: '3', name: 'Sea View Suite', price: 20000, capacity: 4 }
    ]
  },
  {
    id: '2',
    name: 'Trident Nariman Point',
    description: 'Modern high-rise hotel with stunning views of Marine Drive and the Arabian Sea, perfect for business and leisure.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 7000,
    rating: 4.7,
    city: 'Mumbai',
    roomTypes: [
      { id: '1', name: 'Premier Room', price: 7000, capacity: 2 },
      { id: '2', name: 'Executive Suite', price: 12000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 25000, capacity: 6 }
    ]
  },
  {
    id: '3',
    name: 'ITC Grand Central',
    description: 'A luxury hotel in Mumbai with colonial architecture, lush gardens, and award-winning restaurants.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 9000,
    rating: 4.6,
    city: 'Mumbai',
    roomTypes: [
      { id: '1', name: 'Luxury Room', price: 9000, capacity: 2 },
      { id: '2', name: 'Tower Suite', price: 16000, capacity: 4 },
      { id: '3', name: 'Heritage Suite', price: 22000, capacity: 5 }
    ]
  },
  {
    id: '4',
    name: 'The Leela Palace',
    description: 'A blend of modern luxury and royal elegance, located in the heart of New Delhi. Renowned for its hospitality and fine dining.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400'
    ],
    pricePerNight: 9500,
    rating: 4.8,
    city: 'Delhi',
    roomTypes: [
      { id: '1', name: 'Premier Room', price: 9500, capacity: 2 },
      { id: '2', name: 'Royal Suite', price: 18000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 30000, capacity: 6 }
    ]
  },
  {
    id: '5',
    name: 'The Imperial New Delhi',
    description: 'A historic hotel with colonial charm, lush lawns, and a central location near Connaught Place.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
    ],
    pricePerNight: 8000,
    rating: 4.7,
    city: 'Delhi',
    roomTypes: [
      { id: '1', name: 'Heritage Room', price: 8000, capacity: 2 },
      { id: '2', name: 'Imperial Suite', price: 14000, capacity: 4 },
      { id: '3', name: 'Grand Suite', price: 20000, capacity: 5 }
    ]
  },
  {
    id: '6',
    name: 'JW Marriott Hotel New Delhi',
    description: 'A contemporary hotel near the airport with luxurious rooms, spa, and multiple dining options.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 10500,
    rating: 4.6,
    city: 'Delhi',
    roomTypes: [
      { id: '1', name: 'Deluxe Room', price: 10500, capacity: 2 },
      { id: '2', name: 'Club Suite', price: 17000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 32000, capacity: 6 }
    ]
  },
  {
    id: '7',
    name: 'JW Marriott Pune',
    description: 'A luxury hotel in Pune with panoramic city views, rooftop dining, and a relaxing spa.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 7500,
    rating: 4.7,
    city: 'Pune',
    roomTypes: [
      { id: '1', name: 'Deluxe Room', price: 7500, capacity: 2 },
      { id: '2', name: 'Executive Suite', price: 12000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 20000, capacity: 6 }
    ]
  },
  {
    id: '8',
    name: 'Conrad Pune',
    description: 'A 5-star hotel in Pune with contemporary design, multiple restaurants, and a central location.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 6800,
    rating: 4.6,
    city: 'Pune',
    roomTypes: [
      { id: '1', name: 'Premium Room', price: 6800, capacity: 2 },
      { id: '2', name: 'Deluxe Suite', price: 11000, capacity: 4 },
      { id: '3', name: 'Grand Suite', price: 17000, capacity: 5 }
    ]
  },
  {
    id: '9',
    name: 'Hyatt Pune',
    description: 'A stylish hotel near Pune airport with lush gardens, an outdoor pool, and modern amenities.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 6000,
    rating: 4.5,
    city: 'Pune',
    roomTypes: [
      { id: '1', name: 'Standard Room', price: 6000, capacity: 2 },
      { id: '2', name: 'Club Suite', price: 9500, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 18000, capacity: 6 }
    ]
  },
  {
    id: '10',
    name: 'ITC Gardenia',
    description: 'Eco-friendly luxury hotel in Bangalore, known for its lush gardens, contemporary design, and exceptional service.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'
    ],
    pricePerNight: 7000,
    rating: 4.7,
    city: 'Bangalore',
    roomTypes: [
      { id: '1', name: 'Executive Room', price: 7000, capacity: 2 },
      { id: '2', name: 'Luxury Suite', price: 12000, capacity: 4 },
      { id: '3', name: 'Garden Suite', price: 16000, capacity: 4 }
    ]
  },
  {
    id: '11',
    name: 'The Park Hyatt',
    description: 'A contemporary hotel in Chennai, offering elegant rooms, a tranquil spa, and gourmet dining experiences.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'
    ],
    pricePerNight: 6000,
    rating: 4.6,
    city: 'Chennai',
    roomTypes: [
      { id: '1', name: 'Park Room', price: 6000, capacity: 2 },
      { id: '2', name: 'Hyatt Suite', price: 11000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 25000, capacity: 6 }
    ]
  },
  {
    id: '12',
    name: 'Novotel Hyderabad',
    description: 'Modern hotel in Hyderabad with spacious rooms, outdoor pool, and easy access to business and leisure destinations.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'
    ],
    pricePerNight: 5500,
    rating: 4.5,
    city: 'Hyderabad',
    roomTypes: [
      { id: '1', name: 'Superior Room', price: 5500, capacity: 2 },
      { id: '2', name: 'Executive Suite', price: 10000, capacity: 4 },
      { id: '3', name: 'Family Suite', price: 14000, capacity: 5 }
    ]
  },
  {
    id: '13',
    name: 'Grand Hyatt Goa',
    description: 'A luxury resort in Goa with stunning sea views, lush gardens, and a private beach. Perfect for a relaxing getaway.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400',
    images: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    pricePerNight: 12000,
    rating: 4.8,
    city: 'Goa',
    roomTypes: [
      { id: '1', name: 'Grand Room', price: 12000, capacity: 2 },
      { id: '2', name: 'Sea View Suite', price: 18000, capacity: 4 },
      { id: '3', name: 'Presidential Suite', price: 35000, capacity: 6 }
    ]
  },
  {
    id: '14',
    name: 'Rambagh Palace',
    description: 'A former royal residence in Jaipur, now a luxury hotel with regal suites, lush gardens, and heritage architecture.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=400'
    ],
    pricePerNight: 17000,
    rating: 4.9,
    city: 'Jaipur',
    roomTypes: [
      { id: '1', name: 'Palace Room', price: 17000, capacity: 2 },
      { id: '2', name: 'Royal Suite', price: 25000, capacity: 4 },
      { id: '3', name: 'Grand Presidential Suite', price: 40000, capacity: 6 }
    ]
  }
]; 