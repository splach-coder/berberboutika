import React, { useEffect } from "react";
import Footer from "./components/Footer/Footer2";
import AppRoutes from "./routes/Routes";
import NewsletterPopup from "./components/NewsletterPopup/NewsletterPopup";

import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const App = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';

    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '680509548be35b0cd4ed605c' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className=" overflow-x-hidden">
      <Router>
        <HelmetProvider>
          <AppRoutes />
          <Footer />
          <NewsletterPopup />
        </HelmetProvider>
      </Router>
    </div>
  );
};

export default App;
