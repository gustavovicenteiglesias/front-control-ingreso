import { Row, Col, Form, Button, Table } from "react-bootstrap";
import React, { useState } from "react";
import * as Api from '../Api'
import Swal from "sweetalert2";

const TablaSeguimientos2 = () => {
    const [hiddenFound, setHiddenFound] = useState(true);
    const [hiddenTable, setHiddenTable] = useState(true);
    const [contactosEstrechos, setContactosEstrechos] = useState([]);
    const [persona, setPersona] = useState({});
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();

    const handleInputDni = (event) => {
        event.preventDefault();
        let length = event.target.value.length
        if (length >= 7) {
            Api.getPersonaByDni(event.target.value)
                .then((data) => {
                    if (data) {
                        setPersona(data);
                        setHiddenFound(!hiddenFound)
                    }
                })

        };
    }
    const handleFechaInicioChange = (event) => {
        setFechaInicio(event.target.value);
    };

    const handleFechaFinChange = (event) => {
        setFechaFin(event.target.value);
    };

    const handleSeguimiento = () => {
        Api.getSeguimientoPersonaByFecha(persona.idPersona, fechaInicio, fechaFin)
            .then((personas) => {
                if(personas && personas.length > 0) {
                    setContactosEstrechos(personas);
                    setHiddenTable(!hiddenTable);
                }
                else {
                    Swal.fire('Bien!', 'No se encontaron contactos estrechos de esta persona', 'success');
                    setHiddenTable(true);
                }
            });
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <Col xs={12} sm={12} lg={3} className="text-center mt-3">
                <Form.Label className="label-dni">Ingrese DNI:</Form.Label>
                <input placehoder="Ingrese dni" type="text" className="form-control" pattern="(^[0-9][0-9]?\.{1}\d{3}\.\d{3}$)|([0-9][0-9]?\d{3}\d{3}$)" onChange={handleInputDni}></input>
            </Col>

            <Col hidden={hiddenFound} className="mt-3 text-center">
                <p className="tag-nombre">
                    Nombre: {persona.nombre}, DNI: {persona.dni}
                </p>
                <h2 className="texto-h2 mt-4">Localizar contactos estrechos: </h2>
                <Row xs={1} lg={2}>
                    <Col>
                        <Form.Label className="label-fecha">Fecha Inicio</Form.Label>
                        <Form.Control type="date" onChange={handleFechaInicioChange} />
                    </Col>
                    <Col>
                        <Form.Label className="label-fecha">Fecha Fin</Form.Label>
                        <Form.Control type="date" onChange={handleFechaFinChange} />
                    </Col>
                </Row>
                <Button variant="outline-info" className="mt-3" onClick={handleSeguimiento}>
                    Realizar Seguimiento
                </Button>
            </Col>

            <Col xs={12}>
                <Table className="mt-3" hidden={hiddenTable} responsive striped bordered variant="light">
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Telefono</th>
                            <th>Correo Electronico</th>
                            <th>Materia</th>
                            <th>Carrera</th>
                            <th>Fecha de contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactosEstrechos.map((persona, i) => {
                            return (
                                <tr>
                                    <td>{persona.nombre}</td>
                                    <td>{persona.telefono}</td>
                                    <td>{persona.mail}</td>
                                    <td>{persona.nombreActividad}</td>
                                    <td>{persona.nombrePropuesta}</td>
                                    <td>{(persona.fechaCarga).slice(0, 10)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Col>
        </div>
    );
};

export default TablaSeguimientos2;
