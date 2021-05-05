import React, { Component } from 'react';
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap';
import '../styles/Inventory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

import BarraBusqueda from '../components/BarraBusqueda';

class Inventory extends Component{

    state = {
        inventarioJuguetes: [],
        busqueda: '',
        ordenTabla: 'desc',
        tipoFiltro: '',
        ordenarCodigo: 'asc',
        ordenarNombre: 'asc',
        ordenarCategoria: 'asc',
        parametroAOrdenar: 'codigo',
        abrirModalDetalle: false,
        dataModalDetalle: {}
    };

    getData = async () => {
        let response = null;
        const query = await fetch(process.env.PUBLIC_URL + '/data.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }).catch((e) => {
            console.log(e);
            return null;
        });
        response = await query.json();
        console.log(response);
        this.setState({ inventarioJuguetes: response });
        console.log(this.state.inventarioJuguetes, 'la data en el state');
    }

    componentDidMount = () => {
        this.getData();
    }

    abrirModalDetalle = (item) => {
        this.setState({
            abrirModalDetalle: true,
            dataModalDetalle: item
        })
    }

    alOrdenar = (ordenTabla, parametroAOrdenar) => {
        //this.setState({ ordenTabla: ordenTabla, tipoFiltro: 'AscDesc' });
        if(parametroAOrdenar == 'codigo'){
            this.setState({ ordenTabla: ordenTabla, tipoFiltro: 'AscDesc', parametroAOrdenar: parametroAOrdenar });
            if(ordenTabla == 'asc'){
                this.setState({ ordenarCodigo: 'desc' })
            }else{
                this.setState({ ordenarCodigo: 'asc' })
            }
        }else if(parametroAOrdenar == 'nombre'){
            this.setState({ ordenTabla: ordenTabla, tipoFiltro: 'AscDesc', parametroAOrdenar: parametroAOrdenar });
            if(ordenTabla == 'asc'){
                this.setState({ ordenarNombre: 'desc' })
            }else{
                this.setState({ ordenarNombre: 'asc' })
            }
        }else if(parametroAOrdenar == 'categoria'){
            this.setState({ ordenTabla: ordenTabla, tipoFiltro: 'AscDesc', parametroAOrdenar: parametroAOrdenar });
            if(ordenTabla == 'asc'){
                this.setState({ ordenarCategoria: 'desc' })
            }else{
                this.setState({ ordenarCategoria: 'asc' })
            }
        }
    }

    render = () =>{
        const { inventarioJuguetes, busqueda, ordenTabla, dataModalDetalle } = this.state;
        const datoFiltrado = inventarioJuguetes.filter(dato => (
            dato.nombre.toLowerCase().includes(busqueda.toLowerCase()) || dato.codigo.toString().includes(busqueda.toString()) || dato.categoria.toLowerCase().includes(busqueda.toLowerCase())
        ))
        const ordenarTabla = inventarioJuguetes.sort((a, b)=>{
            const cambiaOrden = (ordenTabla == 'asc') ? 1 : -1;
            return cambiaOrden * a[this.state.parametroAOrdenar].toString().localeCompare(b[this.state.parametroAOrdenar])
        })
        return(
            <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="tituloInventario">Inventario</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span style={{backgroundColor: 'white', color: '#ebb434', fontSize: 23}}><FontAwesomeIcon icon={faSearch}/></span>
                        <BarraBusqueda handleChange={(e) => this.setState({ busqueda: e.target.value, tipoFiltro: 'barra' })} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered className="tablaInventario">
                        <thead>
                            <tr>
                                <th className="celdaTablaInventario headerTablaInventario">
                                    <button type="button" className="btnOrdenar" onClick={() => this.alOrdenar(this.state.ordenarCodigo, 'codigo')}>Código {this.state.ordenarCodigo == 'asc' ? <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowUp}/></span> : <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowDown}/></span>}</button>
                                </th>
                                <th className="celdaTablaInventario headerTablaInventario">
                                    <button type="button" className="btnOrdenar" onClick={() => this.alOrdenar(this.state.ordenarNombre, 'nombre')}>Nombre {this.state.ordenarNombre == 'asc' ? <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowUp}/></span> : <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowDown}/></span>}</button>
                                </th>
                                <th className="celdaTablaInventario headerTablaInventario">
                                    <button type="button" className="btnOrdenar" onClick={() => this.alOrdenar(this.state.ordenarCategoria, 'categoria')}>Categoría {this.state.ordenarCategoria == 'asc' ? <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowUp}/></span> : <span style={{color: '#000', fontSize: 15}}><FontAwesomeIcon icon={faArrowDown}/></span>}</button>
                                </th>
                                <th className="celdaTablaInventario headerTablaInventario"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.tipoFiltro == 'barra' ? datoFiltrado : ordenarTabla).map((item, index) => (
                                <tr key={index}>
                                    <td className="celdaTablaInventario">{item.codigo}</td>
                                    <td className="celdaTablaInventario">{item.nombre}</td>
                                    <td className="celdaTablaInventario">{item.categoria}</td>
                                    <td className="celdaTablaInventario">
                                        <button type="button" className="btnVerDetalle" onClick={() => this.abrirModalDetalle(item)}>Ver Detalle</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal 
                show={this.state.abrirModalDetalle}
                onHide={() => this.setState({ abrirModalDetalle: false })}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="titleDetail">{dataModalDetalle.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{flexDirection: 'column'}}>
                    <Col style={{ margin: 10 }}>
                        <img src={dataModalDetalle.image} alt={dataModalDetalle.nombre} width={250} style={{ margin: 'auto', display: 'flex', justifyContent: 'center', borderRadius: 5, border: '5px solid #ddd',   }}/>
                    </Col>
                    <Col>
                        <Table>
                            {Object.keys(dataModalDetalle).map(function(key, i) {
                                if(key != 'image'){
                                    return(
                                            <tr className='tableRowDetail'>
                                                <td className="celdaTablaInventario" style={{color: '#215e9c'}}>{(key.charAt(0).toUpperCase() + key.substring(1)).replace(/_|#|-|@|<>|^[H]/g, " ")}</td>
                                                <th className="celdaTablaInventario">{dataModalDetalle[key]}</th>
                                            </tr>

                                    )
                                }
                            })}
                        </Table>
                    </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </>
        );
    }

}

export default Inventory;