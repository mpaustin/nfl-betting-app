import { Link } from "react-router-dom"
import React from "react"

const BetNavComponent: React.FC = () => {
    return(
    <nav className="nav-bar">
        <ul>
        <li><Link to="/betting/games" className="nav_buttons">View Games</Link></li>
        <li><Link to="/betting/bets" className="nav_buttons">View Bets</Link></li>
        <li><Link to="/betting/profile" className="nav_buttons">Profile</Link></li>
        <li><Link to="/login" className="nav_buttons">Logout</Link></li>
        </ul>
    </nav>
    )
}
export default BetNavComponent;