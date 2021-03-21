import React, { useContext, useState } from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap'
import { PlayersContext } from '../PlayersContext'

import ChartContainer from '../ChartContainer'
import ScatterPlot from '../ScatterPlot'
import metrics from './metrics'






const Scatter = () => {

    const {data,setPlayers} = useContext(PlayersContext)

    
    const [stat1,setStat1] = useState('PTS')
    const [stat2,setStat2] = useState('REB')
    const [stat3,setStat3] = useState('TEAM_ABBREVIATION')
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
                        <Form.Control as="select" value={stat1} custom onChange={(event)=>{
                            setStat1(event.target.value)
                        }}>
                            <option>PTS</option>
                         {metrics.map((metric)=>(
                                <option>{metric}</option>
                            ))}


                        </Form.Control>

                        <Form.Label>Y-axis</Form.Label>
                        <Form.Control as="select" value={stat2} custom onChange={(event)=>{
                            setStat2(event.target.value)
                        }}>
                            <option>REB</option>
                          {metrics.map((metric)=>(
                                <option>{metric}</option>
                            ))}
                        </Form.Control>

                        <Form.Label>Color Scale</Form.Label>
                        <Form.Control as="select" value={stat3} custom onChange={(event)=>{
                            setStat3(event.target.value)
                        }}>
                        
                        <option>TEAM_ABBREVIATION</option>
                        {metrics.map((metric)=>(
                                <option>{metric}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Label>Radius</Form.Label>
                        <Form.Control as="select" value={stat4} custom onChange={(event)=>{
                            setStat4(event.target.value)
                        }}>
                        <option>MIN</option>
                        {metrics.map((metric)=>(
                                <option>{metric}</option>
                            ))}
                        </Form.Control>


                    </Form>

                    <p>Select the 4 metrics and hover the players/circles.</p>

                    <Button variant="secondary" block
                    onClick={
                        ()=>{
                            setStat1('PTS')
                            setStat2('REB')
                            setStat3('TEAM_ABBREVIATION')
                            setStat4('MIN')
                        }
                    }
                    >Reset to basic stats</Button>
                
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
