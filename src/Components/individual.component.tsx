import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Marquee from "../marquee";
import TablePagination from '@material-ui/core/TablePagination';
import { List } from '@material-ui/core';



export interface CumulativeStats {
    cumulativeplayerstats: {
        lastUpdatedOn: Date,
        playerstatsentry: any[]
    }
}
const IndividualComponent: React.FC = () => {
    const [data, setData] = useState({} as CumulativeStats);
    const [renderSlice, setRenderSlice] = useState([] as any[]);
    const [sliceSize, setSliceSize] = useState(10);
    const [sliceStart, setSliceStart] = useState(0);
    const [dropDownSel, setdropDownSel] = useState('Sacks');
    const [marqueeString, setmarqueeString] = useState('Passing TDs: Lamar Jackson');
    let max = 3;
    const playerSize: number = 1326;
    const [rowsPerPage, setRowsPerPage] = React.useState(sliceSize);
    const [page, setPage] = React.useState(0);
    
    // run on first render
    useEffect(() => {
        axios.get("https://api.mysportsfeeds.com/v1.0/pull/nfl/2020-playoff/cumulative_player_stats.json", {})
    /*Set new axios call to database here*/
        // axios.get("http://localhost:8080/api/stats/", {
        //     params: {
        //         action: 'individuals'
        //     }
        // })
        .then(resp => {
            setData(resp.data); // trigger the next effect
            }, err =>
        console.log(err));
    },[])


    
    
    
    
    
    
    
    
    
    // runs when data, sliceSize, or sliceStart changes
    useEffect(() => {
        const slice = data.cumulativeplayerstats?.playerstatsentry.slice(sliceStart, sliceSize + sliceStart);
        setRenderSlice(slice);
        
    }, [data, sliceSize, sliceStart])
        
    //
     
    const submit = (evt: any) => {
        evt.preventDefault();
        setdropDownSel(evt.target.getAttribute('data-value'));
    }   

    useEffect(()=> (console.log("")), [dropDownSel]);

    const setMarquee = (max: number)=>{
        let myNumber = Math.floor(Math.random() * Math.floor(max));
        // let numArr: number [] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        // if (myNumber == )
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
    
      /* Table render functions */

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

        
    
       /* */
    return(
        <div className ="main_area_div">
          <Marquee string = {marqueeString}/>
            
            <div className="table_div">
            <table className="table_main">
                <thead className="table_header">
                    <tr>
                    <th className="headers">Last Name</th>
                    <th className="headers">First Name</th>
                    <th className="headers">Team</th>
                    <th className="headers">Position</th>
                    <th className="headers">Passing TDs</th>
                    <th className="headers">Rushing TDs</th>
                    <th className="headers">Receptions</th>
                    <th className="headers">Recieving Yards</th>
                    <th className="headers">Recieving TDs</th>
                    <div className="dropdown">
  <button className="dropbtn" data-value="Sacks">{dropDownSel} &#9660;</button>
  <div className="dropdown-content">

  <button className="btnTest" id="btn1" data-value="Sacks"  onClick={submit}>Sacks</button>
  <button className="btnTest" id="btn2" data-value="Interceptions" onClick={submit}>Interceptions</button>
  <button className="btnTest" id="btn3" data-value="IntTD" onClick={submit}>Interception TDs</button>
  <button className="btnTest" id="btn4" data-value="Fumbles" onClick={submit}>Fumbles</button>
  <button className="btnTest" id="btn5" data-value="Tackles" onClick={submit}>Tackles</button>
  <button className="btnTest" id="btn6" data-value="QBR" onClick={submit}>QBR</button>
  <button className="btnTest" id="btn7" data-value="Targets" onClick={submit}>Targets</button>
  <button className="btnTest" id="btn8" data-value="Games Played" onClick={submit}>Games Played</button>
  <button className="btnTest" id="btn9" data-value="Pass Ints" onClick={submit}>Pass Ints</button>
  <button className="btnTest" id="btn10" data-value="Pass Att" onClick={submit}>Pass Att</button>
  <button className="btnTest" id="btn11" data-value="Pass Cmp" onClick={submit}>Pass Cmp</button>
  <button className="btnTest" id="btn12" data-value="Pass Pct" onClick={submit}>Pass Pct</button>
  <button className="btnTest" id="btn13" data-value="Pass Yds" onClick={submit}>Pass Yds</button>
  <button className="btnTest" id="btn14" data-value="Pass Per Att" onClick={submit}>Pass Per Att</button>
  <button className="btnTest" id="btn15" data-value="Rush Att" onClick={submit}>Rush Att</button>
  <button className="btnTest" id="btn16" data-value="Rush Yds" onClick={submit}>Rush Yds</button>
  <button className="btnTest" id="btn17" data-value="Rec Avg" onClick={submit}>Rec Avg</button>
  <button className="btnTest" id="btn18" data-value="Fum Lost" onClick={submit}>Fum Lost</button>
  <button className="btnTest" id="btn19" data-value="Kick Returns" onClick={submit}>Kick Rets</button>
  <button className="btnTest" id="btn20" data-value="Kick Ret Yds" onClick={submit}>Kick Ret Yds</button>
  <button className="btnTest" id="btn21" data-value="Punt Ret" onClick={submit}>Punt Ret</button>
  <button className="btnTest" id="btn22" data-value="Punt Ret Yds" onClick={submit}>Punt Ret Yds</button>
  <button className="btnTest" id="btn23" data-value="Punts" onClick={submit}>Punts</button>
  <button className="btnTest" id="btn24" data-value="Punt Yds" onClick={submit}>Punt Yds</button>
 
  </div>
</div>
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


export default IndividualComponent;