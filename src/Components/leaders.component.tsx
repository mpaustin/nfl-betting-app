import React, { useState, useEffect } from 'react';
import Marquee from "../marquee";
import axios from 'axios';

export interface CumulativeStats {
    cumulativeplayerstats: {
        lastUpdatedOn: Date,
        playerstatsentry: any[]
    }
}

const LeadersComponent: React.FC = () => {

    const [data, setData] = useState({} as CumulativeStats);
    const [renderSlice, setRenderSlice] = useState([] as any[]);
    const [sliceSize, setSliceSize] = useState(10);
    const [sliceStart, setSliceStart] = useState(0);
    const [result, setResult] = useState('Passing TDs');
    const [result2, setResult2] = useState('Passing Yds');
    const [result3, setResult3] = useState('Passing Att/Cmp');
    const [result4, setResult4] = useState('Passing Pct');
    const [result5, setResult5] = useState('Passing Ints');
    const [result6, setResult6] = useState('Other');
    const [marqueeString, setmarqueeString] = useState('Passing TDs: Lamar Jackson');
    let max = 3;

    let value = 'passing';


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

//    

    // run on first render
    useEffect(() => {
        axios.get("https://api.mysportsfeeds.com/v1.0/pull/nfl/2020-playoff/cumulative_player_stats.json", {})
        /*Set new axios call to database here*/
        // axios.get("http://localhost:8080/api/stats/", {
        //     params: {
        //         action: 'leaders',    
        //         category: value,
        //         team: '',
        //         firstname: '',
        //         lastname: ''
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
        
    
    
     const submit = (evt: any) => {
        evt.preventDefault();
    
        value = evt.target.getAttribute('data-value');
        switch(value){
            case 'Passing':
            setResult("Passing TDs");
            setResult2("Passing Yds");
            setResult3("Passing Att/Cmp");
            setResult4("Passing Pct");
            setResult5("Passing Ints");
            setResult6("Other");
            
            break;
            
            case "Rushing":
            setResult("Rushing TDs");
            setResult2("Rushing YDs");
            setResult3("Rushing Att/Cmp");
            setResult4("Receiving TDs");
            setResult5("Receiving Yds");
            setResult6("Other");
            break;
            
            case "Defense":
            setResult("Tackles");
            setResult2("Sacks");
            setResult3("Ints");
            setResult4("Int TDs");
            setResult5("Tackles");
            setResult6("Other"); 
            break;
            
            case "Receiving":
            setResult("Receiving TDs");
            setResult2("Receiving Yds");
            setResult3("Targets");
            setResult4("Receptions");
            setResult5("Receiving Avg");
            setResult6("Other");
            break;

            case "Special Teams":
            setResult("Punts");
            setResult2("Inside 20");
            setResult3("Punt Yds");
            setResult4("Punt Returns");
            setResult5("Punt Ret Yds");
            setResult6("Other");
            break;
        } 
    } 

        
        

    return(
        <div className ="main_area_div">
            <Marquee string={marqueeString}/>
            <button type="button" className="sort_buttons" data-value="Passing" onClick={submit}>Passing</button>&nbsp;
            <button type="button" className="sort_buttons" data-value="Rushing" onClick={submit}>Rushing</button>&nbsp;
            <button type="button" className="sort_buttons" data-value="Receiving" onClick={submit}>Receiving</button>&nbsp;
            <button type="button" className="sort_buttons" data-value="Defense" onClick={submit}>Defense</button>&nbsp;
            <button type="button" className="sort_buttons" data-value="Special Teams" onClick={submit}>Special Teams</button><br></br>
            
            
            <div className="table_div">
            
            <table className="table_main">
                <thead className="table_header">
                    <tr>
                    <th className="headers">Last Name</th>
                    <th className="headers">First Name</th>
                    <th className="headers">Team</th>
                    <th className="headers">Position</th>
                    
                    <th className="headers">{result}</th>
                    <th className="headers">{result2}</th>
                    <th className="headers">{result3}</th>
                    <th className="headers">{result4}</th>
                    <th className="headers">{result5}</th>
                    <th className="headers">{result6}</th>
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
                
            </table>  
            </div>      
        </div>
        
    )
};


export default LeadersComponent;