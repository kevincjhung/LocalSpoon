// Library Imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// Styling Imports
import theme from './theme';
import './App.css';

// Page imports
import Home from './pages/Home';
import CreateStore from './pages/seller/CreateStorePage';
import SellerLanding from './pages/seller/SellerLandingPage';
import Analytics from './pages/seller/AnalyticsPage';
import ProductPosting from './pages/seller/ProductPostingPage';
import SellerOrders from './pages/seller/SellerOrdersPage';
import Shop from './pages/seller/ShopPage';


// Component imports
import SellerNavbar from './components/SellerNavbar';
import ThreeColumnsInfiniteScroll from './components/explore/ThreeColumnsInfiniteScroll';
import ExplorePage from './pages/buyer/ExplorePage';


function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/seller/*"
              element={<SellerNavbar />}
            >
              <Route path="create-store" element={<CreateStore />} />
              <Route index element={<SellerLanding />} />
              <Route path="analytics" element={<Analytics />}>
                <Route path="dashboard" index element={<div>Dashboard</div>} />
                <Route path="sales-analytics" element={<div>Sales Analytics</div>} />
                <Route path="purchase-order-analytics" element={<div>Purchase Order Analytics</div>} />
                <Route path="top-sellers" element={<div>Top Sellers</div>} />
                <Route path="revenue-analytics" element={<div>Revenue Analytics</div>} />
              </Route>
              <Route path="add-product" element={<ProductPosting />} />
              <Route path="orders" element={<SellerOrders />} />
              <Route path="shop/:shopID" element={<Shop />} />
            </Route>
            <Route path='/buyer/*' >
              <Route path='explore' element={<ExplorePage />} />
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
