import React from 'react';
import ProductGrid from '../components/Sections/Search/ProductGrid';
import Header from "../components/Header/Header";

const Search = () => {
  return (
    <div className="bg-white">   
    <Header enableHoverEffect={false} />   
        <div className="mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-8 text-center">RÉSULTATS DE LA RECHERCHE</h2>
          <ProductGrid />
        </div>
    </div>
  );
};

export default Search;