import React from 'react';
import {Container, Col, Button} from "react-bootstrap";

import ModalAsignarAula from "./ModalAsignarAula";
import {useState} from "react";

import TablaSesiones2 from "./TablaSesiones2";
import '../Actividades/AdministrarActividades.css'
export default () => {
    const [show, setShow] = useState(false);

    return (
        <Container fluid className="fondo">
            
            <Col className="seccion-container">
                <h2 className="texto-h2">Próximas clases</h2>
                <ModalAsignarAula/>
                <TablaSesiones2/>
            </Col>
        </Container>
    );
};
