import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const FullWidthNewsletter = () => {
  const [email, setEmail] = useState('');
  const [state, handleSubmit] = useForm("xdkegkqp");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      setEmail('');
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    await handleSubmit(e);
  };

  return (
    <section className="w-full bg-primary-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-2xl md:text-3xl font-medium text-primary-dark">
              Stay Updated with Our Artisan Creations
            </h3>
            <p className="text-primary-black opacity-90">
              Join our newsletter for exclusive previews and Moroccan craftsmanship stories.
            </p>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 w-full">
            <form onSubmit={handleSubmitForm} className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Your email address"
                    className="w-full px-5 py-3 rounded-sm border border-primary-dark border-opacity-20 focus:border-opacity-100 transition-all duration-200 bg-background-light text-primary-black placeholder-primary-dark placeholder-opacity-50 focus:outline-none"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="absolute -bottom-5 left-0 text-xs text-red-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-button-dark hover:bg-button-darkHover text-background-light rounded-sm font-medium whitespace-nowrap transition-colors duration-200"
                >
                  {state.submitting ? 'Sending...' : 'Subscribe'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary-dark text-background-light px-6 py-3 rounded-sm shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Thank you for subscribing!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FullWidthNewsletter;