/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Mail, Phone, Calendar, Clock, Sparkles, 
  MapPin, Check, Info, Award, ShoppingBag, ArrowRight,
  Printer, Trash2, Flame, Heart, Star
} from "lucide-react";
import { MENU_ITEMS } from "../data";

export default function ReservationSection() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    deliveryType: "delivery", // "delivery" (Catering Delivery) or "pickup" (Kitchen Pickup)
    deliveryAddress: "",
    selectedItemId: "b1", // Default to Hyderabadi Chicken Dum Biryani
    pricingBasis: "kgs", // "kgs" or "members"
    quantity: 5, // Default 5 Kgs or 20 Members
    addonItemId: "", // Optional addon
    specialInstructions: ""
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedCatering, setConfirmedCatering] = useState<any | null>(null);

  // Auto-adjust quantity based on selection basis for standard defaults
  const handleBasisChange = (basis: string) => {
    setFormData(prev => ({
      ...prev,
      pricingBasis: basis,
      quantity: basis === "kgs" ? 5 : 25
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Pricing calculations
  const selectedItem = MENU_ITEMS.find(item => item.id === formData.selectedItemId) || MENU_ITEMS[0];
  const addonItem = MENU_ITEMS.find(item => item.id === formData.addonItemId);

  // Calculate prices dynamically
  const calculateEstimate = () => {
    let mainItemCost = 0;
    const basePrice = selectedItem.price;

    if (formData.pricingBasis === "kgs") {
      // 1 Kg corresponds to roughly 2.2 times the single portion price (wholesale discount)
      const pricePerKg = Math.round(basePrice * 2.2);
      mainItemCost = pricePerKg * formData.quantity;
    } else {
      // Per member / plate calculations
      const totalPlates = formData.quantity;
      let discount = 0;
      if (totalPlates >= 100) discount = 0.15; // 15% discount
      else if (totalPlates >= 50) discount = 0.10; // 10% discount
      
      mainItemCost = Math.round(basePrice * totalPlates * (1 - discount));
    }

    let addonCost = 0;
    if (addonItem) {
      if (formData.pricingBasis === "kgs") {
        const addonPricePerKg = Math.round(addonItem.price * 2.2);
        addonCost = addonPricePerKg * Math.ceil(formData.quantity * 0.5); // assume 50% ratio for sweet/starter addons in weight
      } else {
        const totalPlates = formData.quantity;
        let discount = 0;
        if (totalPlates >= 100) discount = 0.15;
        else if (totalPlates >= 50) discount = 0.10;
        addonCost = Math.round(addonItem.price * totalPlates * 0.8 * (1 - discount)); // 20% discount since it is an addon
      }
    }

    const subtotal = mainItemCost + addonCost;
    const deliveryFee = formData.deliveryType === "delivery" ? 250 : 0; // standard catering delivery fee
    const gstTax = Math.round(subtotal * 0.05); // 5% GST for cloud kitchens
    const total = subtotal + deliveryFee + gstTax;

    return {
      mainItemCost,
      addonCost,
      subtotal,
      deliveryFee,
      gstTax,
      total,
      servings: formData.pricingBasis === "kgs" ? formData.quantity * 4 : formData.quantity
    };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      alert("Please complete the required booking credentials.");
      return;
    }
    if (formData.deliveryType === "delivery" && !formData.deliveryAddress) {
      alert("Please specify the delivery address for your catering.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API response
    setTimeout(() => {
      const generatedPasscode = `CATER-PK-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedCatering({
        passcode: generatedPasscode,
        details: { ...formData },
        itemDetails: selectedItem,
        addonDetails: addonItem,
        pricing: estimate
      });
      setIsSubmitting(false);
    }, 1800);
  };

  const handleCancelCatering = () => {
    setConfirmedCatering(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      deliveryType: "delivery",
      deliveryAddress: "",
      selectedItemId: "b1",
      pricingBasis: "kgs",
      quantity: 5,
      addonItemId: "",
      specialInstructions: ""
    });
  };

  return (
    <section className="bg-cream-light py-16 sm:py-24 border-b border-gold/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <p className="text-gold font-mono font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Award className="h-4 w-4 text-gold" /> Cloud Kitchen Catering
          </p>
          <h2 className="font-serif-elegant font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Bulk Catering & Party Orders
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          <p className="text-neutral-600 font-sans text-sm sm:text-base">
            Hosting a party, family event, or a gathering? Select your favorite regional curries, starters, or biryanis and place a bulk order by **Weight (Kgs)** or **Plates (Members)**. We prepare everything fresh under strict hygiene codes.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!confirmedCatering ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Form booking inputs */}
              <div className="lg:col-span-7 bg-cream border border-gold/30 rounded-none p-6 sm:p-10 shadow-none relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
                
                <h3 className="font-serif-elegant font-bold text-2xl text-charcoal mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gold animate-pulse" />
                  Catering Request Form
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Contact Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="E.g., Madugula Manasa"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Email Address (Optional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="E.g., guest@gourmet.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="E.g., +91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal font-mono"
                      />
                    </div>

                    {/* Delivery / Pickup Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Fulfillment Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, deliveryType: "delivery" }))}
                          className={`p-3 text-xs font-semibold rounded-none border transition-all text-center flex items-center justify-center cursor-pointer ${
                            formData.deliveryType === "delivery"
                              ? "bg-charcoal text-gold border-gold font-bold shadow"
                              : "bg-cream-light text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          Catering Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, deliveryType: "pickup" }))}
                          className={`p-3 text-xs font-semibold rounded-none border transition-all text-center flex items-center justify-center cursor-pointer ${
                            formData.deliveryType === "pickup"
                              ? "bg-charcoal text-gold border-gold font-bold shadow"
                              : "bg-cream-light text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          Kitchen Pickup
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.deliveryType === "delivery" && (
                    <div className="space-y-2">
                      <label htmlFor="deliveryAddress" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Delivery Venue Address *
                      </label>
                      <input
                        id="deliveryAddress"
                        type="text"
                        name="deliveryAddress"
                        required
                        placeholder="E.g., Flat 402, Royal Residency, Gachibowli, Hyderabad"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Date */}
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Fulfillment Date *
                      </label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal font-mono"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Fulfillment Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal font-mono"
                      >
                        <option value="">Select Time Slot</option>
                        <option value="12:00 PM">12:00 PM (Lunch)</option>
                        <option value="01:00 PM">01:00 PM (Lunch)</option>
                        <option value="02:00 PM">02:00 PM (Lunch)</option>
                        <option value="07:00 PM">07:00 PM (Dinner)</option>
                        <option value="08:00 PM">08:00 PM (Dinner)</option>
                        <option value="09:00 PM">09:00 PM (Dinner)</option>
                        <option value="10:00 PM">10:00 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Item Selector */}
                  <div className="space-y-2">
                    <label htmlFor="selectedItemId" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                      Choose Primary Bulk Item *
                    </label>
                    <select
                      id="selectedItemId"
                      name="selectedItemId"
                      value={formData.selectedItemId}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal font-medium"
                    >
                      {MENU_ITEMS.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} (Base ₹{item.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-cream-light p-4 border border-gold/20">
                    {/* Pricing Basis Tab selectors */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Order Measurement Unit
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleBasisChange("kgs")}
                          className={`p-2.5 text-xs font-semibold rounded-none border transition-all text-center flex items-center justify-center cursor-pointer ${
                            formData.pricingBasis === "kgs"
                              ? "bg-charcoal text-gold border-gold font-bold shadow"
                              : "bg-cream text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          In Weight (Kgs)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBasisChange("members")}
                          className={`p-2.5 text-xs font-semibold rounded-none border transition-all text-center flex items-center justify-center cursor-pointer ${
                            formData.pricingBasis === "members"
                              ? "bg-charcoal text-gold border-gold font-bold shadow"
                              : "bg-cream text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          In Members (Plates)
                        </button>
                      </div>
                    </div>

                    {/* Quantity Field */}
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                        Quantity ({formData.pricingBasis === "kgs" ? "Kilograms" : "Plates"}) *
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                        className="w-full p-3 bg-cream border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal font-mono font-bold"
                      >
                        {formData.pricingBasis === "kgs" 
                          ? [1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50].map(n => (
                              <option key={n} value={n}>{n} Kg{n > 1 ? "s" : ""} (Serves ~{n * 4})</option>
                            ))
                          : [10, 15, 20, 25, 35, 50, 75, 100, 150, 200, 300, 500].map(n => (
                              <option key={n} value={n}>{n} Plates / Members {n >= 50 ? `(${n >= 100 ? "15" : "10"}% off)` : ""}</option>
                            ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Optional Addon Item Selector */}
                  <div className="space-y-2">
                    <label htmlFor="addonItemId" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                      Choose Optional Add-on (Sweets or Starters)
                    </label>
                    <select
                      id="addonItemId"
                      name="addonItemId"
                      value={formData.addonItemId}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-cream-light border border-gold/30 rounded-none text-sm focus:outline-none focus:border-charcoal font-medium"
                    >
                      <option value="">No Add-on Selected</option>
                      {MENU_ITEMS.filter(item => item.id !== formData.selectedItemId).map((item) => (
                        <option key={item.id} value={item.id}>
                          [{item.category.toUpperCase()}] {item.name} (+₹{item.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-2">
                    <label htmlFor="specialInstructions" className="text-xs font-bold uppercase tracking-wider text-neutral-600 block">
                      Special Preparation Instructions (E.g. Spice levels, Pure ghee, Allergies)
                    </label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Specify spice preference, dietary constraints, or delivery details..."
                      className="w-full p-3 bg-cream-light border border-gold/20 rounded-none text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>

                  {/* Submit catering request */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-charcoal hover:bg-cream hover:text-charcoal text-gold font-sans font-bold text-xs uppercase tracking-widest rounded-none border-2 border-charcoal transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                        Generating Royal Quote...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4.5 w-4.5" />
                        Book Bulk Catering Order • ₹{estimate.total}
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Live Catering Estimator Detail Pane */}
              <div className="lg:col-span-5 bg-cream border border-gold/30 rounded-none p-6 sm:p-8 shadow-none flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-serif-elegant font-bold text-xl text-charcoal flex items-center gap-2 mb-2">
                    <span>Catering Estimate</span>
                    <Sparkles className="h-4 w-4 text-gold fill-gold" />
                  </h4>
                  <p className="text-xs text-neutral-500 leading-normal mb-4">
                    Live valuation and chef advice based on your bulk selections.
                  </p>

                  {/* Estimate detail card */}
                  <div className="bg-charcoal rounded-none border-2 border-gold p-5 relative text-cream space-y-4">
                    <div className="absolute top-0 right-0 p-3">
                      <Flame className="h-5 w-5 text-gold animate-bounce" />
                    </div>

                    <div className="border-b border-gold/20 pb-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold block">Primary Choice</span>
                      <h5 className="font-serif-elegant font-bold text-base text-gold-light mt-0.5">{selectedItem.name}</h5>
                      <p className="text-[11px] text-neutral-400 font-sans mt-1 line-clamp-2">{selectedItem.description}</p>
                    </div>

                    {addonItem && (
                      <div className="border-b border-gold/20 pb-3">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-gold block">Add-on Selection</span>
                        <h5 className="font-serif-elegant font-bold text-xs text-cream mt-0.5">{addonItem.name}</h5>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Catering Basis:</span>
                        <span className="text-gold font-bold uppercase">{formData.pricingBasis === "kgs" ? "Weight (Kgs)" : "Plates"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Ordered Qty:</span>
                        <span className="text-cream font-bold">
                          {formData.quantity} {formData.pricingBasis === "kgs" ? "Kg" : "Plate"}{formData.quantity > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Estimated Servings:</span>
                        <span className="text-cream font-bold">Serves ~{estimate.servings} guests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Fulfillment Mode:</span>
                        <span className="text-cream font-bold capitalize">{formData.deliveryType === "delivery" ? "Delivery to Venue" : "Self-Pickup"}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-dashed border-gold/30 space-y-2">
                      <div className="flex justify-between text-xs text-neutral-300 font-mono">
                        <span>Items Subtotal:</span>
                        <span>₹{estimate.subtotal}</span>
                      </div>
                      {estimate.deliveryFee > 0 && (
                        <div className="flex justify-between text-xs text-neutral-300 font-mono">
                          <span>Catering Delivery:</span>
                          <span>₹{estimate.deliveryFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs text-neutral-300 font-mono">
                        <span>GST Tax (5%):</span>
                        <span>₹{estimate.gstTax}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-gold font-mono pt-1.5 border-t border-gold/10">
                        <span>EST. TOTAL COST:</span>
                        <span>₹{estimate.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro timing detail card */}
                <div className="mt-4 bg-cream-light p-4 rounded-none border border-gold/20 flex items-start gap-3">
                  <Info className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    Bulk orders require a minimum of 24 hours notice for optimal marination and slow-dum processing. Sourced using fresh halal meat, pure ghee, and certified whole spices.
                  </p>
                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              
              {/* --- ROYAL GOLD CATERING PASS DISPLAY --- */}
              <div className="bg-charcoal border-4 border-gold rounded-none p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden text-cream space-y-6">
                
                {/* Symmetrical Tickets Background graphics */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full blur-xl" />

                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-[0.2em] text-gold uppercase block">Fulfillment Scheduled</span>
                  <h3 className="font-serif-elegant font-bold text-2xl sm:text-3xl tracking-wide text-gold-light">
                    Royal Catering Confirmed!
                  </h3>
                  <p className="text-neutral-400 text-xs font-mono">ORDER PASS CODE GENERATED</p>
                </div>

                <div className="w-16 h-[1px] bg-gold/40 mx-auto" />

                {/* Ticket Body details */}
                <div className="bg-cream-light text-charcoal rounded-none p-6 border border-gold/40 space-y-4 max-w-md mx-auto relative overflow-hidden text-left">
                  
                  {/* Subtle Logo Watermark */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gold/10 rounded-full border border-gold/20 flex items-center justify-center select-none rotate-12 pointer-events-none">
                    <span className="font-serif-elegant font-bold text-xs text-gold-dark/40 tracking-widest uppercase">KITCHEN</span>
                  </div>

                  <div className="flex justify-between border-b border-gold/20 pb-3">
                    <div>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">Client Contact</span>
                      <p className="font-serif-elegant font-bold text-base text-charcoal">{confirmedCatering.details.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-neutral-500 uppercase tracking-widest block">Event Date</span>
                      <p className="font-mono text-xs font-bold text-charcoal">{confirmedCatering.details.date}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Scheduled Time:</span>
                      <span className="font-mono font-bold text-charcoal">{confirmedCatering.details.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Contact Phone:</span>
                      <span className="font-mono font-bold text-charcoal">{confirmedCatering.details.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Fulfillment Mode:</span>
                      <span className="font-bold text-charcoal capitalize">{confirmedCatering.details.deliveryType === "delivery" ? "Catering Delivery" : "Kitchen Pickup"}</span>
                    </div>
                    {confirmedCatering.details.deliveryType === "delivery" && (
                      <div className="pt-1 border-t border-dashed border-neutral-200">
                        <span className="text-neutral-500 block">Delivery Venue Address:</span>
                        <p className="font-medium text-neutral-800 mt-0.5">{confirmedCatering.details.deliveryAddress}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-300">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">Catering Menu Items</span>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between font-bold text-neutral-900">
                        <span>1. {confirmedCatering.itemDetails.name}</span>
                        <span>
                          {confirmedCatering.details.quantity} {confirmedCatering.details.pricingBasis === "kgs" ? "Kg" : "Plate"}{confirmedCatering.details.quantity > 1 ? "s" : ""}
                        </span>
                      </div>
                      {confirmedCatering.addonDetails && (
                        <div className="flex justify-between text-neutral-700">
                          <span>2. [Add-on] {confirmedCatering.addonDetails.name}</span>
                          <span>Yes</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed border-gold/30 text-center">
                    <span className="text-[9px] text-neutral-500 block font-mono">ESTIMATED TOTAL QUOTE (GST INC.)</span>
                    <p className="text-xl font-mono font-bold text-charcoal mt-0.5">₹{confirmedCatering.pricing.total}</p>
                  </div>

                  <div className="pt-3 border-t border-dashed border-gold/30 text-center">
                    <span className="text-[9px] text-neutral-500 block font-mono">CATERING INVOICE PASS</span>
                    <span className="font-mono text-charcoal font-bold text-sm tracking-widest bg-gold/10 border border-gold/30 px-3 py-1 rounded-none inline-block mt-1">
                      {confirmedCatering.passcode}
                    </span>
                  </div>

                </div>

                <div className="bg-charcoal-light border-2 border-gold p-5 space-y-3 shadow-lg max-w-md mx-auto text-left">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-gold text-center font-bold">
                    📲 DISPATCH TO KITCHEN COORDINATOR
                  </p>
                  <p className="text-neutral-300 text-xs text-center leading-relaxed">
                    To expedite marination schedules, please dispatch your catering receipt directly to Praneeth's Kitchen via WhatsApp or Email!
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {(() => {
                      const addonText = confirmedCatering.addonDetails ? `\n• Add-on: ${confirmedCatering.addonDetails.name}` : "";
                      const cateringMessage = `*PRANEETH'S KITCHEN - CATERING REQUEST* 👑
========================
*Passcode:* ${confirmedCatering.passcode}
*Client Name:* ${confirmedCatering.details.name}
*Phone:* ${confirmedCatering.details.phone}
*Email:* ${confirmedCatering.details.email}
*Event Date:* ${confirmedCatering.details.date}
*Event Time:* ${confirmedCatering.details.time}
*Fulfillment:* ${confirmedCatering.details.deliveryType.toUpperCase()}
*${confirmedCatering.details.deliveryType === "delivery" ? "Venue Address" : "Pickup Location"}:* ${confirmedCatering.details.deliveryAddress || "Kitchen Pick-up"}

*CATERING DETAILS:*
• Main Feast: ${confirmedCatering.itemDetails.name} (${confirmedCatering.details.quantity} ${confirmedCatering.details.pricingBasis === "kgs" ? "Kgs" : "Plates"})${addonText}

*Estimate Quote:* ₹${confirmedCatering.pricing.total}
========================
Sent via Praneeth's Kitchen Web Portal.`;

                      const whatsappUrl = `https://wa.me/919154668077?text=${encodeURIComponent(cateringMessage)}`;
                      const emailSubject = `New Catering Request: ${confirmedCatering.passcode} - ${confirmedCatering.details.name}`;
                      const emailUrl = `mailto:praneethskitchen@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(cateringMessage)}`;

                      return (
                        <>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none text-center"
                          >
                            Send request via WhatsApp 💬
                          </a>
                          <a
                            href={emailUrl}
                            className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none text-center"
                          >
                            Send request via Email ✉️
                          </a>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Our catering coordinator will contact you shortly to finalize your custom cooking specifications and handle advanced deposits.
                </p>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 bg-cream hover:bg-charcoal hover:text-gold text-charcoal font-sans font-bold text-xs uppercase tracking-widest border border-charcoal rounded-none transition-all cursor-pointer"
                  >
                    Print Seating Pass
                  </button>
                  <button
                    onClick={handleCancelCatering}
                    className="px-6 py-2.5 bg-transparent hover:bg-white/10 text-gold border border-gold/40 rounded-none text-xs font-bold transition-all cursor-pointer uppercase tracking-widest"
                  >
                    Edit Catering
                  </button>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
