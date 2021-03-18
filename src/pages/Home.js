import React from 'react'
import {Row, Col, Jumbotron, Button} from 'react-bootstrap'

import  { useContext } from 'react';
import { PlayersContext } from '../PlayersContext'


const Home = () => {

    const {players,setPlayers} = useContext(PlayersContext)

    return (
        <div>
   
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>Visual NBA Players Analyzer</h1>
                        <p>This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.</p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>

                    <h3>Testing the context</h3>

                    {players.map((player) => (
                    <p key={player.index}>{player.PLAYER_NAME} from {player.TEAM_ABBREVIATION}</p>
                    ))}

                </Col>
            </Row>
            
        </div>
    )
}
export default Home;
