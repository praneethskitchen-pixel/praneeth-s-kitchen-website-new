/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, FileSpreadsheet, Download, Search, RefreshCw, 
  Trash2, ShieldCheck, ShoppingBag, Calendar, CheckCircle, Clock,
  Filter, Database, Phone, MapPin, User, ExternalLink, Link2, Zap,
  Copy, Code, ChevronDown, ChevronUp
} from "lucide-react";
import { OrderRecord } from "../types";
import { 
  getWebhookUrl, 
  setWebhookUrl, 
  syncOrderToCloud, 
  GOOGLE_APPS_SCRIPT_TEMPLATE 
} from "../utils/cloudSync";

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: "PK-854912",
    type: "online_order",
    customerName: "Manasa Madugula",
    customerPhone: "+91 91546 68077",
    customerEmail: "madugulamanasa2@gmail.com",
    deliveryType: "delivery",
    address: "Plot 42, Jubilee Hills, Rd No. 10, Hyderabad",
    itemsSummary: "Hyderabadi Chicken Dum Biryani (x2), Mirchi Ka Salan (x1), Double Ka Meetha (x2)",
    totalAmount: 1120,
    timestamp: "14/08/2026, 02:45:10 PM",
    status: "Completed"
  },
  {
    id: "CATER-PK-49210",
    type: "catering",
    customerName: "Siddharth Rao",
    customerPhone: "+91 98490 12345",
    customerEmail: "siddharth.rao@example.com",
    deliveryType: "delivery",
    address: "Grand Palace Lawn, Banjara Hills, Hyderabad",
    itemsSummary: "Special Mutton Dum Biryani (50 Kgs) + Telangana Natu Kodi Curry",
    totalAmount: 42500,
    timestamp: "14/08/2026, 01:15:00 PM",
    status: "Preparing",
    eventDate: "2026-08-20",
    eventTime: "19:00"
  },
  {
    id: "PK-392104",
    type: "online_order",
    customerName: "Vikram Reddy",
    customerPhone: "+91 91212 98765",
    customerEmail: "vikram.reddy@example.com",
    deliveryType: "pickup",
    address: "Kitchen Pickup (Madhapur Branch)",
    itemsSummary: "Telangana Natu Kodi Pulao (x1), Ragi Mudha (x2), Ghee Sambar Rice (x1)",
    totalAmount: 840,
    timestamp: "14/08/2026, 11:30:20 AM",
    status: "Dispatched"
  }
];

export default function AdminOrdersModal({ isOpen, onClose }: AdminOrdersModalProps) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "online_order" | "catering">("online_order");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cloud Webhook State
  const [webhookUrlInput, setWebhookUrlInput] = useState("");
  const [showSyncSettings, setShowSyncSettings] = useState(false);
  const [showScriptCode, setShowScriptCode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setWebhookUrlInput(getWebhookUrl());
  }, [isOpen]);

  const handleSaveWebhook = () => {
    setWebhookUrl(webhookUrlInput);
    showToast("Webhook URL saved! Future orders will automatically post to your spreadsheet.");
  };

  const handleTestSync = async () => {
    if (!webhookUrlInput.trim()) {
      alert("Please paste your Google Apps Script / Webhook URL first.");
      return;
    }
    setWebhookUrl(webhookUrlInput);
    setIsSyncing(true);

    const testOrder: OrderRecord = {
      id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "online_order",
      customerName: "Test Order (Auto-Sync)",
      customerPhone: "+91 91546 68077",
      customerEmail: "praneethskitchen@gmail.com",
      deliveryType: "delivery",
      address: "Test Kitchen Address",
      itemsSummary: "Test Chicken Dum Biryani (x1)",
      totalAmount: 380,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      status: "Received"
    };

    const res = await syncOrderToCloud(testOrder);
    setIsSyncing(false);
    showToast(res.message);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    showToast("Google Apps Script code copied to clipboard!");
  };

  // Load orders from localStorage
  const loadOrdersFromStorage = () => {
    try {
      const stored = localStorage.getItem("pk_orders_database");
      if (stored) {
        const parsed: OrderRecord[] = JSON.parse(stored);
        setOrders(parsed);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrdersFromStorage();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSeedSamples = () => {
    try {
      localStorage.setItem("pk_orders_database", JSON.stringify(SAMPLE_ORDERS));
      setOrders(SAMPLE_ORDERS);
      showToast("Sample orders database loaded successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm("Are you sure you want to clear all stored order records?")) {
      localStorage.removeItem("pk_orders_database");
      setOrders([]);
      showToast("Order database cleared.");
    }
  };

  const handleUpdateStatus = (id: string, newStatus: OrderRecord["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem("pk_orders_database", JSON.stringify(updated));
      showToast(`Order ${id} status updated to ${newStatus}`);
    } catch (e) {
      console.error(e);
    }
  };

  // EXPORT TO EXCEL CSV SPREADSHEET
  const handleExportToExcel = (exportScope: "all" | "online_order" | "catering") => {
    const listToExport = exportScope === "all" 
      ? orders 
      : orders.filter((o) => o.type === exportScope);

    if (listToExport.length === 0) {
      alert(`No ${exportScope === "catering" ? "Bulk Catering" : "Regular Food"} orders available to export. Place an order or click 'Load Sample Orders' first.`);
      return;
    }

    const isCateringOnly = exportScope === "catering";
    const isRegularOnly = exportScope === "online_order";

    // Dynamic CSV Header Columns depending on export type
    let headers: string[] = [];

    if (isCateringOnly) {
      headers = [
        "Catering Passcode ID",
        "Event Date",
        "Event Time",
        "Client Name",
        "Phone Number",
        "Email Address",
        "Fulfillment Mode",
        "Venue / Delivery Address",
        "Bulk Feast & Items Summary",
        "Quote Amount (INR)",
        "Submitted Timestamp",
        "Current Status"
      ];
    } else if (isRegularOnly) {
      headers = [
        "Order ID",
        "Customer Name",
        "Phone Number",
        "Fulfillment Type",
        "Delivery / Pickup Address",
        "Menu Items & Quantities",
        "Bill Amount (INR)",
        "Order Timestamp",
        "Current Status"
      ];
    } else {
      headers = [
        "Order ID / Passcode",
        "Category",
        "Customer / Client Name",
        "Phone Number",
        "Email Address",
        "Fulfillment",
        "Address / Venue",
        "Event Date & Time",
        "Items / Menu Summary",
        "Total Amount (INR)",
        "Submitted Timestamp",
        "Current Status"
      ];
    }

    const escapeCsv = (val: string | number | undefined) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    let rows: string[][] = [];

    if (isCateringOnly) {
      rows = listToExport.map((ord) => [
        escapeCsv(ord.id),
        escapeCsv(ord.eventDate || "N/A"),
        escapeCsv(ord.eventTime || "N/A"),
        escapeCsv(ord.customerName),
        escapeCsv(ord.customerPhone),
        escapeCsv(ord.customerEmail || "N/A"),
        escapeCsv(ord.deliveryType.toUpperCase()),
        escapeCsv(ord.address || "Kitchen Pickup"),
        escapeCsv(ord.itemsSummary),
        escapeCsv(ord.totalAmount),
        escapeCsv(ord.timestamp),
        escapeCsv(ord.status)
      ]);
    } else if (isRegularOnly) {
      rows = listToExport.map((ord) => [
        escapeCsv(ord.id),
        escapeCsv(ord.customerName),
        escapeCsv(ord.customerPhone),
        escapeCsv(ord.deliveryType.toUpperCase()),
        escapeCsv(ord.address || "Kitchen Pickup"),
        escapeCsv(ord.itemsSummary),
        escapeCsv(ord.totalAmount),
        escapeCsv(ord.timestamp),
        escapeCsv(ord.status)
      ]);
    } else {
      rows = listToExport.map((ord) => [
        escapeCsv(ord.id),
        escapeCsv(ord.type === "catering" ? "BULK CATERING" : "REGULAR FOOD ORDER"),
        escapeCsv(ord.customerName),
        escapeCsv(ord.customerPhone),
        escapeCsv(ord.customerEmail || "N/A"),
        escapeCsv(ord.deliveryType.toUpperCase()),
        escapeCsv(ord.address || "N/A"),
        escapeCsv(ord.eventDate ? `${ord.eventDate} (${ord.eventTime || ""})` : "N/A"),
        escapeCsv(ord.itemsSummary),
        escapeCsv(ord.totalAmount),
        escapeCsv(ord.timestamp),
        escapeCsv(ord.status)
      ]);
    }

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    const filenamePrefix = exportScope === "catering" 
      ? "Praneeths_Kitchen_BULK_CATERING" 
      : exportScope === "online_order" 
      ? "Praneeths_Kitchen_REGULAR_ORDERS" 
      : "Praneeths_Kitchen_ALL_ORDERS";

    link.setAttribute("href", url);
    link.setAttribute("download", `${filenamePrefix}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Excel CSV File for ${exportScope === "catering" ? "Bulk Catering" : exportScope === "online_order" ? "Regular Orders" : "All Records"} downloaded!`);
  };

  // Separate Lists
  const regularOrders = orders.filter((o) => o.type === "online_order");
  const cateringOrders = orders.filter((o) => o.type === "catering");

  // Filtered list based on tab & search query
  const displayedOrders = orders.filter((o) => {
    const matchesTab = activeTab === "all" || o.type === activeTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.customerPhone.toLowerCase().includes(query) ||
      o.itemsSummary.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const regularTotalValue = regularOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const cateringTotalValue = cateringOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-cream border-2 border-gold shadow-2xl rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden text-charcoal"
        >
          {/* Header Bar */}
          <div className="bg-charcoal text-cream p-5 border-b border-gold/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold flex items-center justify-center text-gold">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif-elegant font-bold text-xl sm:text-2xl text-cream flex items-center gap-2">
                  Kitchen Orders Register & Excel Database
                </h2>
                <p className="text-xs text-gold-light font-mono">
                  Separate registers for Direct Meal Orders vs. Bulk Event Catering
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-cream/70 hover:text-gold hover:bg-white/10 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Toast Banner */}
          {toastMessage && (
            <div className="bg-gold text-charcoal font-bold text-xs px-4 py-2 text-center flex items-center justify-center gap-2 shrink-0">
              <CheckCircle className="h-4 w-4" /> {toastMessage}
            </div>
          )}

          {/* 1. Category Dashboard Stats Row */}
          <div className="bg-cream-light p-4 border-b border-gold/20 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Card 1: Regular Food Orders */}
              <div 
                onClick={() => setActiveTab("online_order")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === "online_order" 
                    ? "bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/30" 
                    : "bg-cream border-gold/30 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-blue-900 block">Regular Food Orders</span>
                    <p className="font-serif-elegant font-bold text-xl text-charcoal">{regularOrders.length} <span className="text-xs font-sans font-normal text-neutral-500">orders</span></p>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-xs text-blue-900">
                  ₹{regularTotalValue.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Card 2: Bulk Catering Orders */}
              <div 
                onClick={() => setActiveTab("catering")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === "catering" 
                    ? "bg-amber-50/90 border-amber-600 shadow-md ring-2 ring-amber-500/30" 
                    : "bg-cream border-gold/30 hover:border-amber-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-900 block">Bulk Catering Bookings</span>
                    <p className="font-serif-elegant font-bold text-xl text-charcoal">{cateringOrders.length} <span className="text-xs font-sans font-normal text-neutral-500">events</span></p>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-xs text-amber-900">
                  ₹{cateringTotalValue.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Card 3: Total Combined Register */}
              <div 
                onClick={() => setActiveTab("all")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-1 ${
                  activeTab === "all" 
                    ? "bg-charcoal text-cream border-gold shadow-md ring-2 ring-gold/30" 
                    : "bg-cream border-gold/30 hover:border-charcoal"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold text-charcoal flex items-center justify-center font-bold shadow-sm">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase font-mono font-bold block ${activeTab === "all" ? "text-gold" : "text-neutral-500"}`}>Total Register Log</span>
                    <p className={`font-serif-elegant font-bold text-xl ${activeTab === "all" ? "text-cream" : "text-charcoal"}`}>{orders.length} <span className="text-xs font-sans font-normal opacity-70">records</span></p>
                  </div>
                </div>
                <div className={`text-right font-mono font-bold text-xs ${activeTab === "all" ? "text-gold" : "text-charcoal"}`}>
                  ₹{(regularTotalValue + cateringTotalValue).toLocaleString("en-IN")}
                </div>
              </div>

            </div>
          </div>

          {/* 2. Controls & Excel Download Bar */}
          <div className="bg-cream p-4 border-b border-gold/20 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
            
            {/* Tab Selection Switcher */}
            <div className="flex items-center bg-cream-dark p-1 rounded-xl border border-gold/40 w-full md:w-auto font-bold text-xs">
              <button
                onClick={() => setActiveTab("online_order")}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === "online_order" 
                    ? "bg-blue-700 text-white shadow-sm" 
                    : "text-neutral-700 hover:text-charcoal"
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Direct Food Orders ({regularOrders.length})
              </button>

              <button
                onClick={() => setActiveTab("catering")}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  activeTab === "catering" 
                    ? "bg-amber-700 text-white shadow-sm" 
                    : "text-neutral-700 hover:text-charcoal"
                }`}
              >
                <Calendar className="h-3.5 w-3.5" /> Bulk Catering ({cateringOrders.length})
              </button>

              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 md:flex-none px-3 py-2 rounded-lg transition-all ${
                  activeTab === "all" 
                    ? "bg-charcoal text-gold shadow-sm" 
                    : "text-neutral-700 hover:text-charcoal"
                }`}
              >
                All ({orders.length})
              </button>
            </div>

            {/* Search Input & Excel Export Controls */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <div className="relative flex-1 md:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full pl-9 pr-3 py-1.5 bg-cream border border-gold/40 rounded-lg text-xs font-sans text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              {orders.length === 0 && (
                <button
                  onClick={handleSeedSamples}
                  className="px-3 py-2 bg-cream-dark border border-gold/60 text-charcoal font-bold text-xs rounded-lg hover:bg-gold hover:text-charcoal transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Load Sample Orders
                </button>
              )}

              {/* Dedicated Excel Export & Cloud Sync Buttons */}
              <button
                onClick={() => handleExportToExcel(activeTab)}
                className={`px-3.5 py-2 font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5 text-white ${
                  activeTab === "catering" 
                    ? "bg-amber-700 hover:bg-amber-800" 
                    : activeTab === "online_order" 
                    ? "bg-blue-700 hover:bg-blue-800" 
                    : "bg-emerald-700 hover:bg-emerald-800"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>

              {/* Direct Link to User's OneDrive Excel Sheet */}
              <a
                href="https://1drv.ms/x/c/d392e2f30fa3cee1/IQADOE_A98szQZIVEvQpSxQrAW4kmp9jWz7ShO_n374iBJo?e=HvTuMu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
                title="Open your exact OneDrive Excel Sheet in new tab"
              >
                <ExternalLink className="h-3.5 w-3.5 text-emerald-300" />
                <span>Open OneDrive Excel ↗</span>
              </a>

              {/* Auto-Sync Settings Toggle Button */}
              <button
                onClick={() => setShowSyncSettings(!showSyncSettings)}
                className={`px-3 py-2 font-bold text-xs rounded-lg border transition-all flex items-center gap-1.5 ${
                  showSyncSettings || getWebhookUrl() 
                    ? "bg-purple-900 text-purple-100 border-purple-400 shadow-sm" 
                    : "bg-cream-dark text-charcoal border-gold/50 hover:bg-gold hover:text-charcoal"
                }`}
              >
                <Zap className={`h-3.5 w-3.5 ${getWebhookUrl() ? "text-amber-400 fill-amber-400" : ""}`} />
                <span>{getWebhookUrl() ? "Auto-Sync Active" : "Auto-Sync Setup"}</span>
                {showSyncSettings ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>

              {orders.length > 0 && (
                <button
                  onClick={handleClearDatabase}
                  title="Clear order database"
                  className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors text-xs"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

          {/* 2b. Auto-Sync Cloud Webhook Settings Drawer */}
          {showSyncSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-purple-950 text-purple-100 p-4 border-b border-purple-800 space-y-3 shrink-0 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                  Real-time Cloud Spreadsheet Auto-Sync (Google Sheets / Make / Zapier)
                </div>
                <button 
                  onClick={() => setShowSyncSettings(false)}
                  className="text-purple-300 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-purple-200/90 leading-relaxed">
                Connect your Google Sheet or Microsoft Power Automate / Zapier Webhook. Whenever a customer places an order or catering request, it will automatically post a new row to your spreadsheet in real time!
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  placeholder="Paste your Webhook URL here (e.g. https://script.google.com/macros/s/.../exec)"
                  className="flex-1 px-3 py-2 bg-purple-900/80 border border-purple-500/60 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-400 placeholder:text-purple-300/50"
                />
                
                <button
                  onClick={handleSaveWebhook}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-purple-950 font-bold rounded-lg transition-colors shrink-0"
                >
                  Save Webhook URL
                </button>

                <button
                  onClick={handleTestSync}
                  disabled={isSyncing}
                  className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white font-bold rounded-lg border border-purple-500 transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                  Test Auto-Sync
                </button>
              </div>

              {/* Instructions toggle */}
              <div className="pt-2 border-t border-purple-800/80 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => setShowScriptCode(!showScriptCode)}
                  className="text-amber-300 hover:underline flex items-center gap-1 font-mono font-bold"
                >
                  <Code className="h-3.5 w-3.5" /> 
                  {showScriptCode ? "Hide Google Sheets Apps Script Setup Instructions" : "How to connect Google Sheets in 1 Minute (Copy 5-line Script)"}
                </button>

                {showScriptCode && (
                  <button
                    onClick={handleCopyScript}
                    className="px-2.5 py-1 bg-purple-800 hover:bg-purple-700 text-amber-300 rounded border border-purple-600 font-mono font-bold flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" /> Copy Script
                  </button>
                )}
              </div>

              {showScriptCode && (
                <div className="bg-purple-900/90 p-3 rounded-lg border border-purple-700/80 space-y-2 text-purple-200">
                  <ol className="list-decimal list-inside space-y-1 font-sans text-[11px]">
                    <li>Open your Google Sheet or create a new one.</li>
                    <li>Click <strong>Extensions &gt; Apps Script</strong>.</li>
                    <li>Replace the code with the snippet below and click <strong>Save</strong>.</li>
                    <li>Click <strong>Deploy &gt; New deployment</strong> &rarr; Select <strong>Web app</strong> &rarr; Set <em>"Who has access"</em> to <strong>Anyone</strong> &rarr; Click <strong>Deploy</strong>.</li>
                    <li>Copy the Web app URL and paste it into the field above!</li>
                  </ol>
                  <pre className="p-2.5 bg-black/50 rounded font-mono text-[10px] text-amber-200/90 overflow-x-auto border border-purple-800">
                    {GOOGLE_APPS_SCRIPT_TEMPLATE}
                  </pre>
                </div>
              )}

            </motion.div>
          )}

          {/* 3. Table View Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {displayedOrders.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <FileSpreadsheet className="h-12 w-12 text-gold/50 mx-auto" />
                <div className="space-y-1">
                  <p className="font-serif-elegant font-bold text-lg text-charcoal">
                    No {activeTab === "catering" ? "Bulk Catering" : activeTab === "online_order" ? "Direct Food" : ""} Records Found
                  </p>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    When customers submit {activeTab === "catering" ? "bulk catering function bookings" : "direct online food orders"} on the website, they are saved here separately. Click "Load Sample Orders" to view demo entries!
                  </p>
                </div>
                <button
                  onClick={handleSeedSamples}
                  className="px-5 py-2.5 bg-charcoal text-gold border border-gold font-bold text-xs rounded-xl hover:bg-gold hover:text-charcoal transition-all shadow-md inline-flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" /> Load Demo Orders
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto border border-gold/30 rounded-xl shadow-sm bg-cream">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-charcoal text-gold font-mono uppercase tracking-wider text-[10px] border-b border-gold/30">
                      <th className="p-3">{activeTab === "catering" ? "Catering Passcode" : "Order ID"}</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Customer / Client</th>
                      <th className="p-3">{activeTab === "catering" ? "Event Date & Venue" : "Fulfillment & Address"}</th>
                      <th className="p-3">{activeTab === "catering" ? "Feast Package & Add-ons" : "Items & Quantities"}</th>
                      <th className="p-3">{activeTab === "catering" ? "Total Quote" : "Bill Amount"}</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/15 text-charcoal">
                    {displayedOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-cream-light/80 transition-colors">
                        
                        {/* ID */}
                        <td className="p-3 font-mono font-bold text-charcoal whitespace-nowrap">
                          {ord.id}
                        </td>

                        {/* Category Badge */}
                        <td className="p-3 whitespace-nowrap">
                          {ord.type === "catering" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
                              <Calendar className="h-3 w-3 text-amber-700" /> BULK CATERING
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] bg-blue-100 text-blue-900 border border-blue-300">
                              <ShoppingBag className="h-3 w-3 text-blue-700" /> DIRECT MEAL
                            </span>
                          )}
                        </td>

                        {/* Customer Info */}
                        <td className="p-3 space-y-0.5 whitespace-nowrap">
                          <p className="font-bold text-charcoal flex items-center gap-1">
                            <User className="h-3 w-3 text-gold-dark" /> {ord.customerName}
                          </p>
                          <p className="text-[11px] text-neutral-600 font-mono flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5 text-neutral-400" /> {ord.customerPhone}
                          </p>
                        </td>

                        {/* Fulfillment / Event details */}
                        <td className="p-3 space-y-0.5 max-w-[200px]">
                          <span className="font-bold uppercase text-[10px] text-gold-dark block">
                            {ord.deliveryType}
                          </span>
                          <p className="text-[11px] text-neutral-600 truncate" title={ord.address}>
                            {ord.address}
                          </p>
                          {ord.eventDate && (
                            <p className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                              📅 {ord.eventDate} ({ord.eventTime})
                            </p>
                          )}
                        </td>

                        {/* Items / Menu Summary */}
                        <td className="p-3 max-w-[240px]">
                          <p className="text-neutral-800 font-medium leading-snug line-clamp-2" title={ord.itemsSummary}>
                            {ord.itemsSummary}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="p-3 font-serif-elegant font-bold text-sm text-charcoal whitespace-nowrap">
                          ₹{ord.totalAmount.toLocaleString("en-IN")}
                        </td>

                        {/* Timestamp */}
                        <td className="p-3 text-[11px] font-mono text-neutral-500 whitespace-nowrap">
                          {ord.timestamp}
                        </td>

                        {/* Status Dropdown */}
                        <td className="p-3 whitespace-nowrap">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateStatus(ord.id, e.target.value as OrderRecord["status"])}
                            className="bg-cream border border-gold/40 text-[11px] font-bold rounded-lg px-2 py-1 text-charcoal focus:outline-none focus:border-gold cursor-pointer"
                          >
                            <option value="Received">Received</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-cream-light p-4 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-3 text-neutral-600 text-[11px]">
              <span className="inline-flex items-center gap-1 font-bold text-blue-800">
                <ShoppingBag className="h-3 w-3" /> Direct Food Orders: {regularOrders.length}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-800">
                <Calendar className="h-3 w-3" /> Bulk Catering Events: {cateringOrders.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-charcoal text-cream font-bold rounded-xl hover:bg-gold hover:text-charcoal transition-all"
            >
              Close Database Log
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
