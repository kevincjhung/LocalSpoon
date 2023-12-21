import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

const Home = () => <div><p>Home</p></div>
const CreateStore = () => <div><p>Create a Store</p></div>;
const SellerLanding = () => <div><p>Seller Landing</p></div>;
const Analytics = () => <div><p>Analytics</p></div>;
const ProductPosting = () => <div><p>Product Posting</p></div>;
const SellerOrders = () => <div><p>Orders from Customers for a Given Seller</p></div>;
const ShopLanding = () => <div><p>Shop Landing Page</p></div>;


function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
      <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/create-store" className="nav-link">Create a Store</Link></li>
            <li className="nav-item"><Link to="/seller" className="nav-link">Seller Landing</Link></li>
            <li className="nav-item"><Link to="/seller/analytics" className="nav-link">Analytics</Link></li>
            <li className="nav-item"><Link to="/seller/post-product" className="nav-link">Product Posting</Link></li>
            <li className="nav-item"><Link to="/seller/orders" className="nav-link">Orders</Link></li>
            <li className="nav-item"><Link to="/seller/shop" className="nav-link">Shop</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/seller" element={<SellerLanding />} />
          <Route path="/seller/analytics" element={<Analytics />} />
          <Route path="/seller/post-product" element={<ProductPosting />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/shop" element={<ShopLanding />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
