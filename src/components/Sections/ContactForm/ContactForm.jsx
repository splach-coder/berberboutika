import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const [status, setStatus] = useState({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formData.name || !formData.email) {
        throw new Error('Name and email are required');
      }

      const response = await fetch('https://script.google.com/macros/s/AKfycbz6Up0XO55t9r4-RSBlqDyhkUsgiW-l3THnrtbGDh5UHlS1B4AJL_fcEK3ZYRRkhrWk9Q/exec', {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
            'Authorization': 'Bearer AKfycbwCI2ecelf1Rf4q0D6NaD-OphggPI-N8DL8fip9olnm', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', phone: '', comment: '' });

      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: error.message || 'There was an error sending your message. Please try again.'
      });

      setTimeout(() => setStatus({ type: null, message: '' }), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">CONTACT US</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
        </div>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500" />
        <textarea name="comment" value={formData.comment} onChange={handleChange} placeholder="Comment" rows="6" className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 resize-y"></textarea>
        <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-6 text-white font-bold bg-black hover:bg-gray-800 focus:outline-none transition duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}>{isSubmitting ? 'SENDING...' : 'SEND'}</button>
        {status.type === 'success' && <div className="p-4 bg-green-100 text-green-800 rounded text-center">{status.message}</div>}
        {status.type === 'error' && <div className="p-4 bg-red-100 text-red-800 rounded text-center">{status.message}</div>}
      </form>
    </div>
  );
}

export default ContactForm;