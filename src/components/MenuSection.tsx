/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Flame, Compass, CircleDot, Sparkles, Soup, Zap, 
  Cookie, UtensilsCrossed, Star, Plus, Minus, Check, HelpCircle 
} from "lucide-react";
import { CATEGORIES, MENU_ITEMS } from "../data";
import { MenuItem, CartItem } from "../types";

// Dynamic Icon Mapper helper
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Flame: Flame,
  Compass: Compass,
  CircleDot: CircleDot,
  Sparkles: Sparkles,
  Soup: Soup,
  Zap: Zap,
  Cookie: Cookie,
  UtensilsCrossed: UtensilsCrossed
};

interface MenuSectionProps {
  onAddItem: (item: MenuItem, quantity: number, instructions?: string) => void;
  onUpdateCartQuantity: (itemId: string, change: number) => void;
  cart: CartItem[];
}

export default function MenuSection({ onAddItem, onUpdateCartQuantity, cart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [spiceFilter, setSpiceFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");

  // Advanced Item Customization state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customSpice, setCustomSpice] = useState<number>(2);
  const [extraToppings, setExtraToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>("");

  // Memoized filter logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchVeg = vegFilter === "all" || 
                       (vegFilter === "veg" && item.isVeg) || 
                       (vegFilter === "nonveg" && !item.isVeg);
      const matchSpice = spiceFilter === null || item.spiciness === spiceFilter;

      return matchCategory && matchSearch && matchVeg && matchSpice;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // Default Popularity
    });
  }, [selectedCategory, searchQuery, vegFilter, spiceFilter, sortBy]);

  // Helper to find item quantity in active cart
  const getItemCartQuantity = (itemId: string) => {
    const found = cart.find(c => c.menuItem.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomSpice(item.spiciness);
    setExtraToppings([]);
    setSpecialInstructions("");
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    
    // Add custom toppings description to instructions
    let finalInstructions = specialInstructions;
    if (extraToppings.length > 0) {
      const toppingsText = `Add-ons: ${extraToppings.join(", ")}`;
      finalInstructions = finalInstructions ? `${toppingsText} | ${finalInstructions}` : toppingsText;
    }

    onAddItem(customizingItem, 1, finalInstructions);
    setCustomizingItem(null);
  };

  return (
    <section className="bg-cream py-16 sm:py-24 border-b border-gold/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <p className="text-gold font-mono font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" /> Epicurean Treasures
          </p>
          <h2 className="font-serif-elegant font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Explore Praneeth’s Culinary Grid
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          <p className="text-neutral-600 font-sans text-sm sm:text-base">
            From clay ovens and slow-cooked copper pots, discover our legendary regional specialties. Filter by dietary choice, heat level, or scan the complete collection.
          </p>
        </div>

        {/* Search & Sorting Panel */}
        <div className="bg-cream-light border border-gold/20 rounded-2xl p-4 sm:p-6 shadow-md mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gold-muted" />
              </span>
              <input
                type="text"
                placeholder="Search Biryanis, Ragi Mudha, Sweets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-cream border border-gold/30 rounded-xl text-sm text-charcoal placeholder-neutral-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 font-medium"
              />
            </div>

            {/* Veg/Non-Veg Toggles */}
            <div className="flex bg-cream p-1 rounded-xl border border-gold/20 md:col-span-3">
              <button
                onClick={() => setVegFilter("all")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                  vegFilter === "all" ? "bg-charcoal text-gold shadow" : "text-neutral-500 hover:text-charcoal"
                }`}
              >
                All Food
              </button>
              <button
                onClick={() => setVegFilter("veg")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  vegFilter === "veg" ? "bg-green-700/10 text-green-700 border border-green-600/20" : "text-neutral-500 hover:text-green-600"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-600" />
                Pure Veg
              </button>
              <button
                onClick={() => setVegFilter("nonveg")}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  vegFilter === "nonveg" ? "bg-red-700/10 text-red-700 border border-red-600/20" : "text-neutral-500 hover:text-red-600"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-600" />
                Non-Veg
              </button>
            </div>

            {/* Sorting Selector */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-cream border border-gold/30 rounded-xl text-sm text-charcoal font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              >
                <option value="popular">Sort by: Popularity</option>
                <option value="rating">Sort by: Top Rated (★)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Quick Heat Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gold/10">
            <span className="text-xs font-bold text-gold-dark uppercase tracking-wider">Heat Level:</span>
            <button
              onClick={() => setSpiceFilter(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                spiceFilter === null ? "bg-charcoal text-gold border border-gold" : "bg-cream-dark text-neutral-600 hover:bg-cream-dark/80"
              }`}
            >
              All Spice
            </button>
            {[0, 1, 2, 3].map((level) => (
              <button
                key={level}
                onClick={() => setSpiceFilter(level)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                  spiceFilter === level ? "bg-gold text-charcoal font-bold" : "bg-cream-dark text-neutral-600 hover:bg-cream-dark/80"
                }`}
              >
                {level === 0 ? "Non-Spicy" : `${"🌶️".repeat(level)}`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Symmetrical Navigation Tabs */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-none flex items-center gap-3 sm:gap-4 scroll-smooth">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-3.5 rounded-none border-2 font-serif-elegant font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-3 shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-charcoal text-gold border-gold shadow-md"
                : "bg-cream-light text-neutral-600 border-gold/30 hover:border-charcoal"
            }`}
          >
            <UtensilsCrossed className="h-5 w-5" />
            Full Menu
          </button>

          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.iconName] || HelpCircle;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3.5 rounded-none border-2 font-serif-elegant font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-3 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-charcoal text-gold border-gold shadow-md"
                    : "bg-cream-light text-neutral-600 border-gold/30 hover:border-charcoal"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-gold" : "text-gold-muted"}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* active category description strip */}
        {selectedCategory !== "all" && (
          <div className="mb-10 bg-gradient-to-r from-charcoal to-charcoal-light text-cream rounded-xl p-6 border border-gold/30 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-gold font-mono uppercase text-xs tracking-widest font-bold">Category Highlights</span>
              <h3 className="font-serif-elegant font-bold text-2xl text-cream">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name} Section
              </h3>
              <p className="text-neutral-300 text-sm max-w-xl leading-relaxed">
                {CATEGORIES.find(c => c.id === selectedCategory)?.description}
              </p>
            </div>
            <img
              src={CATEGORIES.find(c => c.id === selectedCategory)?.highlightImage}
              alt={selectedCategory}
              className="w-40 h-24 object-cover rounded-lg border border-gold/30"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Menu Grid Container */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-cream-light rounded-3xl border border-dashed border-gold/25 max-w-lg mx-auto p-8">
            <HelpCircle className="h-16 w-16 text-gold-muted mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif-elegant text-xl font-bold text-charcoal">No Dishes Found</h3>
            <p className="text-neutral-500 text-sm mt-2">
              We couldn't find any dishes matching those filters. Try searching for something else or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setVegFilter("all");
                setSpiceFilter(null);
                setSelectedCategory("all");
              }}
              className="mt-6 px-5 py-2.5 bg-charcoal text-gold font-semibold text-xs uppercase tracking-wider rounded-lg border border-gold/40 hover:bg-charcoal-light transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const quantityInCart = getItemCartQuantity(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-cream-light border border-gold hover:border-charcoal overflow-hidden shadow-none transition-all duration-300 flex flex-col group relative rounded-none"
                  >
                    
                    {/* Chef Special Tag */}
                    {item.isChefSpecial && (
                      <span className="absolute top-4 left-4 z-10 bg-gold text-charcoal font-serif-elegant font-bold text-[9px] tracking-widest uppercase px-3 py-1 border border-charcoal flex items-center gap-1 rounded-none shadow">
                        <Sparkles className="h-3 w-3 fill-charcoal text-charcoal" />
                        Chef's Special
                      </span>
                    )}

                    {/* Veg/Non-veg Dot icon */}
                    <span className="absolute top-4 right-4 z-10 p-1.5 bg-cream-light/95 backdrop-blur border border-gold/40 flex items-center justify-center rounded-none">
                      <span className={`w-3 h-3 rounded-none ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"} />
                    </span>

                    {/* Image Area with Zoom */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                      
                      {/* Cost Overlay */}
                      <span className="absolute bottom-4 right-4 bg-charcoal text-gold font-mono font-bold text-base px-3 py-1 border-2 border-gold rounded-none">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2">
                        {/* Rating & Spice */}
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <span className="flex items-center gap-1 bg-gold/10 text-gold-dark px-2 py-0.5 rounded font-bold font-mono">
                            <Star className="h-3 w-3 fill-gold text-gold" />
                            {item.rating} ({item.reviewsCount})
                          </span>
                          
                          {item.spiciness > 0 && (
                            <span className="font-medium text-red-600 flex items-center gap-0.5">
                              {Array.from({ length: item.spiciness }).map((_, i) => (
                                <span key={i}>🌶️</span>
                              ))}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-serif-elegant font-bold text-xl text-charcoal group-hover:text-gold-dark transition-colors duration-200">
                          {item.name}
                        </h4>

                        {/* Description */}
                        <p className="text-neutral-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-cream-dark text-neutral-700 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Add Actions */}
                      <div className="pt-4 border-t border-gold/15 flex items-center justify-between gap-3">
                        {quantityInCart > 0 ? (
                          <div className="flex items-center bg-charcoal border border-gold rounded-none w-full justify-between p-1">
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, -1)}
                              className="p-2 text-gold hover:text-cream transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-cream font-mono font-bold text-sm">
                              {quantityInCart} added
                            </span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, 1)}
                              className="p-2 text-gold hover:text-cream transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenCustomizer(item)}
                            className="w-full py-2.5 bg-cream-light hover:bg-charcoal text-charcoal hover:text-gold font-sans font-bold text-xs uppercase tracking-widest rounded-none border border-charcoal transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <Plus className="h-3.5 w-3.5 text-gold" /> Add to Order
                          </button>
                        )}
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Item Customization Modal Dialog */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-cream-light border-2 border-charcoal rounded-none overflow-hidden shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <span className="text-gold font-mono uppercase text-[10px] tracking-widest font-bold">Customize Plate</span>
                  <h3 className="font-serif-elegant font-bold text-2xl text-charcoal">{customizingItem.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${customizingItem.isVeg ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {customizingItem.isVeg ? "Veg" : "Non-Veg"}
                </span>
              </div>

              {/* Item Thumbnail */}
              <div className="aspect-[16/9] rounded-none overflow-hidden bg-cream-dark mb-6 border border-gold">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-6">
                {/* 1. Heat Level Override */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Choose Spiciness Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { l: 0, n: "Mild / Non" },
                      { l: 1, n: "Medium" },
                      { l: 2, n: "Hot 🌶️" },
                      { l: 3, n: "Fiery 🌶️🌶️" }
                    ].map((opt) => (
                      <button
                        key={opt.l}
                        type="button"
                        onClick={() => setCustomSpice(opt.l)}
                        className={`py-2 text-[11px] font-bold rounded-none border transition-all uppercase tracking-wider ${
                          customSpice === opt.l
                            ? "bg-charcoal text-gold border-gold"
                            : "bg-cream text-neutral-600 border-gold/20 hover:border-gold/40"
                        }`}
                      >
                        {opt.n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Premium Add-ons */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Extra Chef Touch (Add-Ons)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Extra Pure Organic Ghee (+₹29)",
                      "Roasted Whole Cashews (+₹39)",
                      "Saffron Fried Onion Garnish (+₹19)",
                      "Sliced Spicy Green Chilies (+₹9)"
                    ].map((addon) => {
                      const isSelected = extraToppings.includes(addon);
                      return (
                        <button
                          key={addon}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setExtraToppings(extraToppings.filter(t => t !== addon));
                            } else {
                              setExtraToppings([...extraToppings, addon]);
                            }
                          }}
                          className={`p-2.5 text-xs font-semibold rounded-none border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? "bg-gold/10 text-gold-dark border-gold"
                              : "bg-cream text-neutral-600 border-gold/20 hover:border-gold/40"
                          }`}
                        >
                          <span>{addon}</span>
                          {isSelected && <Check className="h-3 w-3 text-gold-dark font-bold shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Cooking Instructions */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Special Cooking Requests</label>
                  <textarea
                    placeholder="E.g., No salt, extra coriander, make it dry, pack cutlery, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={2}
                    className="w-full p-3 bg-cream border border-gold/30 rounded-none text-sm text-charcoal focus:outline-none focus:border-gold transition-all"
                  />
                </div>

                {/* Confirm Action Button */}
                <div className="pt-4 border-t border-gold/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setCustomizingItem(null)}
                    className="px-5 py-3 text-neutral-500 hover:text-charcoal text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmCustomization}
                    className="flex-1 py-3 bg-charcoal hover:bg-cream hover:text-charcoal text-gold font-sans font-bold text-xs uppercase tracking-widest rounded-none border-2 border-charcoal transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Add Custom Plate • ₹{customizingItem.price}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
