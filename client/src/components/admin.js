import React,{useState, useEffect} from 'react';
import "../css/admin.css";

const Admin = (props) => {
    const [playerList, setPlayerList] = useState(null);
    const [removePlayer, setRemovePlayer] = useState(null);
    const [addPlayer, setAddPlayer] = useState({id:null, firstname:"",middlename:"",lastname:"",player_type:"",buyout:null,start_price:null,auctioned:null,contract_period:null,team_id:null})

    const getPlayers = async ()=>{
        const players = await fetch('http://localhost:3000/player');
        const playerJSON = await players.json();
        console.log(playerJSON);
        setPlayerList(playerJSON);
    }

    const handleChange = (e) =>{
        e.preventDefault();
        const value = e.target.value;
        setAddPlayer({
            ...addPlayer,
            [e.target.name]: value
          });
    }

    const handleRemoveChange = (e) =>{
        e.preventDefault();
        setRemovePlayer(e.target.value);
    }

    const removePlayerHandler = async(e) => {
        e.preventDefault();
        console.log(removePlayer);
        const result = await fetch(`http://0.0.0.0:3000/player?id=eq.${removePlayer}`, {method:'DELETE'}); 
        console.log(result);
        getPlayers();
    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        const auctionedValue = false
        
        if(addPlayer.auctioned == "true"){
            auctionedValue = true;
        }

        const player={
            // "id": parseInt(addPlayer.id),
            "firstname": addPlayer.firstname,
            "middlename": addPlayer.middlename,
            "lastname": addPlayer.lastname,
            "player_type": addPlayer.player_type,
            "buyout": parseInt(addPlayer.buyout),
            "start_price": parseInt(addPlayer.start_price),
            "auctioned": auctionedValue,
            "contract_period": parseInt(addPlayer.contract_period),
            "team_id": parseInt(addPlayer.team_id)
        }
        console.log(player)
        const result = await fetch("http://localhost:3000/player", {method:'POST',headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(player) }); 
        // const resultJson = await result.json();
        // console.log(resultJson)
        getPlayers();
    }

    useEffect(()=>{
        getPlayers();
    },[])

    if(playerList !== null){
        return(
            <div className="admin-panel">
                <div className="playerAddForm">
                    <h2>Add Players</h2>

                    <form onSubmit={handleSubmit}>
                        {/* <label>ID</label>
                        <input type="number" name="id" onChange={handleChange} value={addPlayer.id}/> */}

                        <label>First Name</label>
                        <input type="text" name="firstname" onChange={handleChange} value={addPlayer.firstname}/>

                        <label>Middle Name</label>
                        <input type="text" name="middlename" onChange={handleChange} value={addPlayer.middlename}/>

                        <label>Last Name</label>
                        <input type="text" name="lastname" onChange={handleChange} value={addPlayer.lastname}/>

                        <label>Player Type</label>
                        <input type="text" name="player_type" onChange={handleChange} value={addPlayer.player_type}/>

                        <label>Buy Out</label>
                        <input type="number" name="buyout" onChange={handleChange} value={addPlayer.buyout}/>

                        <label>Start Price</label>
                        <input type="number" name="start_price" onChange={handleChange} value={addPlayer.start_price}/>

                        <label>Auctioned</label>
                        <input type="text" name="auctioned" onChange={handleChange} value={addPlayer.auctioned}/>

                        <label>Contract Period</label>
                        <input type="number" name="contract_period" onChange={handleChange} value={addPlayer.contract_period}/>

                        <label>Team ID</label>
                        <input type="number" name="team_id" onChange={handleChange} value={addPlayer.team_id} /> 
                        
                        <input type="submit" value="Submit" />
                    </form>
                </div>

                <div className="playerRemove">
                    <h2>Remove Players</h2>
                    <form onSubmit={removePlayerHandler}>
                            <label>Player ID</label>
                                <input type="text" name="playerID" onChange={handleRemoveChange} value={removePlayer}/>
                                <input type="submit" value="Submit" />
                    </form> 
                </div>

                <div className="playerDetails">
                    <h2>Players</h2>    
                    <table className="app">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Player Type</th>
                                <th>Buy Out</th>
                                <th>Start Price</th>
                                <th>Auctioned</th>
                                <th>Contract Period</th>
                                <th>Team ID</th>
                            </tr>
                        </thead>


                        <tbody>
                            {playerList.map(player =>(
                                <tr key={player.id}>
                                    <td>{player.id}</td>
                                    <td>{player.firstname}</td>
                                    <td>{player.middlename}</td>
                                    <td>{player.lastname}</td>
                                    <td>{player.player_type}</td>
                                    <td>{player.buyout}</td>
                                    <td>{player.start_price}</td>
                                    <td>{player.autioned?"true":"false"}</td>
                                    <td>{player.contract_period}</td>
                                    <td>null</td>
                                </tr>
                            ))}
                        </tbody>            
                    </table>
                </div>
            </div>
        )
    } 
    else{
        return(
            <div >
                <p>Loading</p>
            </div>
        )
    }         
};

export default Admin;

