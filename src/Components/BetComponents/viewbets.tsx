import React, { useEffect } from 'react';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

const ViewBetsComponent: React.FC = () => {

    const [bets, setBets] = React.useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8080/api/bets/getbets', {
            params: {
                action: 'all',
                username: localStorage.getItem('username')
            }
        })
        .then((response) => {
            console.log(response.data);
            setBets(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },[]);
    
    return(
            <React.Fragment>
                <h2>My Placed Bets</h2>
                <Grid container className="grid-container">
                    {bets.map((bet: any) => (
                        <Grid key={bet.betId} className="grid-item" item>
                            <Card className="card" variant="outlined">
                                <CardContent>
                                    <Typography><div className="card-header">{bet.dogTeam} vs {bet.favTeam}</div></Typography>
                                    <Typography variant="body2" component="p">{bet.gameDateTime}</Typography>
                                    <Typography variant="body2">{bet.favTeam} {bet.line}</Typography>
                                    <Typography><div className="bet-amount">${bet.betAmount} on {bet.betTeam}</div></Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        );
}

export default ViewBetsComponent;