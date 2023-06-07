import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Catalog from './components/catalog';
import { Cart } from './pages/cart/cart';
import './App.css';
import { ShopContextProvider } from './context/shop-context'; // Import the ShopContextProvider

function App() {
  return (
    <div className="App">
      <ShopContextProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
