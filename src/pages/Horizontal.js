import React, { useContext, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap'
import { PlayersContext } from '../PlayersContext'
import { DatasetContext } from '../DatasetContext'

import metrics from './metrics'

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
                            {metrics.map((metric)=>(
                                <option>{metric}</option>
                            ))}
                        
                        
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
