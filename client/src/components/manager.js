import React,{useState, useEffect}  from 'react';

const Manager = (props) => {
    const [playerList, setPlayerList] = useState([]);
    const [bidList, setBidList] = useState([]);
    const [bidAmount, setBidAmount] = useState(0);
    const [playerID, setPlayerID] = useState(0);

    const getPlayers = async ()=>{
        const players = await fetch('http://localhost:3000/player');
        const playerJSON = await players.json();
        console.log(playerJSON);
        setPlayerList(playerJSON);
    }

    const getBidList = async ()=>{
        const bids= await fetch('http://localhost:3000/auction_bids');
        const bidsJSON = await bids.json();
        console.log(bidsJSON);
        setBidList(bidsJSON);
    }


    useEffect(()=>{
        getPlayers();
        getBidList();
    },[])

    const handleChangeBid = (e) =>{
        e.preventDefault();
        const value = e.target.value;
        setBidAmount(value);
    }

    const handleChangeID = (e) =>{
        e.preventDefault();
        const value = e.target.value;
        setPlayerID(value);
    }

    const verifyHandler = (e) => {
        e.preventDefault();
        var selectedPlayer = playerList.filter(function(player) { return player.id == playerID});
        if(selectedPlayer.length == 0){
            alert("Player is not up for auction!");
            return;
        } 
        if(selectedPlayer[0].start_price > bidAmount){
            alert("Start Price is higher thant the bid amount");
            return;
        }
        sendBid()
    }

    const getTime = () => {
        let date = new Date();              //Create a date object
        let month = date.getMonth()+1;      //Get the month of the date object
        let s_time = String(date);          //Convert the obj to string
        let u_time = s_time.split(" ");     //Split the reseulting string

        let curr_time = `${u_time[3]}-${month}-${u_time[2]}  ${u_time[4]}`
        return curr_time;
    }

    const sendBid = async() => {
        let time = getTime()

        const bidDetails={
            "amount":bidAmount,
            "when":time,
            "player_id": playerID,
            "team_id": 1
        }
        console.log(bidDetails)
        const result = await fetch("http://localhost:3000/auction_bids", {method:'POST',headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(bidDetails) });
        getBidList(); 
    }

    return(
        <div>
            <div>
                <h2>Manager Dashboard</h2>
            </div>
        
            { (playerList.length !== 0)&&(
                <div className="playerDetails">
                    <h2>Place a bid</h2>
                    <form onSubmit={verifyHandler}>
                        <label>Player ID</label>
                        <input type="number" value={playerID} onChange={handleChangeID} name="playerID"></input>
                        
                        <label>Bid Amount</label>
                        <input type="number" value={bidAmount} onChange={handleChangeBid} name="bidAmount"></input>

                        <input type="submit" value="Submit" />
                    </form>

                    <h2>Current Bids</h2>
                    
                    {(bidList.length === 0)?(<div>No bids to display</div>):(
                        <div>
                            <table className="bidTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Amount</th>
                                        <th>Time</th>
                                        <th>Player ID</th>
                                        <th>Team ID</th>
                                    
                                    </tr>
                                </thead>


                                <tbody>
                                    {bidList.map(indBid =>(
                                        <tr key={indBid.id}>
                                            <td>{indBid.id}</td>
                                            <td>{indBid.amount}</td>
                                            <td>{indBid.when}</td>
                                            <td>{indBid.player_id}</td>
                                            <td>{indBid.team_id}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}


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
                                    {/* <td><input type="number" name="bid_amount" onChange={handleChange} value={bidAmount[player.id]}/></td>
                                    <td><button onClick={()=>bid(player)}>Make a Bid</button></td> */}
                                    
                                </tr>
                            ))}
                        </tbody>
                                
                    </table>
                </div>)
            }
        </div>                   
    )
}

export default Manager;