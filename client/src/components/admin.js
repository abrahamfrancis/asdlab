import React,{useState, useEffect} from 'react';
import "./admin.css";

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
                <h1>Admin Panel</h1>
                
                <div className="player-form">
                    <h2>Add Players</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <label>ID</label>
                        <input type="number" name="id" onChange={handleChange} value={addPlayer.id}/> */}
                        <div className="player-add-form">
                            <div className="single-input"> 
                                <label>First Name</label>
                            </div>

                            <div className="single-input">     
                                <input type="text" name="firstname" onChange={handleChange} value={addPlayer.firstname}/>
                            </div>

                            <div className="single-input"> 
                                <label>Middle Name</label>
                            </div>

                            <div className="single-input"> 
                                <input type="text" name="middlename" onChange={handleChange} value={addPlayer.middlename}/>
                            </div>

                            <div className="single-input"> 
                                <label>Last Name</label>
                            </div>    

                            <div className="single-input"> 
                                <input type="text" name="lastname" onChange={handleChange} value={addPlayer.lastname}/>
                            </div>

                            <div className="single-input"> 
                                <label>Player Type</label>
                            </div>

                            <div className="single-input"> 
                                <input type="text" name="player_type" onChange={handleChange} value={addPlayer.player_type}/>
                            </div>

                            <div className="single-input"> 
                                <label>Buy Out</label>
                            </div>

                            <div className="single-input"> 
                                <input type="number" name="buyout" onChange={handleChange} value={addPlayer.buyout}/>
                            </div>

                            <div className="single-input"> 
                                <label>Start Price</label>
                            </div>
                            
                            <div className="single-input"> 
                                <input type="number" name="start_price" onChange={handleChange} value={addPlayer.start_price}/>
                            </div>

                            <div className="single-input"> 
                                <label>Auctioned</label>
                            </div>

                            <div className="single-input"> 
                                <input type="text" name="auctioned" onChange={handleChange} value={addPlayer.auctioned}/>
                            </div>
                            
                            <div className="single-input"> 
                                <label>Contract Period</label>
                            </div>

                            <div className="single-input"> 
                                <input type="number" name="contract_period" onChange={handleChange} value={addPlayer.contract_period}/>
                            </div>

                            <div className="single-input"> 
                                <label>Team ID</label>
                            </div>

                            <div className="single-input"> 
                                <input type="number" name="team_id" onChange={handleChange} value={addPlayer.team_id} /> 
                            </div>

                            <div className="single-input"> 
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                </div>
               

                <div className="player-remove">
                    <h2>Remove Players</h2>
                    <form onSubmit={removePlayerHandler}>
                        <div className="remove-input">
                            <div className="single-input"> 
                                <label>Player ID</label>
                            </div>
                            
                            <div className="single-input">     
                                <input type="text" name="playerID" onChange={handleRemoveChange} value={removePlayer}/>
                            </div>
                            
                            <div className="single-input"> 
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </form> 
                </div>

                <div className="player-details">
                    <h2>Players</h2>    
                    <table className="player-list">
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

