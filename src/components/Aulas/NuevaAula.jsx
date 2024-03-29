// TODO: Las nuevas aulas deben admitir solo capacidades mayores a 0
// Todo: Las nuevas aulas deben tener nombre.

import {Modal, Button, Form} from "react-bootstrap";
import * as Api from "../Api";
import {useState, useEffect} from "react";
import React from 'react';
import { useSedes } from "../hooks/useSedes";
export default ({show, handleClose}) => {
    // * Parametros * 
    const [, setShow] = useState();
    const [nombre, setNombre] = useState();
    const [capacidad, setCapacidad] = useState();
    const [edificios, setEdificios] = useState([]);
    const [idEdificio, setIdEdificio] = useState();
    const {sedes} = useSedes();

    // * Eventos *
    const handleSede = async (event) => Api.getEdificiosBySede(event.target.value).then((res) => setEdificios(res));
    const handleEdificio = (event) => setIdEdificio(event.target.value);
    const handleCapacidad = (event) => setCapacidad(event.target.value);
    const handleNombre = (event) => setNombre(event.target.value);


    const handleSubmit = async () => {
        Api.addAula(nombre, capacidad, idEdificio)
        handleClose();
    };

    // * useEffects * 


    useEffect(() => {
        setShow(show);
    }, [show]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Aula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formAulaNombre" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" onChange={handleNombre} autoComplete="off" placeholder="Ingrese nombre" />
                    </Form.Group>
                    <Form.Group controlId="formAulaCapacidad" className="mt-2">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control type="number" onChange={handleCapacidad} autoComplete="off" placeholder="Ingrese capacidad del aula" />
                    </Form.Group>
                    <Form.Group controlId="formSedeAula" className="mt-2">
                        <Form.Label>Sede</Form.Label>
                        <Form.Control as="select" onChange={handleSede} defaultValue={"Seleccione una"}>
                            <option selected disabled>
                                Seleccione una
                            </option>
                            {sedes.map((sede) => (
                                <option key={sede.idSede} value={sede.idSede}>
                                    {sede.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEdificioAula" className="mt-2">
                        <Form.Label>Edificio</Form.Label>
                        <Form.Control as="select" onChange={handleEdificio} defaultValue={"Seleccione uno"}>
                            <option selected disabled>
                                Seleccione uno
                            </option>
                            {edificios.map((edificio) => (
                                <option key={edificio.idEdificio} value={edificio.idEdificio}>
                                    {edificio.nombre}
                                </option>
                            ))}
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
        </>
    );
};
