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
                    <Jumbotron fluid className="red">
                        <h1>Visual NBA Players Analyzer</h1>
                        <p>Select players.Select metrics. Compare.</p>                                       
                    </Jumbotron>


                   

                </Col>
            </Row>

            <Row>
            <Col>
                <h3>Basic Stats</h3>
                <p>
         
                <strong>FGM</strong> Field Goals Made<hr/>
                <strong>FGA</strong> Field Goals Attempted<hr/>
                <strong>FG%</strong> Field Goal Percentage<hr/>
                <strong>3PM</strong> 3 Point Field Goals Made<hr/> 
                <strong>3PA</strong> 3 Point Field Goals Attempted<hr/>
                <strong>3P%</strong> 3 Point Field Goals Percentage<hr/>
                <strong>FTM</strong> Free Throws Made<hr/> 
                <strong>FTA</strong> Free Throws Attempted <hr/> 
                <strong>FT%</strong> Free Throw Percentage<hr/> 
                <strong>OREB</strong> Offensive Rebounds<hr/> 
                <strong>DREB</strong> Defensive Rebounds<hr/> 
                <strong>REB</strong> Rebounds<hr/>
                <strong>AST</strong> Assists<hr/>
                <strong>TOV</strong> Turnovers <hr/> 
                <strong>STL</strong> Steals <hr/>
                <strong>BLK</strong> Blocks <hr/>
                <strong>PF</strong> Personal Fouls <hr/> 
                <strong>FP</strong> Fantasy Points <hr/> 
                <strong>DD2</strong> Double doubles <hr/> 
                <strong>TD3</strong> Triple doubles <hr/>
               
                </p>
                </Col>
                
                <Col>
                <h3>Advanced Stats</h3>
                <p>
         
                <strong>GP</strong> Games Played<hr/>
                <strong>W</strong> Wins<hr/>
                <strong>L</strong> Losses<hr/>
                <strong>MIN</strong> Minutes Played<hr/>
                <strong>OffRtg</strong> Offensive Rating<hr/>
                <strong>DefRtg</strong> Defensive Rating<hr/>
                <strong>NetRtg</strong> Net Rating<hr/>
                <strong>AST% </strong> Assist Percentage<hr/>
                <strong>AST/TO</strong> Assist to Turnover Ratio<hr/>
                <strong>AST Ratio</strong> Assist Ratio<hr/>
                <strong>OREB% </strong> Offensive Rebound Percentage<hr/> 
                <strong>DREB% </strong> Defensive Rebound Percentage<hr/>
                <strong> REB% </strong> Rebound Percentage <hr/>
                <strong>TO Ratio</strong> Turnover Ratio <hr/>
                <strong>eFG% </strong> Effective Field Goal Percentage<hr/>
                <strong>TS% </strong> True Shooting Percentage <hr/>
                <strong>USG% </strong> Usage Percentage <hr/>
                <strong>PACE </strong> Pace <hr/>
                <strong>PIE </strong> Player Impact<hr/>
                <strong>PLUS_MINUS</strong> +/- Plus Minus <hr/>
                </p>
                </Col>
            </Row>
            
        </div>
    )
}
export default Home;
