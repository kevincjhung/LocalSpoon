// React Router Imports
import { Outlet } from 'react-router-dom'


export default function Navbar() {
	return (
		<>
			<nav className="">
				<div className="navbar-grid-container">
					<div className="top-left">
						<p>A</p>
					</div>
					<div className="top-middle">
						<p>B</p>
					</div>
					<div className="top-right">
						<p>C</p>
					</div>
					<div className="middle-left">
						<p>D</p>
					</div>
					<div className="middle-middle">
						<p>E</p>
					</div>
					<div className="middle-right">
						<p>F</p>
					</div>
					<div className='bottom-left'>
						<p>G</p>
					</div>
					<div className="bottom-middle">
						<p>H</p>
					</div>
					<div className="bottom-right">
						<p>I</p>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	)
}
