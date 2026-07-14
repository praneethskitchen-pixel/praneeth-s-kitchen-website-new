/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Trash2, Plus, Minus, Printer, Clock, ChefHat, 
  ShoppingBag, Check, Gift, HelpCircle, Flame, Sparkles,
  MessageSquare, Mail
} from "lucide-react";
import { CartItem } from "../types";

interface OrderCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

const KITCHEN_STEPS = [
  { status: "Received", desc: "Order queued in copper pot register", time: 1 },
  { status: "Sourcing Ingredients", desc: "Measuring farm-fresh Guntur chillies & ghee", time: 3 },
  { status: "Chef Preparing", desc: "Layering the basmati rice or steaming Ragi Mudha", time: 7 },
  { status: "Simmering on Slow Flame", desc: "Dum process in progress under high-heat clay pots", time: 12 },
  { status: "Golden Box Packaging", desc: "Sealing with organic banana leaf and premium golden wrap", time: 16 },
  { status: "Ready for Feast", desc: "Saffron-rich feast is prepared for delivery/pickup", time: 20 }
];

export default function OrderCart({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart 
}: OrderCartProps) {
  
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "submitting" | "receipt" | "cooking">("cart");
  const [orderId, setOrderId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  
  // Cooking animation tracker state
  const [activeCookingStep, setActiveCookingStep] = useState<number>(0);

  // Auto-increment the cooking status to simulate live action
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === "cooking") {
      interval = setInterval(() => {
        setActiveCookingStep((prev) => {
          if (prev >= KITCHEN_STEPS.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Compute pricing
  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const gstTax = Math.round(subtotal * 0.05); // 5% CGST + SGST
  const packagingCharge = subtotal > 0 ? 30 : 0; // Eco-friendly premium containers
  const deliveryCharge = deliveryType === "delivery" && subtotal > 0 ? 40 : 0;
  const total = subtotal + gstTax + packagingCharge + deliveryCharge;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (deliveryType === "delivery" && !customerAddress)) {
      alert("Please fill out your contact details to receive your gourmet order!");
      return;
    }

    setCheckoutStep("submitting");
    
    // Simulate API delay
    setTimeout(() => {
      const generatedId = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setCheckoutStep("receipt");
    }, 1500);
  };

  const handleStartTracking = () => {
    setActiveCookingStep(0);
    setCheckoutStep("cooking");
  };

  const handleResetOrder = () => {
    onClearCart();
    setCheckoutStep("cart");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    onClose();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-cream-light border-l-2 border-gold shadow-2xl flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="p-6 bg-charcoal text-cream border-b border-gold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-gold" />
                  <h3 className="font-serif-elegant font-bold text-xl tracking-wide text-cream">
                    {checkoutStep === "cart" && "Gourmet Dining Bag"}
                    {checkoutStep === "submitting" && "Transmitting Feast..."}
                    {checkoutStep === "receipt" && "Order Confirmed!"}
                    {checkoutStep === "cooking" && "Live Kitchen Tracker"}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-cream/10 rounded-full transition-colors cursor-pointer text-gold"
                  aria-label="Close Drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dynamic Steps Body */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none space-y-6">

                {/* --- CASE 1: EMPTY CART --- */}
                {cart.length === 0 && checkoutStep === "cart" && (
                  <div className="text-center py-20 space-y-4">
                    <div className="p-4 bg-cream rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-dashed border-gold/40">
                      <ShoppingBag className="h-10 w-10 text-gold-muted animate-pulse" />
                    </div>
                    <h4 className="font-serif-elegant font-bold text-lg text-charcoal">Your Bag is Empty</h4>
                    <p className="text-neutral-500 text-xs sm:text-sm max-w-xs mx-auto">
                      Add some hot biryanis, Ragi Mudha, traditional sweets, or savory snacks to begin your luxury dining checkout!
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 bg-charcoal text-gold font-bold text-xs uppercase tracking-widest rounded-lg border border-gold/40 hover:bg-charcoal-light transition-all"
                    >
                      Browse Menu
                    </button>
                  </div>
                )}

                {/* --- CASE 2: ACTIVE CART ITEMS & CHECKOUT INFO --- */}
                {cart.length > 0 && checkoutStep === "cart" && (
                  <div className="space-y-6">
                    
                    {/* Item list */}
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-gold-dark uppercase tracking-wider">Item Summary ({cart.length})</p>
                      <div className="divide-y divide-gold/10">
                        {cart.map((item) => (
                          <div key={item.menuItem.id} className="py-4 flex items-center gap-4">
                            <img
                              src={item.menuItem.image}
                              alt={item.menuItem.name}
                              className="w-16 h-16 object-cover rounded-none border border-gold/30"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-start">
                                <h5 className="font-semibold text-sm text-charcoal leading-snug">{item.menuItem.name}</h5>
                                <span className="font-mono text-sm font-bold text-charcoal-light">₹{item.menuItem.price * item.quantity}</span>
                              </div>
                              <p className="text-[11px] text-neutral-500">Unit Price: ₹{item.menuItem.price}</p>
                              {item.specialInstructions && (
                                <p className="text-[10px] text-gold-dark font-mono bg-gold/5 px-2 py-0.5 rounded italic">
                                  "{item.specialInstructions}"
                                </p>
                              )}

                              {/* Quantity manipulators */}
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center bg-cream border border-gold/20 rounded-md">
                                  <button
                                    onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                                    className="p-1 text-charcoal hover:text-gold transition-all"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-3 font-mono text-xs font-bold text-charcoal">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                                    className="p-1 text-charcoal hover:text-gold transition-all"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(item.menuItem.id)}
                                  className="text-xs text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Remove
                                </button>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery type selectors */}
                    <div className="space-y-2 pt-4 border-t border-gold/15">
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Feast Distribution Choice</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryType("delivery")}
                          className={`py-2 text-xs font-bold rounded-none border transition-all uppercase tracking-wider ${
                            deliveryType === "delivery"
                              ? "bg-charcoal text-gold border-gold"
                              : "bg-cream text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          Home Delivery (+₹40)
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType("pickup")}
                          className={`py-2 text-xs font-bold rounded-none border transition-all uppercase tracking-wider ${
                            deliveryType === "pickup"
                              ? "bg-charcoal text-gold border-gold"
                              : "bg-cream text-neutral-600 border-gold/20 hover:border-charcoal"
                          }`}
                        >
                          Express Kitchen Pickup
                        </button>
                      </div>
                    </div>

                    {/* Customer Info Form */}
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-gold/15">
                      <p className="text-xs font-bold text-gold-dark uppercase tracking-wider">Feast Delivery Details</p>
                      
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="E.g., Madugula Manasa"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2.5 bg-cream border border-gold/30 rounded-none text-xs text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider">Active Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="E.g., +91 98765 43210"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full p-2.5 bg-cream border border-gold/30 rounded-none text-xs text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal font-mono"
                        />
                      </div>

                      {deliveryType === "delivery" && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider">Full Delivery Address</label>
                          <textarea
                            required
                            placeholder="Flat/House No., Street Name, Landmark, Pin Code"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            rows={2}
                            className="w-full p-2.5 bg-cream border border-gold/30 rounded-none text-xs text-charcoal focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal"
                          />
                        </div>
                      )}

                      {/* Pricing block */}
                      <div className="bg-cream p-4 rounded-none border border-gold/30 space-y-2">
                        <div className="flex justify-between text-xs text-neutral-600">
                          <span>Items Subtotal</span>
                          <span className="font-mono">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600">
                          <span>CGST + SGST Taxes (5%)</span>
                          <span className="font-mono">₹{gstTax}</span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600">
                          <span>Eco-Premium Packaging</span>
                          <span className="font-mono">₹{packagingCharge}</span>
                        </div>
                        {deliveryType === "delivery" && (
                          <div className="flex justify-between text-xs text-neutral-600">
                            <span>Saffron Delivery Courier</span>
                            <span className="font-mono">₹{deliveryCharge}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-dashed border-gold/20">
                          <span>Total Amount Due</span>
                          <span className="font-mono text-gold-dark text-base">₹{total}</span>
                        </div>
                      </div>

                      {/* Submit Order Trigger */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-charcoal hover:bg-cream hover:text-charcoal text-gold font-sans font-bold text-xs uppercase tracking-widest border-2 border-charcoal transition-all cursor-pointer flex items-center justify-center gap-2 rounded-none"
                      >
                        <Sparkles className="h-5 w-5 animate-pulse" /> Confirm & Place Mock Order
                      </button>

                    </form>

                  </div>
                )}

                {/* --- CASE 3: SUBMITTING SPINNER --- */}
                {checkoutStep === "submitting" && (
                  <div className="text-center py-24 space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-gold/20" />
                      <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
                      <ChefHat className="absolute inset-0 m-auto h-8 w-8 text-gold animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif-elegant font-bold text-lg text-charcoal">Transmitting Secret Recipe...</h4>
                      <p className="text-neutral-500 text-xs sm:text-sm">Please wait while Praneeth's register authenticates your food request.</p>
                    </div>
                  </div>
                )}

                {/* --- CASE 4: PREMIUM GOLD PRINTABLE RECEIPT --- */}
                {checkoutStep === "receipt" && (() => {
                  const itemsText = cart.map(item => `• ${item.menuItem.name} (Qty: ${item.quantity}) - ₹${item.menuItem.price * item.quantity}`).join("\n");
                  const whatsappMessage = `*PRANEETH'S KITCHEN - NEW ORDER* 🍳
========================
*Order ID:* ${orderId}
*Guest Name:* ${customerName}
*Phone:* ${customerPhone}
*Type:* ${deliveryType.toUpperCase()}
*${deliveryType === "delivery" ? "Address" : "Fulfillment"}:* ${customerAddress || "Kitchen Pickup"}

*ITEMS ORDERED:*
${itemsText}

*Subtotal:* ₹${subtotal}
*Taxes (5% GST):* ₹${gstTax}
*Premium Packaging:* ₹${packagingCharge}
${deliveryType === "delivery" ? `*Saffron Delivery:* ₹${deliveryCharge}\n` : ""}------------------------
*GRAND TOTAL BILL:* ₹${total}
========================
Sent via Praneeth's Kitchen Web Portal.`;

                  const whatsappUrl = `https://wa.me/919154668077?text=${encodeURIComponent(whatsappMessage)}`;
                  const emailSubject = `New Order: ${orderId} - ${customerName}`;
                  const emailUrl = `mailto:praneethskitchen@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(whatsappMessage)}`;

                  return (
                    <div className="space-y-6">
                      
                      {/* Confirmation Graphic */}
                      <div className="text-center py-4 space-y-2 bg-gold/10 rounded-none border border-gold/30 p-4">
                        <div className="w-12 h-12 bg-gold text-charcoal rounded-none flex items-center justify-center mx-auto shadow-md">
                          <Check className="h-6 w-6 font-bold" />
                        </div>
                        <h4 className="font-serif-elegant font-bold text-lg text-charcoal-light">A Feast is Set!</h4>
                        <p className="text-neutral-600 text-xs">
                          Your order has been registered securely. Please dispatch your order receipt to our kitchen below.
                        </p>
                      </div>

                      {/* Direct Dispatch Actions Block */}
                      <div className="bg-charcoal border-2 border-gold p-4 space-y-3 shadow-lg">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gold text-center font-bold">
                          📲 ACTIVATE DISPATCH FOR KITCHEN
                        </p>
                        <p className="text-cream text-[11px] text-center max-w-xs mx-auto leading-relaxed">
                          To finalize your order, tap below to automatically send your receipt to Praneeth's Kitchen via WhatsApp or Email!
                        </p>
                        <div className="grid grid-cols-1 gap-2.5 pt-1">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none text-center"
                          >
                            <MessageSquare className="h-4 w-4 fill-white" /> Dispatch via WhatsApp
                          </a>
                          <a
                            href={emailUrl}
                            className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none text-center"
                          >
                            <Mail className="h-4 w-4" /> Dispatch via Email
                          </a>
                        </div>
                      </div>

                      {/* Receipt Document Block */}
                      <div id="printable-receipt" className="bg-white border-2 border-charcoal rounded-none p-5 shadow-md relative overflow-hidden font-mono text-xs text-charcoal space-y-4">
                        
                        {/* Decorative Gold Border side strip */}
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gold" />

                        {/* Header block */}
                        <div className="text-center border-b border-dashed border-neutral-300 pb-3 space-y-1">
                          <h5 className="font-bold text-sm tracking-widest text-charcoal">PRANEETH'S KITCHEN</h5>
                          <p className="text-[10px] text-neutral-500">Saffron Heritage Dining Store</p>
                          <p className="text-[10px] text-neutral-500">Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
                          <p className="text-[11px] font-bold text-gold-dark uppercase tracking-widest">ORDER NO: {orderId}</p>
                        </div>

                        {/* Delivery details */}
                        <div className="space-y-1 border-b border-dashed border-neutral-200 pb-3">
                          <p className="font-bold text-[11px] uppercase text-neutral-800">GUEST INFO:</p>
                          <p><span className="text-neutral-500">Name :</span> {customerName}</p>
                          <p><span className="text-neutral-500">Phone:</span> {customerPhone}</p>
                          {deliveryType === "delivery" ? (
                            <p className="line-clamp-2"><span className="text-neutral-500">Addr :</span> {customerAddress}</p>
                          ) : (
                            <p className="text-gold-dark font-bold"><span className="text-neutral-500">Type :</span> Self Pickup at Royal Kitchen</p>
                          )}
                        </div>

                        {/* Items breakdown */}
                        <div className="space-y-2 border-b border-dashed border-neutral-200 pb-3">
                          <p className="font-bold text-[11px] uppercase text-neutral-800 flex justify-between">
                            <span>ITEM DESCRIPTION</span>
                            <span>QTY/SUB</span>
                          </p>
                          <div className="space-y-1.5">
                            {cart.map((item) => (
                              <div key={item.menuItem.id} className="flex justify-between text-neutral-700">
                                <div className="max-w-[70%]">
                                  <p className="font-semibold">{item.menuItem.name}</p>
                                  {item.specialInstructions && (
                                    <p className="text-[9px] text-gold-dark italic">*{item.specialInstructions}</p>
                                  )}
                                </div>
                                <span>{item.quantity} x ₹{item.menuItem.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Financial Sum */}
                        <div className="space-y-1 pt-1 text-neutral-700">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxes (5% GST):</span>
                            <span>₹{gstTax}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Premium Box Packaging:</span>
                            <span>₹{packagingCharge}</span>
                          </div>
                          {deliveryType === "delivery" && (
                            <div className="flex justify-between">
                              <span>Saffron Courier:</span>
                              <span>₹{deliveryCharge}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-charcoal border-t border-dashed border-neutral-300 pt-2 text-sm">
                            <span>AMOUNT CHARGED:</span>
                            <span>₹{total}</span>
                          </div>
                        </div>

                        {/* Slogan */}
                        <div className="text-center pt-4 border-t border-neutral-200 space-y-1 text-neutral-500 text-[10px]">
                          <p>Thank you for choosing Praneeth's Kitchen!</p>
                          <p>Prepared using Pure Cow Ghee and Raw Spices.</p>
                          <div className="w-full h-8 flex items-center justify-center bg-neutral-100 text-[9px] border border-neutral-200 rounded-none font-mono text-center tracking-[4px] text-neutral-700 select-none">
                            *PRANEETHSKITCHEN*
                          </div>
                        </div>

                      </div>

                      {/* Receipt Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={handlePrintReceipt}
                          className="py-2.5 bg-cream hover:bg-charcoal hover:text-gold text-charcoal font-sans font-bold text-xs uppercase tracking-widest border border-charcoal rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Printer className="h-4 w-4" /> Save Receipt
                        </button>
                        <button
                          onClick={handleStartTracking}
                          className="py-2.5 bg-charcoal hover:bg-cream hover:text-charcoal text-gold font-sans font-bold text-xs uppercase tracking-widest border border-gold rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Clock className="h-4 w-4 animate-spin-slow" /> Track Kitchen
                        </button>
                      </div>

                    </div>
                  );
                })()}

                {/* --- CASE 5: LIVE KITCHEN COOKING TRACKER --- */}
                {checkoutStep === "cooking" && (
                  <div className="space-y-6">
                    
                    <div className="text-center p-5 bg-charcoal text-cream rounded-none border-2 border-gold space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3">
                        <Flame className="h-6 w-6 text-gold animate-bounce" />
                      </div>
                      <p className="text-gold font-mono text-xs uppercase tracking-widest font-bold">FEAST STATUS</p>
                      <h4 className="font-serif-elegant font-bold text-2xl text-cream">Cooking in Progress</h4>
                      <p className="text-neutral-400 text-xs max-w-xs mx-auto">
                        Your biryanis and stews are being tempered over a traditional charcoal flame. Track progress below.
                      </p>
                    </div>

                    {/* Vertical Progress Timeline */}
                    <div className="space-y-4 pl-4 relative before:absolute before:top-2 before:bottom-2 before:left-2 before:w-[2px] before:bg-gold/20">
                      {KITCHEN_STEPS.map((step, idx) => {
                        const isCompleted = idx < activeCookingStep;
                        const isActive = idx === activeCookingStep;
                        const isPending = idx > activeCookingStep;

                        return (
                          <div key={idx} className="flex gap-4 relative transition-all duration-500">
                            {/* Dot */}
                            <div className={`w-4 h-4 rounded-full border-2 z-10 shrink-0 mt-1 transition-all ${
                              isCompleted ? "bg-gold border-gold" : 
                              isActive ? "bg-charcoal border-gold animate-pulse" : 
                              "bg-cream-light border-gold/20"
                            }`} />

                            <div className={`space-y-0.5 ${isPending ? "opacity-40" : "opacity-100"}`}>
                              <h5 className={`font-bold text-sm ${isActive ? "text-gold-dark font-serif-elegant" : "text-charcoal"}`}>
                                {step.status}
                                {isActive && <span className="text-[10px] text-gold font-mono ml-2 animate-pulse">[ACTIVE]</span>}
                              </h5>
                              <p className="text-xs text-neutral-600 leading-normal">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress completes notice */}
                    {activeCookingStep === KITCHEN_STEPS.length - 1 && (
                      <div className="p-4 bg-green-50 text-green-800 rounded-none border-2 border-green-600 text-center space-y-1 animate-bounce mt-4 font-mono">
                        <p className="font-bold text-sm">🛎️ Feasting Time!</p>
                        <p className="text-xs">Your food package is hot, sealed, and ready to satisfy your tastebuds.</p>
                      </div>
                    )}

                    <button
                      onClick={() => setCheckoutStep("receipt")}
                      className="w-full py-2.5 bg-cream hover:bg-charcoal hover:text-gold text-charcoal font-sans font-bold text-xs border border-charcoal rounded-none transition-all text-center uppercase tracking-widest cursor-pointer"
                    >
                      Return to Receipt
                    </button>

                  </div>
                )}

              </div>

              {/* Drawer Footer controls */}
              <div className="p-6 bg-cream border-t border-gold/20 space-y-3">
                {checkoutStep === "receipt" || checkoutStep === "cooking" ? (
                  <button
                    onClick={handleResetOrder}
                    className="w-full py-2.5 bg-charcoal hover:bg-cream hover:text-charcoal text-gold font-sans font-bold text-xs uppercase tracking-widest rounded-none border-2 border-charcoal transition-all cursor-pointer"
                  >
                    Finish & Reset App
                  </button>
                ) : (
                  <p className="text-[11px] text-center text-neutral-500">
                    🔒 Secure Sandboxed Culinary Ordering Simulator
                  </p>
                )}
              </div>

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
