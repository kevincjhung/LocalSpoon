import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<>
			<nav className="navbar">
				<ul className="nav-list">
					<li className="nav-item">
						<Link to="/seller/create-store" className="nav-link">
							Main
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/seller" className="nav-link">
							Analytics
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/seller/analytics" className="nav-link">
							News Update
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/seller/post-product" className="nav-link">
							Add A Product
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/seller/orders" className="nav-link">
							Orders
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/seller/shop/123" className="nav-link">
							Your Shop
						</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}