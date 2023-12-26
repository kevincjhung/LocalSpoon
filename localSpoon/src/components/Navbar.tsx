// React Router Imports
import { Outlet } from 'react-router-dom'


export default function Navbar() {
	return (
		<>
			<nav className="">
				<div className="navbar-grid-container">
					<div><p>AAAAA</p></div>
					<div><p>BBBBB</p></div>
					<div><p>CCCCC</p></div>
					<div><p>DDDDD</p></div>
					<div><p>EEEEE</p></div>
					<div><p>FFFFF</p></div>
					<div><p>GGGGG</p></div>
					<div><p>HHHHH</p></div>
					<div><p>IIIII</p></div>
				</div>
			</nav>
			<Outlet />
		</>
	)
}
