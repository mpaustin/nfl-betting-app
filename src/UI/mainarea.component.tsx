import React from 'react';
import MainContentComponent from '../Components/maincontent.component';
import { Switch, Route, Redirect } from 'react-router';
import BetsComponent from '../Components/bets.component';
import LeadersComponent from '../Components/leaders.component';
import IndividualComponent from '../Components/individual.component';
import TeamComponent from '../Components/team.component';
import ProfilesComponent from '../Components/profiles.component';
import LoginComponent from '../Components/login.component';

const MainAreaComponent: React.FC = () => {

    

    return(
        
        <div className ="main_area_div">
            <MainContentComponent></MainContentComponent>

            <Switch>
                <Route path ="/betting" component= {BetsComponent}></Route>
                <Route path ="/stats/leaders" component= {LeadersComponent}></Route>
                <Route path ="/stats/individuals" component= {IndividualComponent}></Route>
                <Route path ="/stats/teams" component= {TeamComponent}></Route>
                <Route path ="/pprofiles" component= {ProfilesComponent}></Route>
                <Route path ="/login" component= {LoginComponent}></Route>
                <Redirect exact path="/" to="/login"></Redirect>
            </Switch>
        </div>
        
    )
};

export default MainAreaComponent;