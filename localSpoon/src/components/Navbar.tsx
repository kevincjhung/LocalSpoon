import * as React from 'react'

// React Router Imports
import { Outlet } from 'react-router-dom'

// MaterialUI Imports
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';



export default function Navbar() {
	const [value, setValue] = React.useState('Main');
	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const placeHolderStoreName = "Store Name";

	return (
		<>
			<nav className="">
				<div className="navbar-grid-container">
					<div className="top-left mt-3">
						<img src="/localscoop-logo.svg" alt="localscoop logo" width={35} height={35}/>
					</div>
					<div className="top-middle">
						
					</div>
					<div className="top-right mt-3">
						<p>Account</p>
					</div>
					<div className="middle-left">
						<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>{placeHolderStoreName}</Typography>
					</div>
					<div className="middle-middle">
						
					</div>
					<div className="middle-right">
						
					</div>
					<div className='bottom-left'>
						<Box sx={{ 
							margin: "0",
							padding: "0"
						 }}>
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								aria-label="secondary tabs example"
							>
								<Tab
                  value="Main"
                  label={<Link to="/seller">Main</Link>}
                />
                <Tab
                  value="Analytics"
                  label={<Link to="/seller/analytics">Analytics</Link>}
                />
                <Tab
                  value="Add A Product"
                  label={<Link to="/seller/add-product">Add A Product</Link>}
                />
                <Tab
                  value="Orders"
                  label={<Link to="/seller/orders">Orders</Link>}
                />
                <Tab
                  value="Your Shop"
                  label={<Link to="/seller/shop/123">Your Shop</Link>}
                />
              </Tabs>
						</Box>
					</div>
					<div className="bottom-middle">
						
					</div>
					<div className="bottom-right">
						
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	)
}
