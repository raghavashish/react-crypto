import React from 'react';
import {Routes, Route} from 'react-router-dom'
import CryptoDetailView from './components/CryptoDetailView';
import CryptoListView from "./components/CryptoListView";

function PrivateRoute() {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<CryptoListView />} 
        />
        <Route 
          path="coin/:id" 
          element={<CryptoDetailView />} 
        />
      </Routes>
    </>
  );
}

export default PrivateRoute;