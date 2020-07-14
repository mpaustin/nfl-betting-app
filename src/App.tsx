import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import SideMenuComponent from './UI/sidemenu.component';
import MainAreaComponent from './UI/mainarea.component';
import axios from 'axios';

axios.interceptors.request.use((req) => {
  const api_token = 'REDACTED_MYSPORTSFEEDS_TOKEN';
  const api_password = 'REDACTED_MYSPORTSFEEDS_PASSWORD';
  
  const authString = btoa(`${api_token}:${api_password}`);

  req.headers ={
    "Authorization": `Basic ${authString}`
}
return req;

});


const App: React.FC = () => {
  
  return (
    <React.Fragment>
    <BrowserRouter>
    
    
      <div id="main_flex_container">
      
        <SideMenuComponent></SideMenuComponent>
        <MainAreaComponent></MainAreaComponent>
      </div>
    </BrowserRouter>
    
  </React.Fragment>

  
  );

  
}

export default App;
