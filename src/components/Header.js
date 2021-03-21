import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" expand="lg"  fixed="top" variant="dark" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">NBA Visual Analyzer</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/">
                            <Nav.Link><i class="fas fa-home"></i>  Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/select">
                            <Nav.Link><i class="fas fa-address-book"></i>  Select players</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/scatter">
                            <Nav.Link><i class="fas fa-address-book"></i>  Scatter Plot</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/horizontal">
                            <Nav.Link><i class="fas fa-address-book"></i>  Horizontal</Nav.Link>
                        </LinkContainer>
                        
                         
                          
                    </Nav>                
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header

