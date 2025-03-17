import React from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';

const PaymentPolicyComponent = () => {
  return (
    <div className="pt-40 pb-16 max-w-4xl mx-auto p-6 bg-white text-black">
      <h2 className="text-3xl font-light mb-8 border-b pb-4">Our Payment Policy</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Etsy Payment Option */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <div className="h-16 bg-black flex items-center justify-center">
            <span className="text-white font-medium text-xl">Etsy Payment</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              For secure transactions, we redirect all payments to our Etsy store. This ensures your purchase is protected and traceable.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-600">Browse and select items on our website</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-600">Click checkout to go to our Etsy shop</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <span className="text-gray-600">Complete payment through Etsy's secure system</span>
              </div>
            </div>
            
            <a 
              href="https://www.etsy.com/shop/yourshop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-black border-b border-black pb-1 hover:text-gray-700 hover:border-gray-700"
            >
              <span className="mr-2">Visit our Etsy store</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        {/* WhatsApp Order Option */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200">
          <div className="h-16 bg-green-600 flex items-center justify-center">
            <span className="text-white font-medium text-xl">WhatsApp Order</span>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Prefer a more personal touch? Order directly through WhatsApp for custom requests and personalized assistance.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <span className="text-gray-600">Message us with your product selection</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <span className="text-gray-600">Share your shipping details</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <span className="text-gray-600">Receive payment instructions and confirm</span>
              </div>
            </div>
            
            <a 
              href="https://wa.me/yournumber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={16} className="mr-2" />
              <span>Order via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
        <p className="text-gray-600 text-sm">
          For both payment methods, our artisanal products are carefully prepared for shipping once payment is confirmed. 
          For any questions regarding your order, feel free to contact our customer service team.
        </p>
      </div>
    </div>
  );
};

export default PaymentPolicyComponent;