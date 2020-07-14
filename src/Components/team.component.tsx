import React, { useEffect, useState } from 'react';
import Marquee from "../marquee";
import axios from "axios";
import nelogo from "../Components/images/pats.png";
import titans from "../Components/images/titans.png";
import bills from "../Components/images/bills.png";
import texans from "../Components/images/hou.png";
import kclogo from "../Components/images/kc.png";
import ravens from "../Components/images/ravens.png";
import eagles from "../Components/images/eagles.png";
import seahawks from "../Components/images/sea.png";
import saints from "../Components/images/saints.png";
import vikings from "../Components/images/min.png";
import packers from "../Components/images/packers.png";
import sanfran from "../Components/images/49ers.png";
import afc from "../Components/images/afc.png";
import nfc from "../Components/images/nfc.png";
import TablePagination from '@material-ui/core/TablePagination';

export interface CumulativeStats {
    cumulativeplayerstats: {
        lastUpdatedOn: Date,
        playerstatsentry: any[]
    }
}
const TeamComponent: React.FC = () => {
    const [data, setData] = useState({} as CumulativeStats);
    const [renderSlice, setRenderSlice] = useState([] as any[]);
    const [sliceSize, setSliceSize] = useState(10);
    const [sliceStart, setSliceStart] = useState(0);
    const [marqueeString, setmarqueeString] = useState('Passing TDs: Lamar Jackson');
    let max = 3;
    const playerSize: number = 1326;
    const [rowsPerPage, setRowsPerPage] = React.useState(sliceSize);
    const [page, setPage] = React.useState(0);


    // run on first render
    useEffect(() => {
        axios.get("https://api.mysportsfeeds.com/v1.0/pull/nfl/2020-playoff/cumulative_player_stats.json", {})
        .then(resp => {
            setData(resp.data); // trigger the next effect
            }, err =>
        console.log(err));
    },[])

    // runs when data, sliceSize, or sliceStart changes
    useEffect(() => {
        const slice = data.cumulativeplayerstats?.playerstatsentry.slice(sliceStart, sliceSize);
        setRenderSlice(slice);
        
    }, [data, sliceSize, sliceStart])

    const submit = (evt: any) =>{
        evt.preventDefault();
        let value = evt.target.getAttribute('data-value');
       
       
       /* Sorting Axios post needs access to the sorting service
        axios.post("http://localhost:8080/api/stats/", {
            action: 'teams'
            team: value
       }).then((response) => {
       
    }).catch((error) =>{
        console.log(error);
    });

        */
    }

    const setMarquee = (max: number)=>{
        let myNumber = Math.floor(Math.random() * Math.floor(max));
                
    
        switch(myNumber){
            case 0:
                setmarqueeString("Sacks: Joey Bosa");
                break;
            case 1:
                setmarqueeString("Rushing TD: Ezekiel Elliot");
                break;
            case 2: 
                setmarqueeString('Passing INTs: Jameis Winston ');
                break;
    
            default:
                setmarqueeString('Something4');
                break;
        }
    }
        useEffect( ()=> {
            const myInterval = setInterval(()=>{setMarquee(max)}, 5000);
            return ()=> {clearInterval(myInterval);}
        }, []);
        
        const handleChangePage = (event: unknown, newPage: number) => {
            let myVariable = (newPage +1) * sliceSize;
            setSliceStart(myVariable);
                setPage(newPage);
                
          };
        
          const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSliceSize(parseInt(event.target.value, 10));
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };

    return(
        <div className ="main_area_div">
            <div id="division_flex">
            <img src={afc} id="afc_logo" alt="AFC Logo"></img>
            <img src={nfc} id="nfc_logo" alt="NFC Logo"></img>
            </div>
            <div id="marquee_flex">
                
                <div id="afc_flex">
            <button type="button" className="sort_buttons2"><img src={nelogo} alt="NE Logo" data-value="NE" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={titans} alt="TEN Logo" data-value="TEN" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={bills} alt="BUF Logo" data-value="BUF" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={texans} alt="HOU Logo" data-value="HOU" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={kclogo} alt="KC Logo" data-value="KC"  onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={ravens} alt="BAL Logo"data-value="BAL" onClick={submit}></img></button><br></br>
                </div>
                <Marquee string={marqueeString}/>
                <div id="nfc_flex">
            <button type="button" className="sort_buttons2"><img src={eagles} alt="PHI Logo" data-value="PHI" onClick={submit} ></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={seahawks} alt="SEA Logo" data-value="SEA" onClick={submit} ></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={saints} alt="NO Logo" data-value="NO" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={vikings} alt="MIN Logo" data-value="MIN" onClick={submit} ></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={packers} alt="GB Logo" data-value="GB" onClick={submit}></img></button>&nbsp;
            <button type="button" className="sort_buttons2"><img src={sanfran} alt="SF Logo" data-value="SF" onClick={submit}></img></button><br></br>
            </div>
            </div>
            
            
            
            <div className="table_div">
            
            <table className="table_main">
                <thead className="table_header">
                    <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Passing TDs</th>
                    <th>Rushing TDs</th>
                    <th>Receptions</th>
                    <th>Receiving Yards</th>
                    <th>Receiving TDs</th>
                    <th>Sacks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       renderSlice?.map((entry: any) => 
                       <tr key={entry.player.ID}>
                           <td>{entry.player.LastName}</td>
                           <td>{entry.player.FirstName}</td>
                           <td>{entry.team.Abbreviation}</td>
                           <td>{entry.player.Position}</td>
                           <td>{entry.stats.PassTD ? entry.stats.PassTD['#text'] : "--"}</td>
                           <td>{entry.stats.RushTD ? entry.stats.RushTD['#text'] : "--"}</td> 
                           <td>{entry.stats.Receptions ? entry.stats.Receptions['#text'] : "--"}</td>
                           <td>{entry.stats.RecYards ? entry.stats.RecYards['#text'] : "--"}</td>
                           <td>{entry.stats.RecTD ? entry.stats.RecTD['#text'] : "--"}</td>
                           <td>{entry.stats.Sacks ? entry.stats.Sacks['#text'] : "--"}</td>

                           </tr>)          
                        
                    }
                </tbody>
                <tfoot>
                            <TablePagination
                    rowsPerPageOptions={[10, 20, 25]}
                    
                    count= {playerSize}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> 
               </tfoot>
            </table>  
            </div>      
        </div>
        
    )
};


export default TeamComponent;