import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [state, handleSubmit] = useForm("xdkegkqp"); // Use the same Formspree form ID
  const [status, setStatus] = useState({
    type: null,
    message: ''
  });

  useEffect(() => {
    // Handle successful submission
    if (state.succeeded) {
      setStatus({ 
        type: 'success', 
        message: 'Your message has been sent successfully!' 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        comment: ''
      });

      // Clear status after 3 seconds
      const timer = setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      setStatus({
        type: 'error',
        message: 'Name and email are required'
      });
      return;
    }

    // Proceed with Formspree submission
    await handleSubmit(e);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10 pt-32 lg:pt-48 text-black">
      <h1 className="text-3xl font-bold text-center mb-10">CONTACT US</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 bg-white" 
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="E-mail" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 bg-white" 
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </div>
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="Phone number" 
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 bg-white" 
        />
        <textarea 
          name="comment" 
          value={formData.comment} 
          onChange={handleChange} 
          placeholder="Comment" 
          rows="6" 
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 resize-y bg-white"
        ></textarea>
        <button 
          type="submit" 
          disabled={state.submitting}
          className={`w-full py-4 px-6 text-white font-bold bg-button-dark hover:bg-button-darkHover focus:outline-none transition duration-200 ${state.submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {state.submitting ? 'SENDING...' : 'SEND'}
        </button>

        {status.type === 'success' && (
          <div className="p-4 bg-green-100 text-green-800 rounded text-center">
            {status.message}
          </div>
        )}
        {status.type === 'error' && (
          <div className="p-4 bg-red-100 text-red-800 rounded text-center">
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;