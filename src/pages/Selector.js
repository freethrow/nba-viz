import React, { useContext, useState, useEffect, useMemo } from 'react';
import { PlayersContext } from '../PlayersContext'
import useLocalStorage from '../utils/useLocalStorage'

import {Row, Col, Button, Table} from 'react-bootstrap'

import sample from '../sample';
import allPlayers from '../allPlayers'


import {firstBy} from "thenby"


// unique team names
let teams = [...new Set(allPlayers.map(item => item.TEAM_ABBREVIATION))];
teams.sort();
console.log("Teams:", teams)

const Selector = () => {

    
    const [sortKey, setSortKey] = useState("TEAM_ABBREVIATION")
    const [available, setAvailable] = useState(allPlayers.sort((a, b) => a['TEAM_ABBREVIATION'].localeCompare(b['TEAM_ABBREVIATION'])))

    console.log("AVAILABLE:", available)
    const {players,setPlayers} = useContext(PlayersContext)


    // sort by team
    const sortByName = ()=>{
        
        const ss = available.sort(
            firstBy("PLAYER_NAME", {ignoreCase:true})
            .thenBy("TEAM_ABBREVIATION")
        );
        setAvailable(ss);
    }

    const sortByTeam = ()=>{
        
        const ss = available.sort(
            firstBy("TEAM_ABBREVIATION", {ignoreCase:true})
            .thenBy("PLAYER_NAME")
        );
        setAvailable(ss);
    }


    const sortByPoints = ()=>{
        
        const ss = available.sort(
            firstBy("PTS", {ignoreCase:true, direction:"desc"})
            .thenBy("PLAYER_NAME")
        );
        setAvailable(ss);
    }



    // keep the arrays sorted
    useEffect(()=>{
        setAvailable([...available])      

    },[available])


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
        let newPlayers = players.filter(player=>{return player.PLAYER_ID !== index});
        setPlayers(newPlayers);

        // add player to available
        let playerToAvailable = players.find(player => player.PLAYER_ID === index);
        let newAvailable = [...available, playerToAvailable]
        let uniq = [...new Set(newAvailable)];
        
        setAvailable(uniq)
    }

    const add = (index) =>{
        
        // find the player by PLAYER_ID
        let playerToAdd= available.find(player => player.PLAYER_ID === index);
        
        // add it to the selected players array
        let newPlayers = [...players, playerToAdd]

        // convert to set and then back to array to eliminate dupes
        let uniq = [...new Set(newPlayers)];
        
        // set the players with the new array
        setPlayers(uniq);

        // remove player with index from available
        let newAvailable = available.filter(player=>{return player.PLAYER_ID !== index});        
        setAvailable(newAvailable);
    }

    return (
        <div>
            <Row>
                <Col className="text-center"> <h2>Players Selector</h2>
                        <p>Select the players to be compared.</p>
                        <p>After you have selected the players, head off to the scatterplot 
                            or horizontal bar charts to see the visuals...</p>
                        <p>Hit the reset button to start over.</p>
            <Button className="m-3 mx-auto" variant="warning" onClick={()=>{
                reset()
            }}>Reset</Button>
                </Col>
           
            </Row>
            <Row>
                <Col>
                <h3>All players</h3>
                <p>Click on a player to add it to the analysis</p>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th onClick={()=>{
                                sortByTeam()
                            }}>Team</th>
                        <th onClick={()=>{
                                sortByName()
                            }}>Name</th>
                        
                        <th onClick={()=>{
                                sortByPoints()
                            }}>Points</th>
                        
                        
                        </tr>
                    </thead>
                    <tbody>
                        {available.map((player) => (
                            <tr key={player.PLAYER_ID} onClick={()=>{
                                    add(player.PLAYER_ID);
                                }}
                            >
                                <td>{player.TEAM_ABBREVIATION}</td>
                                <td>{player.PLAYER_NAME} {players.includes(player)?
                                (<i class="fas fa-check"></i>):""}</td>
                                <td>{player.PTS}</td>
                               
                            </tr>
                            ))}                        
                    </tbody>
                    </Table>
                    </Col>


                    <Col>
                <h3>Select whole team</h3>
                <p>Click on a team to add <em>all of it's players</em> to the analysis</p>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team} onClick={()=>{
                                    addTeam(team);
                                }}
                            >
                                <td>{team}</td>
                               
                            </tr>
                            ))}                        
                    </tbody>
                    </Table>

                
           
                </Col>

                <Col>
                <h3>Selected players</h3>
                <p>These are the selected players whose stats will 
                    be visualized. Remove players by clicking on them.</p>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Team</th>
                        <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.PLAYER_ID} onClick={()=>{
                                    remove(player.PLAYER_ID);
                                }}
                            >
                                <td>{player.TEAM_ABBREVIATION}</td>
                                <td>{player.PLAYER_NAME}
                                
                                </td>
                            </tr>
                            ))}                        
                    </tbody>
                    </Table>
                
                </Col>


            </Row>

          
            

            
        </div>
    )
}



export default Selector
