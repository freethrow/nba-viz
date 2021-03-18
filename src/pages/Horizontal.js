import React, { useContext, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap'
import { PlayersContext } from '../PlayersContext'

import ChartContainer from '../ChartContainer'
import HorizontalBarChart from '../HorizontalBarChart'



const Horizontal = () => {

    const {data,setPlayers} = useContext(PlayersContext)

    
    const [stat,setStat] = useState('PTS')

    

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
                        <option>MIN</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        </Form.Control>

                    </Form.Group>
                    </Form>
                
                </Col>
                <Col sm={10}>
                <ChartContainer
                    class="horizontalBar"
                    renderChart={data => (
            
                    <HorizontalBarChart 
                        
                        data={data}
                        stat={stat}
                        height={500}
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
