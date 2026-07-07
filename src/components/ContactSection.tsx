import { MapPin, Phone, Clock, Compass, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface ContactSectionProps {
  darkMode: boolean;
}

export default function ContactSection({ darkMode }: ContactSectionProps) {
  // Real Google Maps direct query URL for Islamabad, Pakistan I-10/2 area
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    RESTAURANT_INFO.address
  )}`;

  // Safe Google Maps Embed Iframe URL pointing to the location
  const googleMapsEmbedIframe = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13289.479633519395!2d73.02450892019484!3d33.6151242371424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94e2409f5835%3A0xc3f65e2be740df6e!2sI-10%2F2%20I-10%2C%20Islamabad%2C%20Islamabad%20Capital Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1783445000000!5m2!1sen!2s";

  return (
    <section
      id="contact"
      className={`py-24 transition-colors duration-500 overflow-hidden ${
        darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-stone-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Details & Contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-red-600 font-semibold tracking-widest text-sm uppercase block">
                Find Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Contact & Directions
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-full" />
            </div>

            <p className={`text-sm sm:text-base leading-relaxed ${
              darkMode ? 'text-zinc-400' : 'text-stone-600'
            }`}>
              Located conveniently in the bustling sector I-10/2 of Islamabad. Whether you are coming in for a celebratory dine-in experience, picking up hot takeaways, or placing a phone order, we are ready to assist you.
            </p>

            {/* Tactile contact detail blocks */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-red-600/10 text-red-500 dark:bg-red-500/5 mt-1 flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide uppercase text-amber-500">
                    Location Address
                  </h4>
                  <p className={`text-sm font-semibold mt-1 ${darkMode ? 'text-zinc-200' : 'text-stone-800'}`}>
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className={`text-xs block mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Islamabad Capital Territory, Pakistan
                  </span>
                </div>
              </div>

              {/* Phone contact */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-red-600/10 text-red-500 dark:bg-red-500/5 mt-1 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide uppercase text-amber-500">
                    Phone Ordering / Inquiry
                  </h4>
                  <p className="text-sm font-semibold mt-1">
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneFormatted}`}
                      className="hover:text-red-500 transition-colors"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </p>
                  <span className={`text-xs block mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Open for calls and WhatsApp inquiries
                  </span>
                </div>
              </div>

              {/* Business hours */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-red-600/10 text-red-500 dark:bg-red-500/5 mt-1 flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide uppercase text-amber-500">
                    Operating Hours
                  </h4>
                  <p className={`text-sm font-semibold mt-1 ${darkMode ? 'text-zinc-200' : 'text-stone-800'}`}>
                    {RESTAURANT_INFO.hours}
                  </p>
                  <span className={`text-xs block mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
                    Available daily for Dine-in & Drive-through
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action buttons row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Call Now */}
              <a
                href={`tel:${RESTAURANT_INFO.phoneFormatted}`}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm tracking-wide shadow-lg shadow-red-950/20 text-center flex items-center justify-center gap-2"
              >
                <PhoneCall size={16} />
                Call Restaurant
              </a>

              {/* Get Directions */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-6 py-4 rounded-full font-semibold text-sm tracking-wide border-2 text-center flex items-center justify-center gap-2 ${
                  darkMode
                    ? 'border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-800/20'
                    : 'border-stone-800 hover:border-stone-950 text-stone-800 hover:bg-stone-100'
                }`}
              >
                <Compass size={16} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Iframe Frame */}
          <div className="lg:col-span-7 h-[420px] relative">
            <div className="absolute inset-0 border border-stone-200/50 dark:border-zinc-800/30 rounded-3xl overflow-hidden shadow-2xl h-full w-full">
              <iframe
                src={googleMapsEmbedIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Xibai Feng Wei Yuan Restaurant Map Location"
                className={`w-full h-full grayscale ${darkMode ? 'invert contrast-125 opacity-85' : 'contrast-105'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
