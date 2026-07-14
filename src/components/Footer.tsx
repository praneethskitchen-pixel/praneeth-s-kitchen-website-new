/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  UtensilsCrossed, Phone, Mail, MapPin, Sparkles, 
  Clock, Heart, ShieldAlert
} from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream border-t-2 border-gold relative overflow-hidden">
      
      {/* Decorative Gold Saffron Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Primary Footer Links Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand area */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cream text-charcoal rounded-full border border-gold">
                <UtensilsCrossed className="h-5 w-5 text-gold-dark" />
              </div>
              <div>
                <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-gold block leading-none mb-1">Est. 2024</span>
                <h4 className="font-serif-elegant font-bold text-lg tracking-tight text-cream uppercase leading-none">
                  PRANEETH'S KITCHEN
                </h4>
              </div>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
              Praneeth’s Kitchen is an elite, saffron-certified premium Cloud Kitchen brand bringing together the traditional slow-cook practices of Hyderabad and Rayalaseema. We prepare our dishes with 100% pure ghee and fresh local spices.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gold font-mono">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" /> Pure Devotion, Gold Standards.
            </div>
          </div>

          {/* Opening timings */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif-elegant font-bold text-sm uppercase tracking-wider text-gold">Kitchen Hours</h5>
            <div className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans">
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-gold-muted shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-cream">Every Day Service</p>
                  <p className="text-neutral-400">11:00 AM - 11:30 PM</p>
                  <p className="text-[10px] text-gold/70 mt-0.5">Kitchen orders close at 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Sparkles className="h-4 w-4 text-gold-muted shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-cream">Royal Dinner Feast</p>
                  <p className="text-neutral-400">07:00 PM - 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact info */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif-elegant font-bold text-sm uppercase tracking-wider text-gold">Contact & Support</h5>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-gold-muted shrink-0 mt-0.5" />
                <span>
                  108 Saffron Golden Boulevard, Jubilee Hills Road No. 36, Hyderabad, TS, 500033
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-muted shrink-0" />
                <span className="font-mono">+91 40 4888 1234</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-muted shrink-0" />
                <span className="font-mono">reservations@praneethskitchen.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Shortcuts */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif-elegant font-bold text-sm uppercase tracking-wider text-gold">Explore</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400 font-medium font-sans">
              <li>
                <button onClick={() => setActiveTab("home")} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Home Story
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("menu")} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Our Menu Grid
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("reserve")} className="hover:text-gold transition-colors text-left cursor-pointer">
                  Bulk Orders
                </button>
              </li>
              <li>
                <span className="text-[10px] text-gold-muted border border-gold/20 px-2 py-0.5 rounded-none uppercase font-mono block w-fit mt-2">
                  Hyderabad
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Strip */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-sans">
          <p className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span>© {currentYear} Praneeth’s Kitchen. All rights reserved.</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Service Guidelines</span>
            <span className="flex items-center gap-1 text-gold-muted">
              <Heart className="h-3.5 w-3.5 text-gold fill-gold" /> Handcrafted with Ghee
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
