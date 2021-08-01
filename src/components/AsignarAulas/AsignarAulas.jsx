import React from 'react';
import { Container, Col} from "react-bootstrap";
import TablaSesiones2 from "./TablaSesiones2";
import '../Actividades/AdministrarActividades.css'
export default () => {

    return (
        <Container fluid className="fondo">

            <Col className="seccion-container">
                <h2 className="texto-h2">Próximas clases</h2>
                <TablaSesiones2 />
            </Col>
        </Container>
    );
};
