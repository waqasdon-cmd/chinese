import { MenuItem, Review } from './types';

// Declare premium generated assets as clean string paths for Vite compilation
export const heroDishImg = '/src/assets/images/hero_dish_1783446813851.jpg';
export const xiaoLongBaoImg = '/src/assets/images/xiao_long_bao_1783446829715.jpg';
export const handmadeNoodlesImg = '/src/assets/images/handmade_noodles_1783446844050.jpg';
export const restaurantInteriorImg = '/src/assets/images/restaurant_interior_1783446856476.jpg';
export const signatureSoupImg = '/src/assets/images/signature_soup_1783446876870.jpg';

export const RESTAURANT_INFO = {
  name: 'Xibai Feng Wei Yuan',
  cuisine: 'Authentic Chinese Cuisine',
  address: 'Street 11, I-10/2, Islamabad, Pakistan',
  googleRating: 4.4,
  reviewCount: 52,
  priceRange: 'Rs 1 – Rs 1,000 per person',
  phone: '+92 314 7798881',
  phoneFormatted: '+923147798881',
  whatsappNumber: '+923147798881',
  email: 'info@xibaifengweiyuan.com',
  hours: 'Open Daily: 12:00 PM – 11:30 PM',
  services: ['Dine-in', 'Drive-through', 'Takeaway', 'Phone Orders']
};

export const WHY_CHOOSE_US = [
  {
    id: 'authentic',
    title: 'Authentic Chinese Cuisine',
    description: 'Traditional recipes passed down through generations, cooked by experts.',
    iconName: 'Utensils'
  },
  {
    id: 'fresh',
    title: 'Fresh Ingredients',
    description: 'We source fresh vegetables, premium meats, and custom imported Chinese spices daily.',
    iconName: 'Sparkles'
  },
  {
    id: 'chefs',
    title: 'Experienced Chefs',
    description: 'Our culinary team specializes in regional Chinese cooking and noodle stretching.',
    iconName: 'ChefHat'
  },
  {
    id: 'family',
    title: 'Family Friendly',
    description: 'Spacious, warm, and comfortable dining environment perfect for families.',
    iconName: 'Users'
  },
  {
    id: 'fast',
    title: 'Fast Service',
    description: 'Enjoy steaming hot meals served swiftly without sacrificing gourmet quality.',
    iconName: 'Clock'
  },
  {
    id: 'affordable',
    title: 'Affordable Prices',
    description: 'Premium tastes at highly accessible prices, ranging from Rs 120 to Rs 1,250.',
    iconName: 'Wallet'
  },
  {
    id: 'comfortable',
    title: 'Comfortable Dining',
    description: 'Elegant seating, atmospheric lighting, and clean, beautiful modern setup.',
    iconName: 'Sofa'
  },
  {
    id: 'drive',
    title: 'Drive-through Available',
    description: 'Quick pickup on the go with dedicated lanes for Islamabad commuters.',
    iconName: 'Car'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- DUMPLINGS ---
  {
    id: 'dumplings-xlb',
    name: 'Xiao Long Bao',
    category: 'dumplings',
    description: 'Hand-crafted soup dumplings filled with seasoned chicken or beef and hot, savory broth.',
    price: 650,
    image: xiaoLongBaoImg,
    spicyLevel: 0,
    isSignature: true,
    isPopular: true
  },
  {
    id: 'dumplings-steamed',
    name: 'Steamed Dumplings',
    category: 'dumplings',
    description: 'Classic steamed Chinese dumplings filled with premium minced chicken and Chinese chives.',
    price: 580,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    isPopular: true
  },
  {
    id: 'dumplings-fried',
    name: 'Fried Dumplings',
    category: 'dumplings',
    description: 'Pan-fried potstickers with a golden lace crust, filled with spiced meat and cabbage.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },

  // --- NOODLES ---
  {
    id: 'noodles-beef',
    name: 'Hand-Pulled Beef Noodles',
    category: 'noodles',
    description: 'Our house specialty. Signature hand-stretched wheat noodles in rich aromatic beef broth, loaded with tender braised beef slices and fresh greens.',
    price: 750,
    image: handmadeNoodlesImg,
    spicyLevel: 2,
    isSignature: true,
    isPopular: true
  },
  {
    id: 'noodles-chicken',
    name: 'Chicken Stir-Fry Noodles',
    category: 'noodles',
    description: 'Wok-tossed hand-pulled noodles with chicken strips, bok choy, carrots, and oyster sauce.',
    price: 680,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },
  {
    id: 'noodles-seafood',
    name: 'Seafood Special Noodles',
    category: 'noodles',
    description: 'Delicious hand-pulled noodles tossed in rich garlic seafood sauce with shrimps, squid, and seasonal greens.',
    price: 850,
    image: 'https://images.unsplash.com/photo-1612966608967-309f4e3c35f9?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },

  // --- SOUPS ---
  {
    id: 'soup-hot-sour',
    name: 'Hot & Sour Soup',
    category: 'soups',
    description: 'A classic, thick, spicy, and tangy soup with wood-ear mushrooms, bamboo shoots, silken tofu, and whisked eggs.',
    price: 420,
    image: signatureSoupImg,
    spicyLevel: 2,
    isSignature: true,
    isPopular: true
  },
  {
    id: 'soup-corn',
    name: 'Chicken Corn Soup',
    category: 'soups',
    description: 'Comforting Chinese soup with sweet corn kernels, tender shredded chicken, and egg drops.',
    price: 380,
    image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },
  {
    id: 'soup-wonton',
    name: 'Wonton Soup',
    category: 'soups',
    description: 'Clear seasoned chicken broth featuring delicate hand-wrapped wontons filled with seasoned chicken.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },

  // --- RICE ---
  {
    id: 'rice-fried',
    name: 'Egg Fried Rice',
    category: 'rice',
    description: 'Fluffy steamed jasmine rice wok-fried with farm eggs, scallions, and light soy sauce.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true
  },
  {
    id: 'rice-chicken',
    name: 'Chicken Fried Rice',
    category: 'rice',
    description: 'Aromatic wok-fried rice with tender chicken breast pieces, sweet peas, carrots, and spring onions.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'rice-special',
    name: 'Special Chinese Rice',
    category: 'rice',
    description: 'Our ultimate combination rice, fried with chicken, beef, shrimps, and mixed farm-fresh vegetables.',
    price: 580,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
  },

  // --- CHICKEN ---
  {
    id: 'chicken-kung-pao',
    name: 'Kung Pao Chicken',
    category: 'chicken',
    description: 'Stir-fried chicken cubes with crunchy roasted peanuts, bell peppers, and dried red chilies in a sweet-savory glaze.',
    price: 820,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'chicken-sweet-sour',
    name: 'Sweet & Sour Chicken',
    category: 'chicken',
    description: 'Crispy chicken bites tossed with fresh pineapple chunks, onions, and bell peppers in a tangy, glossy sweet & sour sauce.',
    price: 780,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },
  {
    id: 'chicken-garlic',
    name: 'Garlic Chicken',
    category: 'chicken',
    description: 'Tender stir-fried chicken breast fillets with broccoli and carrots in a rich, savory Chinese garlic sauce.',
    price: 760,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },

  // --- BEEF ---
  {
    id: 'beef-black-pepper',
    name: 'Beef with Black Pepper',
    category: 'beef',
    description: 'Sizzling sliced beef tenderloin stir-fried with onions and green peppers in an intense, robust black pepper sauce.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'beef-chili',
    name: 'Beef Chili Dry',
    category: 'beef',
    description: 'Crispy shredded beef dry-tossed with fresh hot green chilies, ginger juliennes, and dark soy sauce.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3
  },
  {
    id: 'beef-stir-fried',
    name: 'Stir Fried Beef',
    category: 'beef',
    description: 'Classic wok-cooked beef strips with tender broccoli florets, carrots, and baby corn in a rich savory sauce.',
    price: 920,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1
  },

  // --- SEAFOOD ---
  {
    id: 'seafood-shrimp',
    name: 'Kung Pao Shrimp',
    category: 'seafood',
    description: 'Plump premium shrimps stir-fried with chili pods, green onions, and peanuts in our sweet, hot signature glaze.',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1559737605-de6a0c75f6fb?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true
  },
  {
    id: 'seafood-fish',
    name: 'Sweet & Sour Fish',
    category: 'seafood',
    description: 'Lightly battered crispy fish fillets covered in glossy sweet and sour sauce with colorful capsicum.',
    price: 980,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0
  },
  {
    id: 'seafood-special',
    name: 'Seafood Sizzler Special',
    category: 'seafood',
    description: 'A decadent combination of premium prawns, squid, fish fillets, and select oriental vegetables served on a hot plate.',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isSignature: true
  },

  // --- BEVERAGES ---
  {
    id: 'beverage-tea',
    name: 'Premium Chinese Green Tea',
    category: 'beverages',
    description: 'Authentic jasmine-infused loose-leaf green tea served hot in a traditional pot. Cleansing and refreshing.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 'beverage-soda',
    name: 'Soft Drinks',
    category: 'beverages',
    description: 'Chilled selection of popular soft drinks (Coke, Sprite, Fanta, Diet Coke).',
    price: 120,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'beverage-juice',
    name: 'Fresh Season Juices',
    category: 'beverages',
    description: 'Freshly squeezed seasonal fruits made pure to order.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    isVegetarian: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ali Raza',
    rating: 5,
    comment: 'The dumplings were authentic and delicious. Closest thing to authentic Beijing Xiao Long Bao in Islamabad! The broth inside was incredibly flavorful.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    isVerified: true
  },
  {
    id: 'rev-2',
    name: 'Zara Malik',
    rating: 5,
    comment: 'One of the best Chinese restaurants in Islamabad. Their hand-pulled noodles are made fresh right there, chewiness is absolutely spot on, broth is super rich.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    isVerified: true
  },
  {
    id: 'rev-3',
    name: 'Usman Khan',
    rating: 4,
    comment: 'Excellent food and friendly staff. Love the cozy interior and the speed of their service. The Kung Pao Chicken had the perfect spicy kick. Highly recommended!',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    isVerified: true
  },
  {
    id: 'rev-4',
    name: 'Aisha Ahmed',
    rating: 5,
    comment: 'Their Hot & Sour soup is a masterpiece. It has the perfect balance of heat and tanginess, packed with wood ear mushrooms and tofu. Kids loved the sweet and sour chicken!',
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    isVerified: true
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Modern Chinese Interior',
    category: 'interior',
    image: restaurantInteriorImg,
    description: 'Elegant seating framed by ambient warm gold lighting and traditional oriental decorations.'
  },
  {
    id: 'gal-2',
    title: 'Gourmet Chinese Banquet',
    category: 'dishes',
    image: heroDishImg,
    description: 'An expansive spread of steaming dumplings, soup, rice, and signature entrees.'
  },
  {
    id: 'gal-3',
    title: 'Xian Xiao Long Bao',
    category: 'dumplings',
    image: xiaoLongBaoImg,
    description: 'Handcrafted soup dumplings sitting in a traditional steamed bamboo basket.'
  },
  {
    id: 'gal-4',
    title: 'Stretching Hand-Pulled Noodles',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    description: 'Our expert chef hand-pulling fresh wheat noodles in the viewing kitchen.'
  },
  {
    id: 'gal-5',
    title: 'Beef Noodles Preparation',
    category: 'noodles',
    image: handmadeNoodlesImg,
    description: 'Chef preparing the hot beef broth with freshly stretched noodles.'
  },
  {
    id: 'gal-6',
    title: 'Signature Wonton Soup Boiling',
    category: 'soups',
    image: signatureSoupImg,
    description: 'Hot, tangy, and rich soup loaded with hand-wrapped savory wontons and greens.'
  },
  {
    id: 'gal-7',
    title: 'Comfortable Group Seating',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable banquettes perfect for family dinners and corporate lunches.'
  },
  {
    id: 'gal-8',
    title: 'Chef Wok Cooking',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    description: 'Expert wok frying on high heat to seal in the authentic wok-hei flavor.'
  }
];
