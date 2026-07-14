/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Utensils, Award, ShieldCheck, Heart } from "lucide-react";
import { STATS } from "../data";

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

const FEATURE_DISHES = [
  {
    name: "Classic Chicken Dum Biryani",
    tagline: "Saffron infused basmati with slow-steamed country spices",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
    category: "Biryanis"
  },
  {
    name: "Ragi Mudha & Nattu Kodi Pulusu",
    tagline: "Authentic, rustic Rayalaseema millet balls in fiery chicken broth",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800&auto=format&fit=crop",
    category: "Ragi Mudha"
  },
  {
    name: "Shahi Double Ka Meetha",
    tagline: "Golden fried bread soaked in saffron-infused thickened cream",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop",
    category: "Sweets"
  }
];

export default function Hero({ onExploreMenu, onBookTable }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FEATURE_DISHES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream py-12 lg:py-20 border-b border-gold/10">
      
      {/* Absolute Decorative Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text/Typography Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.3em] uppercase font-sans text-gold font-bold mx-auto lg:mx-0 block"
            >
              ★ Symphony of Spices ★
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="font-serif-elegant font-bold text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight tracking-tight">
                Where Heritage <br className="hidden sm:inline" />
                Meets <span className="italic text-gold font-serif-elegant font-normal">Gold Standard</span> Taste
              </h2>
              <p className="text-neutral-700 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto lg:mx-0">
                Experience the authentic legacy of <strong className="text-charcoal font-semibold">Praneeth's Kitchen</strong>. We are a premium Cloud Kitchen crafting unforgettable flavors, from slow-dum Biryanis and Telangana Bagara Rice to nutritious Ragi Mudha combos, rich curries, snacks, and traditional sweets. Perfect for home delivery and bulk caterings!
              </p>
            </motion.div>

            {/* Quick CTAs */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 bg-charcoal hover:bg-transparent hover:text-charcoal text-cream font-serif-elegant font-bold text-sm tracking-widest rounded-full border border-charcoal transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group uppercase"
              >
                Explore Culinary Menu
                <ArrowRight className="h-4 w-4 text-gold group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onBookTable}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-charcoal hover:text-cream text-charcoal font-serif-elegant font-bold text-sm tracking-widest rounded-full border border-charcoal transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                Catering & Bulk Orders
              </button>
            </motion.div>

            {/* Core Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-gold/15 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                <Utensils className="h-4 w-4 text-gold shrink-0" />
                <span>100% Fresh Ghee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                <Award className="h-4 w-4 text-gold shrink-0" />
                <span>Authentic Dum</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span>Hygiene Certified</span>
              </div>
            </motion.div>

          </div>

          {/* Right Showcase Column (Animated Interactive Slider) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square p-2 bg-cream border-2 border-charcoal shadow-md">
              
              {/* Outer Golden Accents */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-dashed border-gold/40 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full relative overflow-hidden group"
                >
                  <img
                    src={FEATURE_DISHES[activeSlide].image}
                    alt={FEATURE_DISHES[activeSlide].name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Saffron Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal-light/10 opacity-70" />

                  {/* Slide details */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-cream">
                    <span className="inline-block px-2.5 py-1 bg-gold text-charcoal font-mono font-bold text-[10px] tracking-widest uppercase rounded mb-2.5">
                      {FEATURE_DISHES[activeSlide].category}
                    </span>
                    <h3 className="font-serif-elegant font-bold text-xl sm:text-2xl text-cream tracking-wide">
                      {FEATURE_DISHES[activeSlide].name}
                    </h3>
                    <p className="text-gold-light/90 text-xs sm:text-sm mt-1.5 font-sans leading-relaxed">
                      {FEATURE_DISHES[activeSlide].tagline}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {FEATURE_DISHES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? "w-8 bg-gold" : "w-2.5 bg-gold/40 hover:bg-gold/70"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 bg-charcoal text-cream rounded-none p-6 sm:p-10 border-2 border-gold shadow-md relative overflow-hidden">
          {/* Saffron Glowing Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold/50" />
          
          {STATS.map((stat, i) => (
            <div key={i} className="text-center space-y-1 relative border-r last:border-r-0 border-gold/20 px-2">
              <p className="font-serif-elegant font-bold text-3xl sm:text-4xl text-gold">{stat.value}</p>
              <p className="font-semibold text-xs sm:text-sm text-cream uppercase tracking-wider">{stat.label}</p>
              <p className="text-[10px] sm:text-xs text-neutral-400 font-sans">{stat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
