import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import * as React from 'react';

import PastSalesByStoreLinechartCard from '../../components/analytics/PastSalesByStoreLinechartCard';
import TopSellingProductsByQuantityCard from '../../components/analytics/TopSellingProductsByQuantityCard';
import TopSellingProductsByRevenueCard from '../../components/analytics/TopSellingProductsByRevenueCard';
import PastSalesByMonth from '../../components/analytics/PastSalesByMonth';

export default function AnalyticsPage() {
  const [value, setValue] = React.useState('Analytics Dashboard');
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="analytics-page-content">
      <div className="analytics-page-secondary-navbar ">
        <div className='mb-1'>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab
                value="Analytics Dashboard"
                label={<Link to="/seller/analytics/dashboard">Analytics Dashboard</Link>}
              />
              <Tab
                value="Sales Analytics"
                label={<Link to="/seller/analytics/sales-analytics">Sales Analytics</Link>}
              />
              <Tab
                value="Purchase Order Analytics"
                label={<Link to="/seller/analytics/purchase-order-analytics">Purchase Order Analytics</Link>}
              />
              <Tab
                value="Top Sellers Analytics"
                label={<Link to="/seller/analytics/top-sellers">Top Sellers</Link>}
              />
              <Tab
                value="Revenue Analytics"
                label={<Link to="/seller/analytics/revenue-analytics">Revenue Analytics</Link>}
              />
            </Tabs>
          </Box>
        </div>
      </div>
      <div className="analytics-page-grid-container">
        <div className="analytics-page-top-row">
          <PastSalesByStoreLinechartCard storeId={1}/>
        </div>
        <div className="analytics-page-bottom-row">
          <div className="analytics-bottom-container analytics-bottom-left">
            <TopSellingProductsByQuantityCard />
          </div>
          <div className="analytics-bottom-container">
            <PastSalesByMonth storeId={1}/>
          </div>
          <div className="analytics-bottom-container analytics-bottom-right">
            <TopSellingProductsByRevenueCard />
          </div>
        </div>
      </div>
    </div>
  )
}