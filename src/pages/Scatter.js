import React, { useContext, useState } from 'react';
import { Row, Col, Form} from 'react-bootstrap'
import { PlayersContext } from '../PlayersContext'

import ChartContainer from '../ChartContainer'
import ScatterPlot from '../ScatterPlot'



const Scatter = () => {

    const {data,setPlayers} = useContext(PlayersContext)

    
    const [stat1,setStat1] = useState('PTS')
    const [stat2,setStat2] = useState('REB')
    const [stat3,setStat3] = useState('PLUS_MINUS')
    const [stat4,setStat4] = useState('MIN')
    

    return (
        <div>

            <h2>Scatter Plot Analysis</h2>
            <Row>
                <Col sm={2}>
                    <h4>Select metrics</h4>
                    <Form>
                    <Form.Group controlId="states">
                        <Form.Label>X-axis</Form.Label>
                        <Form.Control as="select" custom onChange={(event)=>{
                            setStat1(event.target.value)
                        }}>
                        <option>PTS</option>
                        <option>MIN</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        </Form.Control>

                        <Form.Label>Y-axis</Form.Label>
                        <Form.Control as="select" custom onChange={(event)=>{
                            setStat2(event.target.value)
                        }}>
                        <option>REB</option>
                        <option>MIN</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        </Form.Control>

                        <Form.Label>Color Scale</Form.Label>
                        <Form.Control as="select" value={stat3} custom onChange={(event)=>{
                            setStat3(event.target.value)
                        }}>
                        <option>PTS</option>
                        <option>MIN</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        <option>TEAM_ABBREVIATION</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Label>Radius</Form.Label>
                        <Form.Control as="select" custom onChange={(event)=>{
                            setStat4(event.target.value)
                        }}>
                        <option>PTS</option>
                        <option>MIN</option>
                        <option>AGE</option>
                        <option>STL</option>
                        <option>BLK</option>
                        </Form.Control>


                    </Form>
                
                </Col>
                <Col sm={10}>
                <ChartContainer
                renderChart={data => (
            
                    <ScatterPlot
                        data={data}
                        stat1={stat1}
                        stat2={stat2}
                        stat3={stat3}
                        stat4={stat4}
                        height={500}
                        width={800}
                    />            
                )}
            />
                </Col>
            </Row>
           
            
            
        </div>
    )
}



export default Scatter
