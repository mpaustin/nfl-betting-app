import React, { useEffect } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ViewUserProfComponent: React.FC = () => {

    const [username, setUsername] = React.useState('');
    const [userFunds, setUserFunds] = React.useState(0.00);
    const [deposit, setDeposit] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const handleDepositUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeposit(e.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateUserFunds = () => {
        setUserFunds(userFunds + parseFloat(deposit));

        Axios.get('http://localhost:8080/api/profile/deposit', {
            params: {
                deposit: parseFloat(deposit),
                username: username
            }
        }).then((response) => {
            console.log(response);
            
        }).catch((error) => {
            console.log(error);
        });

        setOpen(false);
    }

    useEffect(() => console.log(userFunds), [userFunds]);

    useEffect(() => {
        Axios.get('http://localhost:8080/api/profile/viewprof', {
            params: {
                username: localStorage.getItem("username")
            }
        })
        .then((response) => {
            console.log(response);
            setUsername(response.data.username);
            setUserFunds(response.data.userFunds);
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    return(
        <React.Fragment>
            <section className="view-prof-section">
                <div className="view-prof-content-title"><h3>My Betting Profile</h3></div>
                <div className="view-prof-content">
                    <div id="username">Username:            {username}</div>
                    <div id="userFunds">Funds available:    ${userFunds}</div>
                </div>
                <div>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Deposit Funds
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Enter deposit amount:
                        </DialogContentText>
                        <input
                        type="number"
                        required
                        onChange={(e) => {handleDepositUpdate(e)}}
                        value={deposit}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={updateUserFunds}>
                            Deposit
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </section>
        </React.Fragment>
    );
}

export default ViewUserProfComponent;