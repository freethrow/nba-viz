import React, { useContext, useState, useEffect, useMemo } from 'react';
import {useQuery} from 'react-query'

import { PlayersContext } from '../PlayersContext'
import {DatasetContext} from '../DatasetContext'
import useLocalStorage from '../utils/useLocalStorage'


import {Row, Col, Button, Table, ButtonGroup} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import allPlayers from '../allPlayers'


import {firstBy} from "thenby"

const baseURL = 'https://k0f72l.deta.dev/gistfile1'

const fetchBasic = async ()=>{
    const res = await fetch(baseURL);
    return res.json()
}

//



// unique team names
let teams = [...new Set(allPlayers.map(item => item.TEAM_ABBREVIATION))];
teams.sort();





const Selector = () => {



    // the dataset
    const {dataset, setDataset} = useContext(DatasetContext)

    const { data, status } = useQuery('playersBasic', fetchBasic);
   
    
    const {players,setPlayers} = useContext(PlayersContext)
    


    // keep the arrays sorted
/*     useEffect(()=>{
        setAvailable([...available])     

    },[available]) */


    const reset = () =>{
      
        setPlayers([]);
    }


    const addTeam = (team) =>{
        console.log("Add the whole team")
        let teamPlayers = data.filter(player=>{return player.TEAM_ABBREVIATION == team});
        let allPlayers = players.concat(teamPlayers)
        let uniq = [...new Set(allPlayers)];
        setPlayers(uniq);
    }

    const remove = (index) =>{
        let newPlayers = players.filter(player=>{return player.index !== index});
        setPlayers(newPlayers);
    }

    const add = (index) =>{
        
        // find the player by PLAYER_ID
        let playerToAdd= data.find(player => player.index === index);

        console.log("Adding player:", playerToAdd)
        
        // add it to the selected players array
        let newPlayers = [...players, playerToAdd]
        console.log("New players array:", newPlayers)

        // convert to set and then back to array to eliminate dupes
        let uniq = [...new Set(newPlayers)];
        
        // set the players with the new array
        setPlayers(uniq);

    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(row);
             // find the player by PLAYER_ID
        let playerToAdd= row;

        console.log("Adding player:", playerToAdd)
        
        // add it to the selected players array
        let newPlayers = [...players, playerToAdd]
        console.log("New players array:", newPlayers)

        // convert to set and then back to array to eliminate dupes
        let uniq = [...new Set(newPlayers)];
        
        // set the players with the new array
        setPlayers(uniq);
          }
    }

    
    const columns = [{
            dataField: 'index',
            text: 'Player index'
            }, {
            dataField: 'PLAYER_NAME',
            text: 'Player Name',
            filter: textFilter() ,
            sort: true// apply text filter
            }, {
            dataField: 'TEAM_ABBREVIATION',
            text: 'Team',
            filter: textFilter(),
            sort: true // apply text filter
            },
            {
                dataField: 'PTS',
                text: 'Points',
                sort: true
            
                },
                {
                    dataField: 'MIN',
                    text: 'Minutes',
                    sort: true // apply text filter
                    },];

    return (
        <div>

           
            <Row>
                <Col className="col-6"> <h2>Players Selector</h2>
                        <p>Select the players to be compared. Try with the Celtics and the Raptors, for example.</p>
                        <p>After you have selected the players, head off to the scatterplot 
                            or horizontal bar charts to see the visuals...</p>
                        <p>Hit the reset button to start over.</p>
                    
            <Button className="m-3 mx-auto" variant="warning" onClick={()=>{
                reset()
            }}>Reset</Button>
                </Col>
           
            </Row>
           
            <Row>
                <Col className="col-6 fixHeight">


                {status==='error'&&(
                       <div>There was an error fetching the data</div>
                   )}

                    {status==='loading'&&(
                       <div>Loading</div>
                   )}

                   {status==='success'&&(
                       <div>
                        <h3>All players</h3>
                        <p>Click on a player to add it to the analysis</p>
                        

                    
                        {data && (
                        <BootstrapTable
                        striped
                        filterPosition='top'
                        condensed
                        hover
                        keyField='index'
                        data={ data } 
                        columns={ columns }
                        rowEvents={ rowEvents }
                        filter={ filterFactory()}
                         />
                    )}
                            </div>)}
                
                    </Col>


                    <Col className="col-3">
                        <h3>Select whole team</h3>

                        {status==='error'&&(
                       <div>There was an error fetching the data</div>
                   )}

                    {status==='loading'&&(
                       <div>Loading</div>
                   )}

                   {status==='success'&&(
                       <div>
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
                        </Table> </div>   )}                   
                    </Col>

                <Col className="col-3">
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
                            <tr key={player.index} onClick={()=>{
                                    remove(player.index);
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
