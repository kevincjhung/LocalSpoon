// React Router Imports
import { Outlet } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import * as React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
	const [value, setValue] = React.useState('Main');
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const placeHolderStoreName = "Store Name";

	return (
		<>
			<nav className="">
				<div className="navbar-grid-container">
					<div className="top-left">
						
					</div>
					<div className="top-middle">
						
					</div>
					<div className="top-right">
						
					</div>
					<div className="middle-left">
						<h1 className="text-xl">{placeHolderStoreName}</h1>
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
								textColor="primary"
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
