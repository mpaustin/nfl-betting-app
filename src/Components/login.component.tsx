import React, { useState } from 'react';
import Axios from 'axios';
import { History } from 'history';

interface LoginComponentProps {
    history: History;
}

const LoginComponent: React.FC<LoginComponentProps> = ({history}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const refreshInputs = () => {
        setUsername('');
        setPassword('');
    }

    const submit = (event: any)=>{
        event.preventDefault();
        console.log("Sent login info to servlet");

        Axios.post('http://localhost:8080/api/login/', {

            credUsername: username,
            credPassword: password
    
            }).then((response) => {

                if(response.data.message == 'authenticated') {
                    localStorage.setItem('username', username);

                    history.push('/betting/');

                } else {
                    refreshInputs();
                    alert('Invalid username or password');
                }
    
            }).catch((error) => {
                console.log(error);
            });
    }

    return(
        <div className ="main_area_div">
            <h2 className="area_header">Login for Sports Betting</h2>
            <div className="login-creds-label">Username: <input className="login-creds" type="text" name="username" value = {username} onChange={(event) => setUsername(event.target.value)}/><br/></div>
            <div className="login-creds-label">Password: <input className="login-creds" type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/><br/></div>
            <input id="login-submit-button" type="submit" value="Login" onClick={submit}/>
        </div>
        
    )
};


export default LoginComponent;