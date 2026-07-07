export interface MenuItem {
  id: string;
  name: string;
  category: 'dumplings' | 'noodles' | 'soups' | 'rice' | 'chicken' | 'beef' | 'seafood' | 'beverages';
  description: string;
  price: number; // in PKR
  image: string;
  spicyLevel?: number; // 0 to 3
  isSignature?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
  createdAt: string;
}
