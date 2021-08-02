import React from "react";
import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import * as Api from "../Api.js";


const ModificarSesion = ({ showModal, handleClose, sesion }) => {

    const [aulasPorEdificio, setAulasPorEdificio] = useState([]);
    const [show, setShow] = useState();
    const [fecha, setFecha] = useState();
    const [aula, setAula] = useState(sesion.aula);

    const handleFecha = event => setFecha(event.target.value);
    const handleAula = event => {
        Api.getAulaById(event.target.value).then(aula => setAula(aula));
    }

    const handleSubmit = () => {
        console.log(aula);
        Api.updateSesion(sesion.idSesionPresencial, fecha, aula)
    }

    useEffect(() => {
        setShow(showModal);
    }, [showModal]);

    useEffect(() => {
        Api.getAulasByEdificio(sesion.idEdificio).then(aulas => {
            setAulasPorEdificio(aulas);
        });
    }, [sesion.idEdificio]);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formActividad" className="mt-2">
                        <Form.Label>Actividad</Form.Label>
                        <Form.Control type="text" defaultValue={sesion.nombreActividad} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formFecha" className="mt-2">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" defaultValue={sesion.fecha} onChange={handleFecha} />
                    </Form.Group>
                    <Form.Group controlId="formAula" className="mt-2">
                        <Form.Label>Aula</Form.Label>
                        <Form.Control as="select" defaultValue={sesion.aula.idAula} onChange={handleAula}>
                            <option value={sesion.aula.idAula} hidden>{sesion.aula.nombre}</option>
                            {aulasPorEdificio ? aulasPorEdificio.map(aula => <option key={aula.idAula} value={aula.idAula}>{aula.nombre}</option>) : ''}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>*/}
                    <Button variant="primary" block onClick={handleSubmit}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModificarSesion;