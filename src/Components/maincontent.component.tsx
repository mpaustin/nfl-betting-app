import React from 'react';
import logo from '../Components/images/logo_transparent2.png'


const MainContentComponent: React.FC = () => {

    // get rid of main content and keep main area
    // go straight to login from betting button

    return(
        <div id ="main_content_div">
            <div id="main_header_flex">
            <img src={logo} id="logo_pic" alt="SportsApp Logo"/>
            </div>
        </div>
    )
};

export default MainContentComponent;