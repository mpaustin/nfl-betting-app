import React, { useEffect } from 'react';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import { homedir } from 'os';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const ViewGamesComponent: React.FC = () => {

    const season = 'current';
    const format = 'json';

    const apiKey = '57e22745320113ed2ecd5af270a1b02e';
    const sport = 'americanfootball_nfl';
    const region = 'us';
    const mkt = 'spreads';

    const [games, setGames] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const [betTeam, setBetTeam] = React.useState('');
    const [betAmount, setBetAmount] = React.useState('');
    const [betGameId, setBetGameId] = React.useState(0);
    const [betFavTeam, setBetFavTeam] = React.useState('');
    const [betDogTeam, setBetDogTeam] = React.useState('');
    const [betLine, setBetLine] = React.useState(0.0);
    const [betGameDateTime, setBetGameDateTime] = React.useState('');
    const [betCompleted, setBetCompleted] = React.useState(false);
    const [dialogGame, setDialogGame] = React.useState({teams: ''});

    const handleBetTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBetTeam(e.target.value);
    };

    const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBetAmount(e.target.value);
    };

    const submitBet = () => {
        Axios.post('http://localhost:8080/api/bets/newbet', {

            betUser: localStorage.getItem('username'),
            betAmount: parseFloat(betAmount),
            betTeam: betTeam,
            gameId: betGameId,
            favTeam: betFavTeam,
            dogTeam: betDogTeam,
            line: betLine,
            gameDateTime: betGameDateTime,
            completed : betCompleted
            
        }).then((response) => {
            console.log(response);
            if(response.data === false) {
                alert('Insufficient funds for bet, please make a deposit to proceed')
            }
            handleClose();
        }).catch((error) => {
            console.log(error);
            handleClose();
        });
    }

    const handleOpen = (game: any) => {
        setDialogGame(game);
        setBetGameId(game.toString());
        setBetFavTeam(game.teams[0]);
        setBetDogTeam(game.teams[1]);
        setBetLine(game.sites[0].odds.spreads.points[0]);
        const fullDate = new Date(game.commence_time * 1000);
        const date = fullDate.toLocaleDateString();
        const time = fullDate.toLocaleTimeString();
        setBetGameDateTime(`${date} at ${time} EST`);
        setBetCompleted(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setBetAmount('');
        setBetTeam('');
    };

    const formatTime = (number: any) => {
        let fullDate = new Date(number * 1000);
        let date = fullDate.toLocaleDateString();
        let time = fullDate.toLocaleTimeString();
        return(`${date} at ${time} EST`);
    }

    useEffect(() => {
        Axios.get(`https://api.the-odds-api.com/v3/odds/?apiKey=${apiKey}&sport=${sport}&region=${region}&mkt=${mkt}`)
        .then((response) => {
            console.log(response.data.data);
            setGames(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);

    useEffect(() => {},[games]);

    // const test = [
    //     {
    //         id: 1,
    //         favTeam: 'Packers',
    //         dogTeam: 'Bears',
    //         gameDateTime: '1/25/20 7:30pm',
    //         line: 7.5,
    //         completed: false
    //     },
    //     {
    //         id: 2,
    //         favTeam: 'Patriots',
    //         dogTeam: 'Steelers',
    //         gameDateTime: '1/25/20 4:00pm',
    //         line: 2.5,
    //         completed: false
    //     },
    //     {
    //         id: 3,
    //         favTeam: 'Giants',
    //         dogTeam: 'Jets',
    //         gameDateTime: '1/25/20 7:30pm',
    //         line: 7.5,
    //         completed: false
    //     },
    //     {
    //         id: 4,
    //         favTeam: 'Ravens',
    //         dogTeam: 'Dolphins',
    //         gameDateTime: '1/25/20 4:00pm',
    //         line: 2.5,
    //         completed: false
    //     }
    // ];
    
    return(
        <React.Fragment>
            <h2>All NFL Games</h2>
            <Grid container className="grid-container">
                {games.map((game: any) => (
                    <Grid key={game.teams} item className='grid-item'>
                        <Card className="card" variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="h2"><h2>{game.teams[0]} @ {game.teams[1]}</h2></Typography>
                                <Typography variant="body2" component="p">{formatTime(game.commence_time)}</Typography>
                                <Typography variant="body2"><h4>{game.teams[0]} {game.sites[0].odds.spreads.points[0] > 0 ? `+${game.sites[0].odds.spreads.points[0]}` : game.sites[0].odds.spreads.points[0]}</h4></Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleOpen(game)}>Make a Bet</Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">New Bet</DialogTitle>
                                <DialogContent>
                                <FormControl component="fieldset" className='radio-button-section'>
                                    <FormLabel component="legend">Team to bet on</FormLabel>
                                    <RadioGroup aria-label="team" name="team2" value={betTeam} onChange={(e) => {handleBetTeamChange(e)}}>
                                        <FormControlLabel
                                            value={dialogGame.teams[0]}
                                            control={<Radio color="primary" />}
                                            label={dialogGame.teams[0]}
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value={dialogGame.teams[1]}
                                            control={<Radio color="primary" />}
                                            label={dialogGame.teams[1]}
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>


                            {/* <CardContent>
                                <Typography variant="h6" component="h2">{game.dogTeam} vs {game.favTeam}</Typography>
                                <Typography variant="body2" component="p">{game.gameDateTime}</Typography>
                                <Typography variant="body2">{game.favTeam} -{game.line}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleOpen(game)}>Make a Bet</Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">New Bet</DialogTitle>
                                <DialogContent>
                                <FormControl component="fieldset" className='radio-button-section'>
                                    <FormLabel component="legend">Team to bet on</FormLabel>
                                    <RadioGroup aria-label="team" name="team2" value={betTeam} onChange={(e) => {handleBetTeamChange(e)}}>
                                        <FormControlLabel
                                            value={dialogGame.dogTeam}
                                            control={<Radio color="primary" />}
                                            label={dialogGame.dogTeam}
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value={dialogGame.favTeam}
                                            control={<Radio color="primary" />}
                                            label={dialogGame.favTeam}
                                            labelPlacement="start"
                                        />
                                    </RadioGroup> */}


                                    <FormHelperText></FormHelperText>
                                </FormControl>
                                    <DialogContentText>
                                        Enter bet amount:
                                    </DialogContentText>
                                    <input
                                    type="number"
                                    required
                                    onChange={(e) => {handleBetAmountChange(e)}}
                                    value={betAmount}
                                    />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button onClick={submitBet}>
                                    Submit Bet
                                </Button>
                                </DialogActions>
                            </Dialog>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
}

export default ViewGamesComponent;