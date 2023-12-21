// Library Imports
import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// Styling Imports
import './App.css'

// Page imports
import Home from './pages/Home'

import CreateStore from './pages/seller/CreateStorePage'
import SellerLanding from './pages/seller/SellerLandingPage'
import Analytics from './pages/seller/AnalyticsPage'
import ProductPosting from './pages/seller/ProductPostingPage'
import SellerOrders from './pages/seller/SellerOrdersPage'
import Shop from './pages/seller/ShopPage'


function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
      <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/seller/create-store" className="nav-link">SellerCreateStore</Link></li>
            <li className="nav-item"><Link to="/seller" className="nav-link">SellerLanding</Link></li>
            <li className="nav-item"><Link to="/seller/analytics" className="nav-link">SellerAnalytics</Link></li>
            <li className="nav-item"><Link to="/seller/post-product" className="nav-link">SellerPostProduct</Link></li>
            <li className="nav-item"><Link to="/seller/orders" className="nav-link">SellerOrders</Link></li>
            <li className="nav-item"><Link to="/seller/shop/123" className="nav-link">SellerShopPage</Link></li>  {/* This route needs to be changed so it uses the shopID of the currently logged in seller */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller/create-store" element={<CreateStore />} />
          <Route path="/seller" element={<SellerLanding />} />
          <Route path="/seller/analytics" element={<Analytics />} />
          <Route path="/seller/post-product" element={<ProductPosting />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/shop/:shopID" element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App