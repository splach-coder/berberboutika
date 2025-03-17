import React, { useState, useEffect } from 'react';
import './NewsletterPopup.css'; // You'll need to create this CSS file

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    const lastPopupTime = localStorage.getItem('lastPopupTime');
    const currentTime = Date.now();
    
    // Show popup if:
    // 1. First time visitor (hasVisitedBefore is null)
    // 2. OR it's been at least 7 days since the last popup was shown
    if (!hasVisitedBefore || (lastPopupTime && (currentTime - parseInt(lastPopupTime)) > 7 * 24 * 60 * 60 * 1000)) {
      // Delay popup appearance by 5 seconds for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Update localStorage
        localStorage.setItem('hasVisitedBefore', 'true');
        localStorage.setItem('lastPopupTime', currentTime.toString());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!firstName) {
      errors.firstName = "Le prénom est requis";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // You would replace this with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          birthday,
        }),
      });
      
      if (response.ok) {
        // Success - store that user has subscribed
        localStorage.setItem('hasSubscribed', 'true');
        alert('Merci de vous être inscrit! Votre code de réduction de 10% sera envoyé à votre email.');
        closePopup();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  // Don't render anything if popup is not visible
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={closePopup}>×</button>
        
        <div className="popup-content">
          <div className="popup-left">
            <div className="popup-tagline">Restez Dans la Loop !</div>
            <h2 className="popup-title">REJOIGNEZ LA CHABI FAMILY</h2>
            <p className="popup-description">
              Inscrivez vous à la newsletter et profitez de -10% sur votre première commande
            </p>
            
            <form onSubmit={handleSubmit} className="popup-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={formErrors.firstName ? "input-error" : ""}
                  />
                  {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "input-error" : ""}
                />
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Anniversaire (JOUR/MOIS)"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>
              
              <button type="submit" className="submit-button">INSCRIVEZ-MOI !</button>
            </form>
            
            <button onClick={closePopup} className="no-thanks">Non, Merci.</button>
          </div>
          
          <div className="popup-right">
            {/* Image will be set via CSS background in the NewsletterPopup.css file */}
            <div className="sun-icon">☀️</div>
            <div className="crafter-icon">🧑‍🍳</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;