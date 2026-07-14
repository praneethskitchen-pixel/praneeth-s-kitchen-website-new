/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UtensilsCrossed, ShoppingBag, Calendar, Sparkles, BookOpen, Clock, Phone } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, openCart }: HeaderProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "menu", label: "Our Menu", icon: BookOpen },
    { id: "reserve", label: "Bulk Orders", icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-gold/40 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo Brand Area */}
          <div 
            onClick={() => setActiveTab("home")} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 sm:p-2.5 bg-charcoal rounded-full border border-gold shadow-md group-hover:scale-105 transition-transform duration-300">
              <UtensilsCrossed className="h-5 sm:h-6 w-5 sm:h-6 text-gold" />
            </div>
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-gold block leading-none mb-1">Est. 2024</span>
              <h1 className="font-serif-elegant font-bold text-lg sm:text-xl tracking-tight text-charcoal uppercase leading-none">
                PRANEETH'S KITCHEN
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] font-sans transition-all duration-300 flex items-center gap-1.5 border-b-2 ${
                    isActive
                      ? "text-gold border-gold"
                      : "text-charcoal border-transparent hover:text-gold"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Timing Hint */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-charcoal-light border-r border-gold/20 pr-4">
              <Clock className="h-4 w-4 text-gold-muted" />
              <div>
                <p className="font-semibold text-[11px] uppercase tracking-wider text-gold-dark">Open Daily</p>
                <p className="text-[11px] font-medium font-mono">11:00 AM - 11:30 PM</p>
              </div>
            </div>

            {/* Simulated Checkout Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 sm:p-3 bg-charcoal hover:bg-charcoal-light text-cream rounded-full border border-gold transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center cursor-pointer group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="h-5 sm:h-6 w-5 sm:h-6 text-gold group-hover:rotate-12 transition-transform" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal font-bold text-xs font-mono h-5 sm:h-5.5 w-5 sm:w-5.5 rounded-full flex items-center justify-center border border-charcoal animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order by Call Call-to-action */}
            <a
              href="tel:+919876543210"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-charcoal border-2 border-gold text-gold rounded-full text-[10px] uppercase tracking-widest hover:bg-cream hover:text-charcoal hover:border-charcoal transition-all duration-300 font-sans font-bold shadow-md cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 animate-pulse text-gold group-hover:text-charcoal" />
              <span>Call to Order</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
