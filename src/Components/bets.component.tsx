import React from 'react';
import { Switch, Route } from 'react-router';
import MainContentComponent from './maincontent.component';
import ViewGamesComponent from './BetComponents/viewgames';
import ViewBetsComponent from './BetComponents/viewbets';
import ViewUserProfComponent from './BetComponents/viewuserprof';
import BetNavComponent from './BetComponents/betnav';

const BetsComponent: React.FC = () => {

    

    return(
        <div className ="main_area_div">
            <section  className="betting-panel">
                <div className="betting-panel-title"><h1>Sports Betting</h1></div>
                <BetNavComponent></BetNavComponent>

                <Switch>
                    <Route path="/betting/games" component={ViewGamesComponent}></Route>
                    <Route path="/betting/bets" component={ViewBetsComponent}></Route>
                    <Route path="/betting/profile" component={ViewUserProfComponent}></Route>
                </Switch>
            </section>
        </div>
        
    )
};


export default BetsComponent;