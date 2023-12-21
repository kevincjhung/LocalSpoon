import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function Layout() {
	return (
		<>
			<div className="navbar">
				<ul className="nav-list">
					<li className="nav-item"><Link to="/seller/create-store" className="nav-link">SellerCreateStore</Link></li>
					<li className="nav-item"><Link to="/seller" className="nav-link">SellerLanding</Link></li>
					<li className="nav-item"><Link to="/seller/analytics" className="nav-link">SellerAnalytics</Link></li>
					<li className="nav-item"><Link to="/seller/post-product" className="nav-link">SellerPostProduct</Link></li>
					<li className="nav-item"><Link to="/seller/orders" className="nav-link">SellerOrders</Link></li>
					<li className="nav-item"><Link to="/seller/shop/123" className="nav-link">SellerShopPage</Link></li>  {/* This route needs to be changed so it uses the shopID of the currently logged in seller */}
				</ul>
			</div>
			<Outlet />
		</>
	)
}