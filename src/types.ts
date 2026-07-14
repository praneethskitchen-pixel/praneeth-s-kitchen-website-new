/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spiciness: 0 | 1 | 2 | 3; // 0 = None, 1 = Mild, 2 = Medium, 3 = Extra Spicy
  isVeg: boolean;
  tags: string[];
  rating: number;
  reviewsCount: number;
  isChefSpecial?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  highlightImage: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSpiceOverride?: number;
  specialInstructions?: string;
}

export interface TableReservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: "standard" | "outdoor" | "royal-gold-salon" | "window-side";
  notes?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  orderedItems: string[];
}
