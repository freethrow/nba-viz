import React, { useContext, useState, useEffect } from 'react';
import { PlayersContext } from '../PlayersContext'
import useLocalStorage from '../utils/useLocalStorage'

import {Row, Col, Button} from 'react-bootstrap'

import sample from '../sample';
import allPlayers from '../allPlayers'


// unique team names
let teams = [...new Set(allPlayers.map(item => item.TEAM_ABBREVIATION))];
teams.sort();
console.log("Teams:", teams)

const Selector = () => {

    const [available, setAvailable] = useState(allPlayers)

    console.log("AVAILABLE:", available)
    const {players,setPlayers} = useContext(PlayersContext)


    // keep the arrays sorted
    useEffect(()=>{
        setAvailable([...available].sort((a, b) => b.PLAYER_NAME - a.PLAYER_NAME))

    },[players])

    
    const reset = () =>{
        setAvailable(allPlayers);
        setPlayers([]);
    }


    const addTeam = (team) =>{
        console.log("Add the whole team")
        let teamPlayers = available.filter(player=>{return player.TEAM_ABBREVIATION == team});
        let allPlayers = players.concat(teamPlayers)
        let uniq = [...new Set(allPlayers)];
        setPlayers(uniq);
    }

    const remove = (index) =>{
        let newPlayers = players.filter(player=>{return player.index !== index});
        setPlayers(newPlayers);

        // add player to available
        let playerToAvailable = players.find(player => player.index === index);
        let newAvailable = [...available, playerToAvailable]
        let uniq = [...new Set(newAvailable)];
        
        setAvailable(uniq)
    }

    const add = (index) =>{
        
        let playerToAdd= available.find(player => player.index === index);
        
        let newPlayers = [...players, playerToAdd]
        let uniq = [...new Set(newPlayers)];
        
        setPlayers(uniq);

        // remove player with index from available
        let newAvailable = available.filter(player=>{return player.index !== index});
        setAvailable(newAvailable);
    }

    return (
        <div>

            <h2>Players Selector</h2>
            <p>Select the players to be compared.</p>
            <Button variant="danger" onClick={()=>{
                reset()
            }}>Reset</Button>

            <Row>
                <Col>
                <h3>All players</h3>

<ol>
{available.map((player) => (


    <li 
        key={player.index}
        onClick={()=>{
            add(player.index);
        }}
        >{player.PLAYER_NAME} from {player.TEAM_ABBREVIATION}</li>
    ))}
</ol>
<hr/>
                </Col>

                <Col>
                <h3>Select whole team</h3>

                <ol>
            {teams.map((team) => (


    <li 
        key={team}
        onClick={()=>{
            addTeam(team);
        }}
        >{team.toUpperCase()}</li>
    ))}
</ol>

                </Col>

                <Col>
                <h3>Testing the context klik to remove</h3>
            <ol>
            {players.map((player) => (
                <li 
                    key={player.index}
                    onClick={()=>{
                        remove(player.index);
                    }}
                    >{player.PLAYER_NAME} from {player.TEAM_ABBREVIATION}</li>
                ))}
            </ol>
                
                </Col>


            </Row>

          
            

            
        </div>
    )
}



export default Selector
