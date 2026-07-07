import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, Coffee, Sparkles, CheckCircle, Info, Sofa, MapPin, X } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  darkMode: boolean;
}

type DiningZone = 'main' | 'window' | 'booth' | 'private';

export default function ReservationSection({ darkMode }: ReservationSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedZone, setSelectedZone] = useState<DiningZone>('main');

  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Quick table selector metadata
  const zones: { id: DiningZone; label: string; description: string; capacity: string; icon: string }[] = [
    { id: 'main', label: 'Imperial Main Hall', description: 'Surrounded by rich Chinese lantern lighting and live music background.', capacity: '2-12 Guests', icon: 'Utensils' },
    { id: 'window', label: 'Street Side View', description: 'Sits alongside our full-glass windows looking out onto Street 11.', capacity: '2-4 Guests', icon: 'Compass' },
    { id: 'booth', label: 'Cozy Velvet Booths', description: 'Semi-private plush seating configurations perfect for close family chats.', capacity: '2-6 Guests', icon: 'Sofa' },
    { id: 'private', label: 'Jade Palace Private Room', description: 'Completely separated luxury suites for corporate or private banquets.', capacity: '6-16 Guests', icon: 'Sparkles' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    // Build unique reservation object
    const booking: Reservation = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      phone,
      email,
      guests,
      date,
      time,
      specialRequests,
      createdAt: new Date().toLocaleDateString()
    };

    setActiveReservation(booking);
    setShowConfirmation(true);

    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setGuests(2);
    setDate('');
    setSpecialRequests('');
    setSelectedZone('main');
  };

  return (
    <section
      id="reservation"
      className={`py-24 transition-colors duration-500 overflow-hidden relative ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
      }`}
    >
      {/* Decorative Traditional circle lattice behind */}
      <div className="absolute left-0 bottom-0 h-96 w-96 opacity-5 pointer-events-none border border-red-500 rounded-full flex items-center justify-center">
        <div className="h-80 w-80 border border-dashed border-red-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            Table Booking
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Reserve Your Table
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
          <p className={`text-base sm:text-lg ${darkMode ? 'text-zinc-300' : 'text-stone-600'}`}>
            Plan ahead and guarantee your dining spot. We accommodate walk-ins, but table reservations are highly recommended for peak weekend dining hours.
          </p>
        </div>

        {/* Booking Container: Left Form, Right Interactive Zone Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Form frame */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl h-full flex flex-col justify-between ${
              darkMode
                ? 'bg-zinc-900/40 border-red-950/20'
                : 'bg-white border-stone-200'
            }`}>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Waqas Ahmed"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full py-3 px-4 rounded-xl text-sm border outline-none transition-all ${
                          darkMode
                            ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                            : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 314 7798881"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full py-3 px-4 rounded-xl text-sm border outline-none transition-all ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. waqas@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full py-3 px-4 rounded-xl text-sm border outline-none transition-all ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                      }`}
                    />
                  </div>

                  {/* Number of Guests Selector */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Number of Guests
                    </label>
                    <div className="flex items-center border rounded-xl overflow-hidden divide-x dark:divide-zinc-800 ${
                      darkMode ? 'border-zinc-850 bg-zinc-950' : 'border-stone-200 bg-stone-50'
                    }">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className={`py-3 px-4 text-sm font-bold flex-1 hover:bg-stone-100 dark:hover:bg-zinc-900 transition-colors ${
                          darkMode ? 'text-zinc-400' : 'text-stone-600'
                        }`}
                      >
                        -
                      </button>
                      <div className="py-3 px-6 text-sm font-bold w-16 text-center">
                        {guests}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        className={`py-3 px-4 text-sm font-bold flex-1 hover:bg-stone-100 dark:hover:bg-zinc-900 transition-colors ${
                          darkMode ? 'text-zinc-400' : 'text-stone-600'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full py-3 px-4 rounded-xl text-sm border outline-none transition-all ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                      }`}
                    />
                  </div>

                  {/* Time Selector */}
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold uppercase tracking-wider block ${
                      darkMode ? 'text-zinc-400' : 'text-stone-500'
                    }`}>
                      Dining Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full py-3.5 px-4 rounded-xl text-sm border outline-none transition-all ${
                        darkMode
                          ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                          : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                      }`}
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:00">01:00 PM (Lunch)</option>
                      <option value="14:00">02:00 PM (Lunch)</option>
                      <option value="15:00">03:00 PM (Lunch)</option>
                      <option value="18:00">06:00 PM (Dinner)</option>
                      <option value="18:30">06:30 PM (Dinner)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:00">08:00 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:00">09:00 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Dinner)</option>
                      <option value="22:00">10:00 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests textarea */}
                <div className="space-y-1.5">
                  <label className={`text-xs font-semibold uppercase tracking-wider block ${
                    darkMode ? 'text-zinc-400' : 'text-stone-500'
                  }`}>
                    Special Requests / Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Birthday setting request, allergies, baby chair requirement..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className={`w-full py-3 px-4 rounded-xl text-sm border outline-none transition-all resize-none ${
                      darkMode
                        ? 'bg-zinc-950 border-zinc-850 text-white focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                        : 'bg-stone-50 border-stone-200 text-stone-900 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm tracking-wide shadow-lg shadow-red-950/20 hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CalendarIcon size={18} />
                  <span>Reserve Table Now</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Dining Room Zone Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex-grow flex flex-col justify-between ${
              darkMode
                ? 'bg-zinc-900/40 border-red-950/20'
                : 'bg-white border-stone-200'
            }`}>
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest font-mono">
                  Room Configuration
                </span>
                <h3 className="font-serif font-black text-xl">
                  Select Seating Zone
                </h3>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                  Custom tailors your experience. Click a block zone to assign your preferred layout setting for your booking.
                </p>
              </div>

              {/* 4 Dining Zones layout selection */}
              <div className="grid grid-cols-1 gap-4 my-6">
                {zones.map((zone) => {
                  const isSelected = selectedZone === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZone(zone.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-300 outline-none ${
                        isSelected
                          ? 'bg-red-600/10 border-red-600 text-red-500 shadow-md scale-[1.01]'
                          : darkMode
                          ? 'bg-zinc-950/50 border-zinc-850 text-zinc-300 hover:border-zinc-700'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl mt-0.5 flex items-center justify-center ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : darkMode
                          ? 'bg-zinc-900 text-zinc-500'
                          : 'bg-white border border-stone-200 text-stone-400'
                      }`}>
                        {zone.id === 'booth' ? <Sofa size={16} /> : <Coffee size={16} />}
                      </div>

                      <div className="space-y-0.5 flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-sm leading-none">{zone.label}</h4>
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-red-600/20 text-red-400'
                              : 'bg-stone-100 dark:bg-zinc-900 text-stone-500 dark:text-zinc-400'
                          }`}>
                            {zone.capacity}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-snug ${
                          isSelected
                            ? darkMode ? 'text-zinc-300' : 'text-stone-700'
                            : darkMode ? 'text-zinc-500' : 'text-stone-500'
                        }`}>
                          {zone.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Advisory note */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500 text-xs">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <p className="leading-snug">
                  There are no reservations deposit fees! Cancellations or delays? Please notify us by calling +92 314 7798881.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && activeReservation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-lg rounded-3xl overflow-hidden border p-6 sm:p-8 shadow-2xl relative ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className={`absolute top-4 right-4 p-2 rounded-full border transition-colors outline-none ${
                  darkMode ? 'border-zinc-800 text-zinc-500 hover:text-white' : 'border-stone-100 text-stone-400 hover:text-stone-900'
                }`}
                aria-label="Close Confirmation Modal"
              >
                <X size={16} />
              </button>

              <div className="text-center space-y-6">
                {/* Check circle graphic */}
                <div className="w-14 h-14 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle size={32} className="animate-bounce" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 font-mono">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif font-black text-2xl">
                    Your Table is Booked!
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Thank you, {activeReservation.name}. We look forward to hosting you.
                  </p>
                </div>

                {/* Booking receipt details */}
                <div className={`p-5 rounded-2xl border text-left space-y-3.5 font-sans ${
                  darkMode ? 'bg-zinc-950/50 border-zinc-850' : 'bg-stone-50 border-stone-100'
                }`}>
                  <div className="flex items-center justify-between border-b border-dashed border-stone-200 dark:border-zinc-800 pb-2.5">
                    <span className="text-xs text-stone-400 dark:text-zinc-500 uppercase font-medium">Booking ID</span>
                    <span className="font-mono text-xs font-bold text-red-500">{activeReservation.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-stone-400 dark:text-zinc-500 uppercase font-medium block mb-1">Guests</span>
                      <span className="font-bold flex items-center gap-1.5">
                        <Users size={12} className="text-amber-500" />
                        {activeReservation.guests} People
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 dark:text-zinc-500 uppercase font-medium block mb-1">Zone Setting</span>
                      <span className="font-bold flex items-center gap-1.5 uppercase">
                        <Sofa size={12} className="text-amber-500" />
                        {selectedZone}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-stone-400 dark:text-zinc-500 uppercase font-medium block mb-1">Date</span>
                      <span className="font-bold flex items-center gap-1.5">
                        <CalendarIcon size={12} className="text-amber-500" />
                        {activeReservation.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 dark:text-zinc-500 uppercase font-medium block mb-1">Time</span>
                      <span className="font-bold flex items-center gap-1.5">
                        <Clock size={12} className="text-amber-500" />
                        {activeReservation.time}
                      </span>
                    </div>
                  </div>

                  {activeReservation.specialRequests && (
                    <div className="border-t border-dashed border-stone-200 dark:border-zinc-800 pt-2.5 text-xs">
                      <span className="text-stone-400 dark:text-zinc-500 uppercase font-medium block mb-1">Dietary / Requests</span>
                      <p className={`italic ${darkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
                        "{activeReservation.specialRequests}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Location address recall */}
                <div className="flex items-center gap-2 text-left justify-center text-xs text-stone-400 dark:text-zinc-500">
                  <MapPin size={12} className="text-red-500" />
                  <span>Street 11, I-10/2, Islamabad, Pakistan</span>
                </div>

                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 text-white font-semibold text-sm rounded-xl tracking-wide dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors"
                >
                  Close & Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
