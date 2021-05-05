import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import '../styles/BarraBusqueda.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const BarraBusqueda = (props) => {
    return(
        <>
        <input
            type="search"
            placeholder={"Buscar..."}
            onChange = {props.handleChange}
            style={{width: '50%', borderRadius: 5, boxShadow: "0px 0px 3px #000", margin: 5}}
        />
        </>
    );
};

export default BarraBusqueda;