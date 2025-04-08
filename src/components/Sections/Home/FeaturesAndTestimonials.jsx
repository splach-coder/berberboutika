import React, { useState } from 'react';

const FeaturesAndTestimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: "I've ordered several items to decorate my living room, and I'm delighted. The design is unique, and you can feel the authenticity in every detail.",
      author: "Sophie",
      rating: 4.5
    },
    {
      id: 2,
      text: "The quality of these handcrafted pieces is exceptional. I've received many compliments on my new pottery collection from guests.",
      author: "Thomas",
      rating: 5
    },
    {
      id: 3,
      text: "Beautiful, authentic craftsmanship. The colors are vibrant and the pieces are even more stunning in person than in the photos.",
      author: "Amina",
      rating: 4.5
    }
  ];

  // State for the current testimonial
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Empty stars to make 5 total
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  // Navigate through testimonials
  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white text-black">
      {/* Testimonials section */}
      <div className="text-center mb-16">
        <h2 className="text-2xl uppercase tracking-widest mb-16">What our customers say</h2>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial */}
          <div className="transition-opacity duration-500 min-h-40">
            <div className="flex justify-center mb-4">
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
            
            <p className="text-2xl mb-6">
              {testimonials[currentTestimonial].text}
            </p>
            
            <p className="text-gray-600 mb-8">
              — {testimonials[currentTestimonial].author}
            </p>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  currentTestimonial === index ? 'bg-gray-800 ring-2 ring-gray-300' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesAndTestimonials;