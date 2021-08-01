import React from 'react';
import {Container, Col}  from 'react-bootstrap';
import '../Actividades/AdministrarActividades.css'
import TablaCohortes2 from './TablaCohortes2'
const AdministrarCohortes = () => {

    return (
        <Container fluid className="fondo">
            
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Cohortes</h2>
                <TablaCohortes2/>
            </Col>
        </Container>
    )
}

export default AdministrarCohortes;
