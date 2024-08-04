import React from "react";
import SubHeader from "./components/SubHeader/SubHeader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/Routes";

import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <div className=" overflow-x-hidden">
      <Router>
        <SubHeader />
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
