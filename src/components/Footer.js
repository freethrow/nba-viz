import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'


const Footer = () => {
    return (
        <footer>
            <Container>
            <hr/>
            <Row>
                <Col className="text-center py-2">Made by freethrow in 2021</Col>
            </Row>
            </Container>
        </footer>
    )
}

export default Footer