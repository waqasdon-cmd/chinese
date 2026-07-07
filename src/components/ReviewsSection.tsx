import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, StarHalf, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS, RESTAURANT_INFO } from '../data';

interface ReviewsSectionProps {
  darkMode: boolean;
}

export default function ReviewsSection({ darkMode }: ReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Form submit handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: formName,
      rating: formRating,
      comment: formComment,
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      isVerified: true
    };

    setReviewsList([newReview, ...reviewsList]);
    setFormSuccess(true);

    // Clear form fields
    setFormName('');
    setFormRating(5);
    setFormComment('');

    // Reset success banner after 4 seconds
    setTimeout(() => {
      setFormSuccess(false);
      setShowReviewForm(false);
    }, 3500);
  };

  // Helper to render stars
  const renderStars = (rating: number, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={size} className="fill-amber-400 stroke-amber-400" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={size} className="text-stone-300 dark:text-zinc-700" />
            <div className="absolute inset-y-0 left-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-amber-400 stroke-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} size={size} className="text-stone-300 dark:text-zinc-700" />
        );
      }
    }
    return stars;
  };

  return (
    <section
      id="reviews"
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Customer Reviews
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full" />
        </div>

        {/* Dynamic Reviews dashboard layout: Left general rating, Right list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Block: Google Rating Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className={`p-8 rounded-3xl border text-center flex flex-col items-center justify-center space-y-4 shadow-lg relative overflow-hidden ${
              darkMode
                ? 'bg-zinc-950/80 border-red-950/20'
                : 'bg-stone-50 border-stone-200'
            }`}>
              {/* Background Red/Gold mesh flare */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl" />

              <span className={`text-xs uppercase font-bold tracking-widest ${
                darkMode ? 'text-zinc-400' : 'text-stone-500'
              }`}>
                Google Rating
              </span>

              <div className="font-serif font-black text-6xl text-amber-500 tracking-tighter leading-none">
                {RESTAURANT_INFO.googleRating}
              </div>

              <div className="flex items-center gap-1">
                {renderStars(RESTAURANT_INFO.googleRating, 20)}
              </div>

              <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                Based on <strong>{RESTAURANT_INFO.reviewCount}+ Google Reviews</strong>
              </p>

              <div className="w-full pt-4 border-t border-dashed border-stone-200 dark:border-zinc-800">
                <span className="font-serif font-bold text-lg text-red-500">50+</span>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-stone-500'} mt-1`}>
                  Happy Customers Daily
                </p>
              </div>
            </div>

            {/* Quick Action Button to toggle form */}
            <button
              onClick={() => {
                if (formSuccess) return;
                setShowReviewForm(!showReviewForm);
              }}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 border transition-all duration-300 ${
                showReviewForm
                  ? 'bg-stone-150 border-stone-300 text-stone-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-transparent hover:scale-[1.02]'
              }`}
            >
              <MessageSquarePlus size={18} />
              <span>{showReviewForm ? 'Cancel Review' : 'Write a Google Review'}</span>
            </button>
          </div>

          {/* Right Block: Reviews List & Input Form (Collapsible) */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {/* Expandable Write a Review Form block */}
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className={`p-6 rounded-3xl border ${
                    darkMode
                      ? 'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-red-950/5'
                      : 'bg-stone-50 border-stone-200 text-stone-900 shadow-stone-200/40'
                  }`}>
                    {formSuccess ? (
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-8 flex flex-col items-center justify-center text-center space-y-3"
                      >
                        <CheckCircle size={44} className="text-green-500 animate-pulse" />
                        <h4 className="font-serif font-bold text-lg text-green-500">Review Submitted!</h4>
                        <p className={`text-xs max-w-xs ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                          Thank you for sharing your experience. Your review is listed below.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <h4 className="font-serif font-bold text-lg">We Value Your Feedback</h4>

                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className={`text-xs font-semibold uppercase tracking-wider ${
                            darkMode ? 'text-zinc-400' : 'text-stone-500'
                          }`}>
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Waqas Ahmed"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className={`w-full py-2.5 px-4 rounded-xl text-sm border outline-none transition-all ${
                              darkMode
                                ? 'bg-zinc-900 border-zinc-850 text-white focus:border-red-500/50'
                                : 'bg-white border-stone-200 text-stone-900 focus:border-red-500/50'
                            }`}
                          />
                        </div>

                        {/* Star selector */}
                        <div className="space-y-1">
                          <label className={`text-xs font-semibold uppercase tracking-wider block ${
                            darkMode ? 'text-zinc-400' : 'text-stone-500'
                          }`}>
                            Overall Rating
                          </label>
                          <div className="flex items-center gap-1 pt-1">
                            {[1, 2, 3, 4, 5].map((num) => {
                              const isFilled = num <= formRating;
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setFormRating(num)}
                                  className="text-amber-400 focus:outline-none hover:scale-110 transition-transform"
                                >
                                  <Star
                                    size={24}
                                    className={isFilled ? 'fill-amber-400 stroke-amber-400' : 'text-stone-300 dark:text-zinc-800'}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Feedback comment input */}
                        <div className="space-y-1">
                          <label className={`text-xs font-semibold uppercase tracking-wider ${
                            darkMode ? 'text-zinc-400' : 'text-stone-500'
                          }`}>
                            Your Comment
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Describe your dining experience, dumplings, service..."
                            value={formComment}
                            onChange={(e) => setFormComment(e.target.value)}
                            className={`w-full py-2.5 px-4 rounded-xl text-sm border outline-none transition-all resize-none ${
                              darkMode
                                ? 'bg-zinc-900 border-zinc-850 text-white focus:border-red-500/50'
                                : 'bg-white border-stone-200 text-stone-900 focus:border-red-500/50'
                            }`}
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md hover:scale-[1.01] transition-transform"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonials list grid with entry motions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {reviewsList.map((review, index) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow duration-300 ${
                      darkMode
                        ? 'bg-zinc-950 border-red-950/15'
                        : 'bg-stone-50 border-stone-200/80'
                    }`}
                  >
                    {/* Stars and date row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {renderStars(review.rating, 14)}
                      </div>
                      <span className={`text-[11px] ${darkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
                        {review.date}
                      </span>
                    </div>

                    {/* Review text comment */}
                    <p className={`text-xs sm:text-sm italic leading-relaxed ${
                      darkMode ? 'text-zinc-300' : 'text-stone-700'
                    }`}>
                      "{review.comment}"
                    </p>

                    {/* Author block with avatar */}
                    <div className="flex items-center gap-3 pt-3 border-t border-dashed border-stone-200/50 dark:border-zinc-800/50">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-9 h-9 rounded-full object-cover border border-amber-500/20"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white font-serif font-black flex items-center justify-center text-xs">
                          {review.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold font-serif">{review.name}</h4>
                          {review.isVerified && (
                            <ShieldCheck size={12} className="text-blue-500" title="Verified Customer" />
                          )}
                        </div>
                        <span className={`text-[10px] block ${darkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
                          Local Guide • Islamabad
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
