// Library Imports
import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import Navbar from './components/Navbar'

function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path='/seller/*'
            element={<Navbar />}
          >
            <Route path="create-store" element={<CreateStore />} />
            <Route index element={<SellerLanding />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="post-product" element={<ProductPosting />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="shop/:shopID" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App