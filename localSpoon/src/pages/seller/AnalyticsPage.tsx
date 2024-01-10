import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import * as React from 'react';


export default function AnalyticsPage() {
  const [value, setValue] = React.useState('Main');
	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

  return (
    <>
      <div className="analytics-page-secondary-navbar">
        <div className=''>
          <Box sx={{
            margin: "0",
            padding: "0"
          }}>
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
                label={<Link to="/seller/analytics/sales-analytics">Purchase Order Analytics</Link>}
              />
              <Tab
                value="Top Sellers Analytics"
                label={<Link to="/seller/analytics/purchase-order-analytics">Top Sellers</Link>}
              />
              <Tab
                value="Revenue Analytics"
                label={<Link to="/seller/analytics/top-sellers">Revenue Analytics</Link>}
              />
            </Tabs>
          </Box>
        </div>
      </div>
      <div className="analytics-page-grid-container">
        <div className="analytics-page-left-column">
          <p>Left Column</p>

        </div>
        <div className="analytics-page-right-column">
          <div className="analytics-page-top-card">Top Card</div>
          <div className="analytics-page-bottom-card">Bottom Card</div>
        </div>
      </div>
    </>
  )
}