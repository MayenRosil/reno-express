import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Toast, Table } from 'react-bootstrap';
import '../styles/RegisterTransaction.css';
var montoTotal = 0;
class RegisterTransaction extends Component{

    state = {
        inventarioJuguetes: [],
        formData: {},
        showToastFail: false,
        toastMessage: '',
        showToastSuccess: false,
        isValid: true,
        nameValid: true,
        nitValid: true,
        addressValid: true,
        montoTotal: 0
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

    onChangeText = (key, value) => {

        this.setState({
            formData: {
                ...this.state.formData,
                [key]: (value.toUpperCase()),
            },
        },() => {
            if(key == 'transactionType'){
                montoTotal = 0
                this.setState({
                    formData: {
                        ...this.state.formData,
                        montoTotal: montoTotal
                    }
                })
                let datoFiltrado = this.state.inventarioJuguetes.filter(dato => (
                    dato.transaccion.toUpperCase() == (this.state.formData.transactionType)
                ))
                console.log(datoFiltrado, this.state.formData.transactionType)
                for(let i = 0; i < datoFiltrado.length; i++){
                    console.log(montoTotal)
                    montoTotal = montoTotal + datoFiltrado[i].precio_unitario_venta
                }
                this.setState({
                    formData: {
                        ...this.state.formData,
                        montoTotal: montoTotal
                    }
                })
            }
        })

    }

    onChange = (key, value) => {
        
    }

    validateFormData = () => {
        console.log(montoTotal)
        console.log(this.state.formData)
        if(this.state.formData.transactionType == null || !this.state.formData.transactionType){
            this.setState({ showToastFail: true, toastMessage: 'Seleccione Tipo de Transacción' })
        }else if(this.state.formData.name == null || this.state.formData.name == ''){
            this.setState({ showToastFail: true, toastMessage: 'Ingrese nombre de Proveedor o Cliente' })
        }else if(this.state.formData.nit == null || this.state.formData.nit == ''){
            this.setState({ showToastFail: true, toastMessage: 'Ingrese NIT' })
        }else if(this.state.formData.address == null || this.state.formData.address == ''){
            this.setState({ showToastFail: true, toastMessage: 'Ingrese Dirección' })
        }else{
            this.setState({ showToastSuccess: true, toastMessage: 'Todos los datos son correctos', showToastFail: false })
            console.log(this.state.formData)
        }
    }

    render = () => {
        let datoFiltrado = this.state.inventarioJuguetes.filter(dato => (
            dato.transaccion.toUpperCase() == (this.state.formData.transactionType)
        ))
        return(

            <Container className="body">
                <Row>
                    <Col className="columna">
                    <Form className="formData">
                    <h2 className="formTitle">Registro de Transacción</h2>
                    <br/>
                        <Form.Group controlId="transactionTypeGroup" className="formData">
                            <Form.Label>Tipo de transacción</Form.Label>
                            <select onChange={(e) => this.onChangeText('transactionType', e.target.value)} className="inputFormulario" name="transactionTypeSelect">
                                <option disabled selected>Selecciona una opción</option>
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                            </select>
                        </Form.Group>
                        <Form.Group controlId="clientNameGroup" className="formData">
                            <Form.Label>Nombre de proveedor o cliente</Form.Label>
                            <input onChange={(e) => this.onChangeText('name', e.target.value)} className="inputFormulario" type="text" placeholder={"Ingrese nombre"}/>
                        </Form.Group>
                        <Form.Group controlId="nitGroup" className="formData">
                            <Form.Label>NIT</Form.Label>
                            <input onChange={(e) => this.onChangeText('nit', e.target.value)} className="inputFormulario" type="text" placeholder="Ingrese NIT"/>
                        </Form.Group>
                        <Form.Group controlId="addressGroup" className="formData">
                            <Form.Label>Dirección</Form.Label>
                            <input onChange={(e) => this.onChangeText('address', e.target.value)} className="inputFormulario" type="text" placeholder="Ingrese Dirección"/>
                        </Form.Group>
                        <Form.Group controlId="addressGroup" className="formData">
                            <p style={{margin: "auto"}}>Detalle de Productos en Transacción:</p>
                            <Table striped bordered className="tablaInventarioRegisterTransaction">
                                <thead>
                                    <tr>
                                        <th className="celdaTablaInventario">
                                            Código
                                        </th>
                                        <th className="celdaTablaInventario">
                                            Marca
                                        </th>
                                        <th className="celdaTablaInventario">
                                            Cantidad
                                        </th>
                                        <th className="celdaTablaInventario">
                                            Precio Unitario
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(datoFiltrado).map(function(item, index)  {
                                        return(
                                            <tr key={index}>
                                                <td className="celdaTablaInventario">{item.codigo}</td>
                                                <td className="celdaTablaInventario">{item.marca}</td>
                                                <td className="celdaTablaInventario">{item.cantidad_existencia}</td>
                                                <td className="celdaTablaInventario">{item.precio_unitario_venta}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Form.Group>
                        <Form.Group controlId="addressGroup" className="formData">
                            <h5>Monto total a pagar:</h5>
                            <h5>{this.state.formData.montoTotal}</h5>
                        </Form.Group>
                        <button className="btnValidarFormulario" type="submit" onClick={(e) => {e.preventDefault(); this.validateFormData()}}>
                            Validar Formulario
                        </button>
                    </Form>
                    <Toast className="toastFormFail" onClose={() => this.setState({ showToastFail: false })} show={this.state.showToastFail} delay={2500} autohide>
                        <Toast.Header className="toastFormHeaderFail">
                            <strong className="mr-auto">Uups!</strong>
                        </Toast.Header>
                        <Toast.Body className="toastFormBodyFail"><h6>{this.state.toastMessage}</h6></Toast.Body>
                    </Toast>
                    <Toast className="toastFormSuccess" onClose={() => this.setState({ showToastSuccess: false })} show={this.state.showToastSuccess} delay={2500} autohide>
                        <Toast.Header className="toastFormHeaderSuccess">
                            <strong className="mr-auto">Yeii!</strong>
                        </Toast.Header>
                        <Toast.Body className="toastFormBodySuccess"><h6>{this.state.toastMessage}</h6></Toast.Body>
                    </Toast>
                    <hr/>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default RegisterTransaction;