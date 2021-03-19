import React, { useContext, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap'
import { PlayersContext } from '../PlayersContext'

import ChartContainer from '../ChartContainer'
import HorizontalBarChart from '../HorizontalBarChart'



const Horizontal = () => {

    const {data,setPlayers} = useContext(PlayersContext)

    
    const [stat,setStat] = useState('PTS')

    const setHeight = (numPlayers)=> {
        if(numPlayers<20){
            return 500
        } 

        if(numPlayers<30){
            return 700
        }
        return 800
    }
    

    return (
        <div>

            <h2>Horizontal Bar Chart Analysis</h2>
            <Row>
                <Col sm={2}>
                    <h4>Select metrics</h4>
                    <Form>
                    <Form.Group controlId="states">
                        <Form.Label>X-axis</Form.Label>
                        <Form.Control as="select" custom onChange={(event)=>{
                            setStat(event.target.value)
                        }}>
                        <option>PTS</option>
                        <option>REB</option>
                        <option>OREB</option>
                        <option>DREB</option>
                        <option>MIN</option>
                        <option>AST</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        <option>BLKA</option>
                        <option>FGM</option>
                        <option>FGA</option>
                        <option>FG_PCT</option>
                        <option>FG3M</option>
                        <option>FG3A</option>
                        <option>FG3_PCT</option>
                        <option>FTM</option>
                        <option>FTA</option>
                        <option>FT_PCT</option>
                        <option>TOV</option>
                        <option>PF</option>
                        <option>PFD</option>
                        <option>PLUS_MINUS</option>
                        <option>DD2</option>
                        <option>TD3</option>
                        </Form.Control>

                    </Form.Group>
                    </Form>

                    
                    <p>Just select the metric that you want to see and sort by using the buttons below.</p>
                
                </Col>
                <Col sm={10}>
                <ChartContainer
                    class="horizontalBar"
                    renderChart={data => (
            
                    <HorizontalBarChart 
                        
                        data={data}
                        stat={stat}
                        height={setHeight(data.length)}
                        width={700}
                    />            
                )}
            />
                </Col>
            </Row>
           
            
            
        </div>
    )
}



export default Horizontal
