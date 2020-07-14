import React from 'react';

import { Link } from 'react-router-dom';
/**interface ETableComponentProps {
    employees: any[];
}**/
const SideMenuComponent: React.FC = () => {
    

    return(
        <div id="sidebar_div">
                
                <ul id="sidebar_ul">
                <h3>Betting</h3>
                <li><Link to="/login">Betting</Link></li>
                <h3>Stats</h3>
                <li><Link to="/stats/leaders">League Leaders</Link></li>
                <li><Link to="/stats/individuals">Individuals</Link></li>
                <li><Link to="/stats/teams">Teams</Link></li>
                {/* <li><Link to="/pprofiles">Profiles</Link></li> */}
                
                </ul>
                
            </div>

            
        
    )
};


export default SideMenuComponent;