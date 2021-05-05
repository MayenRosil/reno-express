import React, { Component } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

class Navigation extends Component {
  render() {
    return (
        <Navbar expand="lg" className="barraNavegacionPrincipal navbar-dark">
            <Navbar.Brand className="nombrePrincipal"><img src={process.env.PUBLIC_URL+'/images/reno.png'} width={60}/>Reno Express</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Container> 
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    
                        <Link className='navbar-brand' to='/'><span className="itemNavegacion">Inventario</span></Link>
                        <Link className='navbar-brand'><span className="itemNavegacion"></span></Link>
                        <Link className='navbar-brand' to='/registrarTransaccion'><span className="itemNavegacion">Registrar Transacción</span></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
}

export default Navigation;
