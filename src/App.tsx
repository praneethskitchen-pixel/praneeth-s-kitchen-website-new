/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import OrderCart from "./components/OrderCart";
import ReservationSection from "./components/ReservationSection";
import Footer from "./components/Footer";
import { MenuItem, CartItem } from "./types";
import { REVIEWS, FAQS } from "./data";
import { 
  Sparkles, ChefHat, Heart, Star, Quote, ArrowRight, ShieldCheck, Soup
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Shopping Cart Managers
  const handleAddItemToCart = (item: MenuItem, quantity: number, instructions?: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (c) => c.menuItem.id === item.id && c.specialInstructions === instructions
      );
      
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { menuItem: item, quantity, specialInstructions: instructions }];
      }
    });
    // Auto-open order bag for pleasant feedback
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((c) => {
          if (c.menuItem.id === itemId) {
            const nextQty = c.quantity + change;
            return { ...c, quantity: nextQty };
          }
          return c;
        })
        .filter((c) => c.quantity > 0);
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col font-sans antialiased border-8 md:border-[12px] border-charcoal">
      
      {/* 1. Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* 2. Main Tabbed Content routing */}
      <main className="flex-grow">
        {activeTab === "home" && (
          <div className="space-y-0">
            
            {/* Banner Section */}
            <Hero
              onExploreMenu={() => setActiveTab("menu")}
              onBookTable={() => setActiveTab("reserve")}
            />

            {/* Chef's Signature Heritage Block */}
            <section className="py-16 sm:py-24 bg-cream-light border-b border-gold/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Traditional Kitchen Visuals */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-square max-w-[380px] mx-auto rounded-3xl overflow-hidden p-2.5 bg-cream border border-gold/40 shadow-xl gold-border-glow">
                      <img
                        src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop"
                        alt="Authentic Ghee Simmering"
                        className="w-full h-full object-cover rounded-2xl"
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Ghee badge */}
                      <div className="absolute -bottom-4 -right-4 bg-charcoal border border-gold text-gold rounded-2xl p-4 shadow-2xl max-w-[180px] space-y-1">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider block text-gold-light">CULINARY STANDARD</span>
                        <p className="font-serif-elegant font-bold text-xs leading-snug">Prepared using 100% Pure Cow Ghee & Raw Spices.</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Culinary Narrative */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <p className="text-gold font-mono font-bold text-xs uppercase tracking-[0.25em] flex items-center gap-1.5">
                        <ChefHat className="h-4 w-4" /> Message From Praneeth
                      </p>
                      <h3 className="font-serif-elegant font-bold text-3xl sm:text-4xl text-charcoal">
                        Heritage Cooked on a Slow Flame
                      </h3>
                      <div className="w-16 h-1 bg-gold rounded-full" />
                    </div>

                    <div className="space-y-4 text-neutral-600 text-sm sm:text-base leading-relaxed">
                      <p>
                        Welcome to <strong className="text-charcoal font-semibold">PRANEETH'S KITCHEN</strong>. Our culinary philosophy centers on unconditional dedication to heritage cooking. We believe that true South Indian and Hyderabadi flavors cannot be rushed. 
                      </p>
                      <p>
                        Our <strong className="text-charcoal font-semibold">Biryanis</strong> are layered in raw heavy brass pots and slow-steamed under weight, allowing the saffron and local spices to infuse the meat to its core. Our signature <strong className="text-charcoal font-semibold">Ragi Mudha</strong> is hand-kneaded from premium local finger millet flour, retaining its high-protein mineral integrity, served with fiery country fowl stews.
                      </p>
                      <p>
                        Whether you are indulging in our crispy star pepper <strong className="text-charcoal font-semibold">Fries</strong>, enjoying warm oven puffs from our <strong className="text-charcoal font-semibold">Bakery</strong> section, or celebrating with our legendary ghee-soaked <strong className="text-charcoal font-semibold">Sweets</strong>, every plate represents a timeless family secret.
                      </p>
                    </div>

                    {/* Signature Line */}
                    <div className="pt-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-charcoal rounded-full border border-gold flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-serif-elegant font-bold text-lg text-charcoal leading-none">Praneeth Madugula</p>
                        <p className="text-xs text-gold-dark font-mono mt-1 font-semibold uppercase tracking-wider">Founder & Master Culinary Artisan</p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* Featured Categories Quick Launcher */}
            <section className="py-16 sm:py-20 bg-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-2">
                  <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] font-bold">Menu Highlights</p>
                  <h3 className="font-serif-elegant font-bold text-2xl sm:text-3xl text-charcoal">Our Premium Food Pillars</h3>
                  <div className="w-12 h-0.5 bg-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Gourmet Biryanis",
                      desc: "Layered saffron basmati with slow-cooked meat",
                      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop"
                    },
                    {
                      name: "Traditional Ragi Mudha",
                      desc: "Nutritious village millet spheres with heavy country gravy",
                      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=400&auto=format&fit=crop"
                    },
                    {
                      name: "Spiced Appetizers",
                      desc: "Crispy Chicken 65 and tawa Nellore pepper fish fries",
                      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400&auto=format&fit=crop"
                    },
                    {
                      name: "Shahi Dessert Craft",
                      desc: "Rich Double Ka Meetha and chilled tender coconut payasam",
                      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop"
                    }
                  ].map((pill, i) => (
                    <div 
                      key={i} 
                      className="group bg-cream-light border border-gold hover:border-charcoal p-4 transition-all duration-300 cursor-pointer"
                      onClick={() => setActiveTab("menu")}
                    >
                      <div className="aspect-[4/3] overflow-hidden mb-3.5 bg-cream-dark">
                        <img 
                          src={pill.image} 
                          alt={pill.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="font-serif-elegant font-bold text-base text-charcoal flex items-center justify-between">
                        {pill.name}
                        <ArrowRight className="h-4 w-4 text-gold group-hover:text-gold transition-colors" />
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{pill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Guest Reviews & Feedback Testimonials */}
            <section className="py-16 sm:py-24 bg-cream-light border-b border-gold/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center space-y-2">
                  <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] font-bold">Client Praises</p>
                  <h3 className="font-serif-elegant font-bold text-2xl sm:text-3xl text-charcoal">Lauded by Gourmet Connoisseurs</h3>
                  <div className="w-12 h-0.5 bg-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="bg-cream-light border border-gold p-6 sm:p-8 flex flex-col justify-between space-y-6 relative rounded-none">
                      <Quote className="absolute top-6 right-6 h-8 w-8 text-gold/10 fill-gold/5" />
                      
                      <div className="space-y-4">
                        {/* Rating stars */}
                        <div className="flex gap-1">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <p className="text-neutral-700 text-xs sm:text-sm italic leading-relaxed">
                          "{rev.comment}"
                        </p>
                      </div>

                      {/* Reviewer Details */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                        <img
                          src={rev.avatar}
                          alt={rev.userName}
                          className="w-10 h-10 rounded-full border border-gold/30 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-serif-elegant font-bold text-sm text-charcoal">{rev.userName}</p>
                          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{rev.date}</p>
                          
                          {/* Tags of ordered foods */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {rev.orderedItems.map((f, idx) => (
                              <span key={idx} className="text-[8px] bg-gold/10 text-gold-dark font-semibold px-1.5 py-0.5 rounded-none border border-gold/20">
                                {f}
                              </span>
                            ))}
                          </div>

                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Collapsible FAQ Accordion Section */}
            <section className="py-16 sm:py-24 bg-cream">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center space-y-2">
                  <p className="text-gold font-mono text-xs uppercase tracking-[0.2em] font-bold">Got Questions?</p>
                  <h3 className="font-serif-elegant font-bold text-2xl sm:text-3xl text-charcoal">Culinary Inquiries & Answers</h3>
                  <div className="w-12 h-0.5 bg-gold mx-auto" />
                </div>

                <div className="space-y-4">
                  {FAQS.map((faq, idx) => {
                    const isOpen = faqOpenIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className="bg-cream-light border border-gold/20 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                          className="w-full p-5 text-left font-serif-elegant font-bold text-base sm:text-lg text-charcoal hover:text-gold-dark flex items-center justify-between gap-4 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <span className="text-gold font-mono font-bold text-xl leading-none">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-600 border-t border-gold/10 leading-relaxed font-sans">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

          </div>
        )}

        {activeTab === "menu" && (
          <MenuSection
            onAddItem={handleAddItemToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            cart={cart}
          />
        )}

        {activeTab === "reserve" && (
          <ReservationSection />
        )}
      </main>

      {/* 3. Sliding Order Cart Panel Drawer */}
      <OrderCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* 4. Global Footer block */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
