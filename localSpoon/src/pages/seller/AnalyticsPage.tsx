// import TopSellingProducts from "../../components/analytics/TopSellingProducts"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';



export default function AnalyticsPage() {
  return (
    <div>
      <div className="analytics-page-secondary-navbar">
        <div className=''>
          <Box sx={{
            margin: "0",
            padding: "0"
          }}>
            <Tabs
              // value={value}
              // onChange={handleChange}
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab
                value="Analytics Dashboard"
                label={<Link to="/seller">Analytics Dashboard</Link>}
              />
              <Tab
                value="Sales Analytics"
                label={<Link to="/seller/analytics">Sales Analytics</Link>}
              />
              <Tab
                value="Customer Orders"
                label={<Link to="/seller/add-product">Purchase Order Analytics</Link>}
              />
              <Tab
                value="Orders"
                label={<Link to="/seller/orders">Top Sellers</Link>}
              />
              <Tab
                value="Your Shop"
                label={<Link to="/seller/shop/123">Revenue Analytics</Link>}
              />
            </Tabs>
          </Box>
        </div>
      </div>
      <div className="analytics-page-grid-container">
        <div className="analytics-page-left-column">Left Column</div>
        <div className="analytics-page-right-column">
          <div className="analytics-page-top-card">Top Card</div>
          <div className="analytics-page-bottom-card">Bottom Card</div>
        </div>
      </div>
    </div>
  )
}