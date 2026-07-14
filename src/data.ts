/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Category, Review } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "biryanis",
    name: "Biryanis & Rice",
    iconName: "Flame",
    description: "Premium slow-dum Biryanis, Paneer specialties, and traditional Telangana-style Bagara Rice.",
    highlightImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "starters",
    name: "Starters",
    iconName: "Zap",
    description: "Crispy, juicy, and spicy regional chicken & paneer appetizers.",
    highlightImage: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "curries",
    name: "Curries & Ragi Mudha",
    iconName: "Soup",
    description: "Traditional slow-cooked Telangana gravies, fries, and nutritious Ragi Mudha combos.",
    highlightImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "meals",
    name: "Bulk Meals",
    iconName: "UtensilsCrossed",
    description: "Standard and royal catering meal packs perfect for families and gatherings.",
    highlightImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sweets",
    name: "Traditional Sweets",
    iconName: "Sparkles",
    description: "Indulgent traditional desserts crafted with pure ghee and milk solids.",
    highlightImage: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "snacks",
    name: "Snacks",
    iconName: "Cookie",
    description: "Crispy snacks and sides for quick bites.",
    highlightImage: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- Biryanis & Rice ---
  {
    id: "b1",
    name: "Hyderabadi Chicken Dum Biryani",
    description: "Classic slow-cooked, basmati rice layered with juicy, overnight marinated chicken, saffron-infused milk, pure ghee, and 24 secret spices.",
    price: 349,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Best Seller", "Authentic", "Dum Cooking"],
    rating: 4.9,
    reviewsCount: 1420,
    isChefSpecial: true
  },
  {
    id: "b2",
    name: "Royal Mutton Dum Biryani",
    description: "Finest premium cuts of tender goat meat marinated in robust yogurt and spices, layered with long-grain rice in a sealed handi.",
    price: 429,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Royal", "Slow Cooked"],
    rating: 4.8,
    reviewsCount: 890,
    isChefSpecial: true
  },
  {
    id: "b3",
    name: "Chicken 65 Biryani",
    description: "Fragrant biryani rice topped with legendary, fiery, deep-fried spiced Chicken 65 pieces, tempered with yogurt, curry leaves, and green chilies.",
    price: 369,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Spicy Delight", "Highly Requested"],
    rating: 4.9,
    reviewsCount: 1120,
    isChefSpecial: true
  },
  {
    id: "b4",
    name: "Paneer Biryani",
    description: "Fragrant long-grain basmati rice layered with succulent cubes of spiced paneer, fresh mint, caramelized onions, and clarified butter.",
    price: 289,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Vegetarian", "Rich Paneer"],
    rating: 4.7,
    reviewsCount: 450
  },
  {
    id: "b5",
    name: "Kaju Paneer Biryani",
    description: "Basmati rice cooked with fresh paneer cubes and crunchy roasted golden cashews (Kaju) in a premium, aromatic spice blend.",
    price: 319,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Royal Veg", "Rich Cashews"],
    rating: 4.8,
    reviewsCount: 610,
    isChefSpecial: true
  },
  {
    id: "b6",
    name: "Veg Biryani",
    description: "Traditional vegetable medley layered with fine basmati rice, mint, coriander, and royal handi spices.",
    price: 249,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Classic Veg", "Nutritious"],
    rating: 4.6,
    reviewsCount: 380
  },
  {
    id: "b7",
    name: "Mushroom Biryani",
    description: "Flavor-packed basmati rice slow-cooked with spiced, juicy button mushrooms, fresh herbs, and premium ghee.",
    price: 279,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Savory", "Earthy Flavor"],
    rating: 4.7,
    reviewsCount: 290
  },
  {
    id: "b8",
    name: "Telangana Style Bagara Rice",
    description: "Highly popular regional rice dish prepared with basmati rice, whole spices (Shahjeera, bay leaves, cloves), mint, and coriander. Best paired with Chicken Curry!",
    price: 189,
    category: "biryanis",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop",
    spiciness: 1,
    isVeg: true,
    tags: ["Telangana Specialty", "Heritage Rice"],
    rating: 4.9,
    reviewsCount: 1540,
    isChefSpecial: true
  },

  // --- Starters ---
  {
    id: "s1",
    name: "Chicken 65 (Dry)",
    description: "Fiery, deep-fried chicken cubes tossed with curry leaves, yogurt, green chilies, and regional South Indian spices.",
    price: 269,
    category: "starters",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Iconic Starter", "Spicy", "Crunchy"],
    rating: 4.9,
    reviewsCount: 1980,
    isChefSpecial: true
  },
  {
    id: "s2",
    name: "Chicken Majestic",
    description: "Dry, stir-fried chicken strips marinated with yogurt, ginger, garlic, and green chilies, finished with mint and curry leaves. A Hyderabad specialty!",
    price: 289,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: false,
    tags: ["Hyderabadi Style", "Best Seller"],
    rating: 4.8,
    reviewsCount: 1420,
    isChefSpecial: true
  },
  {
    id: "s3",
    name: "Paneer 65",
    description: "Crispy batter-fried paneer cubes tossed in a sizzling, spicy yogurt sauce with curry leaves and crushed black pepper.",
    price: 239,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Crispy", "Spicy Veg"],
    rating: 4.7,
    reviewsCount: 890
  },
  {
    id: "s4",
    name: "Tandoori Chicken (Half)",
    description: "Tender chicken on the bone, marinated in spiced yogurt and red chilies, roasted to perfection in a clay oven with smoky coal aroma.",
    price: 299,
    category: "starters",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: false,
    tags: ["Smoky", "Clay Oven"],
    rating: 4.8,
    reviewsCount: 750
  },
  {
    id: "s5",
    name: "KFC Style Crispy Chicken",
    description: "Ultra-crispy, golden-fried chicken tenders seasoned with southern herbs and spices, crispy on the outside, juicy on the inside.",
    price: 259,
    category: "starters",
    image: "https://images.unsplash.com/photo-1562967914-608f82629a7a?q=80&w=600&auto=format&fit=crop",
    spiciness: 1,
    isVeg: false,
    tags: ["Crunchy Delight", "Kids Favorite"],
    rating: 4.7,
    reviewsCount: 540
  },
  {
    id: "s6",
    name: "Crispy Corn Masala",
    description: "Golden fried sweet corn kernels tossed with diced onions, bell peppers, fresh lime juice, and standard spices.",
    price: 199,
    category: "starters",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
    spiciness: 1,
    isVeg: true,
    tags: ["Crispy", "Zesty"],
    rating: 4.6,
    reviewsCount: 680
  },

  // --- Curries & Ragi Mudha ---
  {
    id: "c1",
    name: "Telangana Chicken Curry",
    description: "Rustic homestyle chicken curry cooked with a special spice mix of roasted coconut, coriander, sesame, and fiery red chilies.",
    price: 279,
    category: "curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Telangana Spicy", "Homestyle"],
    rating: 4.9,
    reviewsCount: 1620,
    isChefSpecial: true
  },
  {
    id: "c2",
    name: "Spicy Chicken Fry",
    description: "Semi-dry fried chicken cooked with high-heat onions, garlic, and heavily spiced Guntur chili paste.",
    price: 289,
    category: "curries",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Dry Fry", "Hot & Spicy"],
    rating: 4.8,
    reviewsCount: 940
  },
  {
    id: "c3",
    name: "Aromatic Green Chicken",
    description: "Tender chicken cooked in a rich, herbal green gravy made from fresh coriander, mint, green chilies, yogurt, and cashews.",
    price: 299,
    category: "curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: false,
    tags: ["Herbal Gravy", "Mild Spicy"],
    rating: 4.7,
    reviewsCount: 510
  },
  {
    id: "c4",
    name: "Royal Red Chicken",
    description: "Delicious party-style chicken curry in a bright red gravy made with yogurt, cashew paste, mild Kashmiri chilies, and premium spices.",
    price: 299,
    category: "curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: false,
    tags: ["Party Style", "Creamy & Spicy"],
    rating: 4.8,
    reviewsCount: 670,
    isChefSpecial: true
  },
  {
    id: "c5",
    name: "Paneer Butter Masala",
    description: "Rich and creamy dish made with soft paneer cubes cooked in a mildly sweet, spiced tomato-butter gravy with fresh cream.",
    price: 259,
    category: "curries",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop",
    spiciness: 1,
    isVeg: true,
    tags: ["Creamy Veg", "Sweet & Spicy"],
    rating: 4.8,
    reviewsCount: 1350
  },
  {
    id: "c6",
    name: "Paneer Kaju Masala",
    description: "Rich gravy containing paneer cubes and whole roasted cashews cooked together in a spiced onion-tomato curry base.",
    price: 279,
    category: "curries",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Cashew Gravy", "Rich Veg"],
    rating: 4.7,
    reviewsCount: 420
  },
  {
    id: "c7",
    name: "Ragi Mudha with Chicken Curry",
    description: "Traditional nutrient-rich steamed finger millet ball served with authentic country-style chicken curry. High in protein and iron!",
    price: 329,
    category: "curries",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop",
    spiciness: 3,
    isVeg: false,
    tags: ["Rayalaseema Heritage", "Highly Nutritious"],
    rating: 4.9,
    reviewsCount: 2310,
    isChefSpecial: true
  },

  // --- Bulk Meals ---
  {
    id: "m1",
    name: "Bulk South Indian Meal Pack (Serves 5)",
    description: "A complete lunch bundle featuring Bagara Rice, Sambar, Rasam, Curd, Pappu, Veg fry, Pickle, Sweets, and Papad. Perfectly packaged for catering and groups.",
    price: 999,
    category: "meals",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: true,
    tags: ["Catering Pack", "Serves 5", "Complete Meal"],
    rating: 4.9,
    reviewsCount: 730,
    isChefSpecial: true
  },
  {
    id: "m2",
    name: "Royal Non-Veg Catering Pack (Serves 5)",
    description: "Includes Chicken Dum Biryani, Telangana Chicken Curry, Bagara Rice, Starter Chicken 65, Raita, Salan, and Gulab Jamun.",
    price: 1499,
    category: "meals",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
    spiciness: 2,
    isVeg: false,
    tags: ["Catering Pack", "Serves 5", "Royal Feast"],
    rating: 4.8,
    reviewsCount: 620,
    isChefSpecial: true
  },

  // --- Sweets ---
  {
    id: "sw1",
    name: "Ghee Gulab Jamun (3 Pcs)",
    description: "Golden milk-solid dumplings fried in pure cow ghee and steeped in warm, cardamom-infused sugar syrup.",
    price: 99,
    category: "sweets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    spiciness: 0,
    isVeg: true,
    tags: ["Pure Ghee", "Warm Sweet"],
    rating: 4.9,
    reviewsCount: 1650
  },
  {
    id: "sw2",
    name: "Shahi Double Ka Meetha",
    description: "Traditional Hyderabadi bread pudding made of fried bread slices soaked in saffron milk, cardamoms, and topped with chopped dry fruits.",
    price: 129,
    category: "sweets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    spiciness: 0,
    isVeg: true,
    tags: ["Hyderabadi Shahi", "Dry Fruits"],
    rating: 4.8,
    reviewsCount: 1200,
    isChefSpecial: true
  },
  {
    id: "sw3",
    name: "Traditional Kalakand",
    description: "Grated slow-reduced sweetened cottage cheese and milk dessert flavored with green cardamom and dry fruit slices.",
    price: 149,
    category: "sweets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    spiciness: 0,
    isVeg: true,
    tags: ["Milk Sweet", "Festive"],
    rating: 4.7,
    reviewsCount: 450
  },
  {
    id: "sw4",
    name: "Sweet Milk Kova",
    description: "Rich reduced solid milk sweet, thick and buttery, prepared traditionally with 100% pure dairy.",
    price: 149,
    category: "sweets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop",
    spiciness: 0,
    isVeg: true,
    tags: ["Authentic Kova", "Heritage Sweet"],
    rating: 4.8,
    reviewsCount: 390
  },

  // --- Snacks ---
  {
    id: "sn1",
    name: "Classic French Fries",
    description: "Golden and crispy potato fries lightly sprinkled with salt and spices. Perfect crunchy snack.",
    price: 119,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
    spiciness: 0,
    isVeg: true,
    tags: ["Crispy", "Potato Snack"],
    rating: 4.6,
    reviewsCount: 820
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    userName: "Sridhar Rao",
    rating: 5,
    date: "July 02, 2026",
    comment: "The Ragi Mudha with Chicken Curry transported me straight to rural Rayalaseema. Absolutely divine, authentic, and spicy!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    orderedItems: ["Ragi Mudha with Chicken Curry", "Telangana Chicken Curry"]
  },
  {
    id: "rev2",
    userName: "Meera Krishnan",
    rating: 5,
    date: "June 28, 2026",
    comment: "The Hyderabadi Chicken Dum Biryani has the perfect balance of spices. The grains of rice are separate, flavorful, and the meat is fall-off-the-bone tender. And finishing with Double Ka Meetha is a must!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    orderedItems: ["Hyderabadi Chicken Dum Biryani", "Shahi Double Ka Meetha"]
  },
  {
    id: "rev3",
    userName: "Rahul Verma",
    rating: 5,
    date: "June 15, 2026",
    comment: "Excellent cloud kitchen setup. The food arrives piping hot with incredible aroma. Bagara rice and Telangana chicken curry are top notch!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    orderedItems: ["Telangana Style Bagara Rice", "Telangana Chicken Curry"]
  }
];

export const STATS = [
  { value: "4.9★", label: "Average Rating", description: "From over 5,000+ happy families" },
  { value: "35k+", label: "Bulk Orders Done", description: "Caterings, events & daily kitchen pickups" },
  { value: "24+", label: "Secret Spices", description: "Sourced directly from Guntur & Kerala" },
  { value: "100%", label: "Pure Devotion", description: "Prepared with clarified cow ghee" }
];

export const FAQS = [
  {
    question: "Is this a dine-in restaurant?",
    answer: "No, Praneeth's Kitchen operates strictly as a premium Cloud Kitchen. We focus entirely on high-quality home deliveries, express kitchen pickups, and large bulk catering orders for your special events."
  },
  {
    question: "How do I place a bulk or catering order?",
    answer: "You can use our 'Bulk Orders & Catering' tab to specify your date, time, and menu. You can order items in Kgs (ideal for Biryani and curries) or specify the total number of members/guests, and our chefs will estimate and handle everything!"
  },
  {
    question: "Do you offer pure vegetarian preparations?",
    answer: "Yes, absolutely! We strictly maintain separate kitchen spaces, cutting tools, and preparation utensils for our pure vegetarian items to guarantee complete culinary integrity."
  },
  {
    question: "How do you manage spice levels?",
    answer: "We categorize spice levels from 0 to 3. However, you can completely customize the heat of your curries and pulaos while ordering using our smart customization panel in the online bag."
  }
];
