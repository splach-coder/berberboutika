import React from "react";
import Footer from "./components/Footer/Footer2";
import AppRoutes from "./routes/Routes";
import NewsletterPopup from "./components/NewsletterPopup/NewsletterPopup";

import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
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
