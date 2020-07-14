import React from 'react';
import Marquee from "../marquee";
const MarqueeComponent: React.FC = () => {

    

    return(
        <div className ="main_area_div">
            <h3 className="area_header">Stat Leaders</h3>
            <Marquee string="League Leader by:"/>
            
        </div>
        
    )
};


export default MarqueeComponent;