import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, PhoneCall, Check, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data';

interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

type OrderType = 'dinein' | 'takeaway' | 'drive' | 'delivery';

export default function OrderDrawer({
  isOpen,
  onClose,
  darkMode,
  cartItems,
  onUpdateQuantity,
  onClearCart
}: OrderDrawerProps) {
  const [orderType, setOrderType] = useState<OrderType>('dinein');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDetails, setCustomerDetails] = useState(''); // table number or address
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Math totals calculations
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const gstTax = Math.round(subtotal * 0.16); // 16% Islamabad standard GST
  const serviceFee = subtotal > 0 ? 50 : 0; // Flat packaging / service charge in PKR
  const grandTotal = subtotal + gstTax + serviceFee;

  // Handle WhatsApp Checkout compiling
  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName.trim() || !customerPhone.trim()) return;

    // Build pretty formatted text for WhatsApp
    let messageText = `*🏮 NEW ORDER - XIBAI FENG WEI YUAN 🏮*\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `• Name: ${customerName}\n`;
    messageText += `• Phone: ${customerPhone}\n`;
    messageText += `• Service Style: ${orderType.toUpperCase()}\n`;
    if (customerDetails.trim()) {
      messageText += `• Info/Address: ${customerDetails}\n`;
    }
    messageText += `\n*Order Selections:*\n`;

    cartItems.forEach((cart) => {
      const itemTotal = cart.item.price * cart.quantity;
      messageText += `• ${cart.quantity}x ${cart.item.name} @ Rs ${cart.item.price} = Rs ${itemTotal}\n`;
    });

    messageText += `\n*Summary:*\n`;
    messageText += `• Subtotal: Rs ${subtotal.toLocaleString()}\n`;
    messageText += `• GST Tax (16%): Rs ${gstTax.toLocaleString()}\n`;
    messageText += `• Service/Dine Fee: Rs ${serviceFee.toLocaleString()}\n`;
    messageText += `*• Grand Total: Rs ${grandTotal.toLocaleString()}*\n\n`;
    messageText += `Thank you! Please confirm my order.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedText}`;

    // Open WhatsApp URL in new window
    window.open(whatsappUrl, '_blank');

    // Trigger local confirmation UI
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      onClearCart();
      setCustomerName('');
      setCustomerPhone('');
      setCustomerDetails('');
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-md h-full flex flex-col justify-between shadow-2xl ${
              darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-stone-900'
            }`}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between p-5 border-b border-stone-200/50 dark:border-zinc-900/50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-red-500" />
                <h3 className="font-serif font-bold text-lg">Your Order List</h3>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full border transition-colors outline-none ${
                  darkMode ? 'border-zinc-900 text-zinc-500 hover:text-white' : 'border-stone-100 text-stone-400 hover:text-stone-950'
                }`}
                aria-label="Close Cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Main Block */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6">
              {orderSubmitted ? (
                /* Post submission state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shadow-md">
                    <Check size={36} className="animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-xl text-green-500">Order Sent via WhatsApp!</h4>
                    <p className={`text-xs max-w-xs mx-auto leading-relaxed ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                      Your order has been formatted and forwarded to the restaurant's WhatsApp team. Our kitchen will call you shortly to confirm!
                    </p>
                  </div>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty state */
                <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-zinc-900 text-stone-400 dark:text-zinc-500 flex items-center justify-center">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base">Your Cart is Empty</h4>
                    <p className={`text-xs max-w-xs mx-auto mt-1 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                      Explore our featured categories, click "Add Order" on your favorite dumplings or noodles, and compile your feast!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-xs font-semibold text-red-500 hover:underline"
                  >
                    Browse the Menu
                  </button>
                </div>
              ) : (
                /* Active cart list */
                <div className="space-y-6">
                  {/* Cart Items list */}
                  <div className="space-y-3.5">
                    {cartItems.map((cart) => (
                      <div
                        key={cart.item.id}
                        className={`p-3 rounded-2xl border flex items-center gap-3.5 transition-all ${
                          darkMode ? 'bg-zinc-900/30 border-red-950/10' : 'bg-stone-50/50 border-stone-200/50'
                        }`}
                      >
                        <img
                          src={cart.item.image}
                          alt={cart.item.name}
                          className="w-14 h-14 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow space-y-1">
                          <h4 className="text-xs sm:text-sm font-bold font-serif leading-tight">
                            {cart.item.name}
                          </h4>
                          <span className="text-xs text-amber-500 font-serif font-medium block">
                            Rs {cart.item.price} each
                          </span>
                        </div>

                        {/* Quantity triggers */}
                        <div className="flex items-center border rounded-lg overflow-hidden scale-90 divide-x dark:divide-zinc-800 border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                          <button
                            onClick={() => onUpdateQuantity(cart.item.id, -1)}
                            className="p-1 px-2.5 hover:bg-stone-100 dark:hover:bg-zinc-900 text-xs font-black transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono min-w-4 text-center">
                            {cart.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cart.item.id, 1)}
                            className="p-1 px-2.5 hover:bg-stone-100 dark:hover:bg-zinc-900 text-xs font-black transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Service Order Type selector */}
                  <div className="space-y-2 pt-4 border-t border-dashed border-stone-200 dark:border-zinc-900">
                    <span className={`text-xs uppercase font-bold tracking-wider ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Order Service Style
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'dinein', label: 'Dine-In' },
                        { id: 'takeaway', label: 'Takeaway' },
                        { id: 'drive', label: 'Drive-Thru' },
                        { id: 'delivery', label: 'Delivery' }
                      ].map((item) => {
                        const isSelected = orderType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setOrderType(item.id as OrderType)}
                            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                              isSelected
                                ? 'bg-red-600/10 border-red-600 text-red-500 shadow-sm'
                                : darkMode
                                ? 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:border-zinc-700'
                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Information forms */}
                  <form onSubmit={handleWhatsAppOrder} className="space-y-4 pt-4 border-t border-dashed border-stone-200 dark:border-zinc-900">
                    <span className={`text-xs uppercase font-bold tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Checkout Information
                    </span>

                    <div className="space-y-3">
                      {/* Name */}
                      <input
                        type="text"
                        required
                        placeholder="Your Name (e.g. Waqas)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full py-2.5 px-3.5 rounded-xl text-xs border outline-none transition-all ${
                          darkMode
                            ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50'
                        }`}
                      />

                      {/* Phone */}
                      <input
                        type="tel"
                        required
                        placeholder="Your Mobile Number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`w-full py-2.5 px-3.5 rounded-xl text-xs border outline-none transition-all ${
                          darkMode
                            ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50'
                        }`}
                      />

                      {/* Dynamic service notes (table # / delivery address) */}
                      <input
                        type="text"
                        placeholder={
                          orderType === 'dinein'
                            ? 'Table Number (e.g. Table 4)'
                            : orderType === 'delivery'
                            ? 'Full Delivery Address in Islamabad'
                            : 'Vehicle Number / Note (Optional)'
                        }
                        value={customerDetails}
                        onChange={(e) => setCustomerDetails(e.target.value)}
                        className={`w-full py-2.5 px-3.5 rounded-xl text-xs border outline-none transition-all ${
                          darkMode
                            ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50'
                        }`}
                      />
                    </div>

                    {/* Pricing summary widget */}
                    <div className={`p-4 rounded-2xl space-y-2 border text-xs font-sans ${
                      darkMode ? 'bg-zinc-950/60 border-zinc-850' : 'bg-stone-50 border-stone-100'
                    }`}>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Items Subtotal</span>
                        <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">GST Sales Tax (16%)</span>
                        <span className="font-semibold">Rs {gstTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dashed border-stone-200 dark:border-zinc-850">
                        <span className="text-stone-400">Service Fee</span>
                        <span className="font-semibold">Rs {serviceFee}</span>
                      </div>
                      <div className="flex justify-between pt-1 font-serif text-sm font-bold text-amber-500">
                        <span>Grand Total</span>
                        <span className="text-base font-black">Rs {grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Checkout Trigger buttons */}
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-xs tracking-wide shadow-md hover:scale-[1.01] active:scale-95 transition-transform flex items-center justify-center gap-2"
                      >
                        <Send size={14} />
                        <span>Submit Order via WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${RESTAURANT_INFO.phoneFormatted}`}
                        className={`w-full py-3 rounded-xl font-semibold text-xs text-center tracking-wide border flex items-center justify-center gap-2 transition-colors ${
                          darkMode
                            ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <PhoneCall size={12} />
                        <span>Call in Order: {RESTAURANT_INFO.phone}</span>
                      </a>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom fineprint banner */}
            <div className={`p-4 text-center border-t border-stone-200/50 dark:border-zinc-900/50 text-[10px] flex items-center gap-2 justify-center ${
              darkMode ? 'bg-zinc-950 text-zinc-500' : 'bg-stone-50 text-stone-400'
            }`}>
              <Info size={12} className="text-red-500 flex-shrink-0" />
              <span>We double-verify all WhatsApp order selections before preparing.</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
