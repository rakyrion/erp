import './Sidebar.css'
import { NavLink } from 'react-router-dom'
function Sidebar() {
    return (
        <div className="sidebar__container">
            <NavLink to='/dashboard' className={'reactLink'}><h2 className="sidebar__link">Dashboard</h2></NavLink>
            <NavLink to ='/customers' className={'reactLink'}><h2 className="sidebar__link">Customers</h2></NavLink>
            <NavLink to='/inventory' className={'reactLink'}><h2 className="sidebar__link">Inventory</h2></NavLink>
            <NavLink to='/estimates' className={'reactLink'}><h2 className="sidebar__link">Estimates</h2></NavLink>
            <NavLink to='/invoices' className={'reactLink'}><h2 className="sidebar__link">Invoices</h2></NavLink>
        </div>

    )
}

export default Sidebar