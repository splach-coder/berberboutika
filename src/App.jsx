import React from "react";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";
import NewsletterPopup from './components/NewsletterPopup/NewsletterPopup'

import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className=" overflow-x-hidden">
      <Router>
        <AppRoutes />
        <Footer />
        <NewsletterPopup />
      </Router>
    </div>
  );
};

export default App;
