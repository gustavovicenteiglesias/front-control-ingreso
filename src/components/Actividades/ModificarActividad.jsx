import React from "react";
import {useState, useEffect} from "react";
import {Modal, Form, Button} from "react-bootstrap";
import * as Api from "../Api.js";

export const ModificarActividad = (props) => {
    const [nuevoNombre, setNuevoNombre] = useState(props.actividad.nombreActividad);
    const [showModal, setShowModal] = useState();
    const handleSubmit = async () => {
        Api.updateActividad(props.actividad.idActividad, nuevoNombre);
        setShowModal(false);
    };

    const handleNombre = (event) => setNuevoNombre(event.target.value);

    useEffect(() => {
        setShowModal(props.showModal);
    }, [props.showModal]);
    return (
        <div>
            <Modal show={showModal} onHide={props.handleHide} >
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Actividad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formDependenciaActividad" className="mt-2">
                        <Form.Label>Dependencia</Form.Label>
                        <Form.Control type="text" value={props.actividad.nombreDependencia} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formPropuestaActividad" className="mt-2">
                        <Form.Label>Propuesta</Form.Label>
                        <Form.Control type="text" value={props.actividad.nombrePropuesta} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formNombreActividad" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" defaultValue={props.actividad.nombreActividad} onChange={handleNombre} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                   { /*<Button variant="secondary" onClick={props.handleClose}>
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
