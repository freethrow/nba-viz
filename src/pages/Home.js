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
                    <Jumbotron className="red">
                        <h1>Visual NBA Players Analyzer</h1>
                        <p>Select players.Select metrics. Compare.</p>                                       
                    </Jumbotron>

                   

                </Col>
            </Row>
            
        </div>
    )
}
export default Home;
