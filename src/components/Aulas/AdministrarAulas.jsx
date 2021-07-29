import {Container, Col} from 'react-bootstrap'

import TablaAulas2 from './TablaAulas2'
import React from 'react';

export default () => {

    return (
        <Container fluid className="fondo">
            
            <Col className="seccion-container">
                <h2 className="texto-h2">Listado de Aulas</h2>
                <TablaAulas2/>
            </Col>
        </Container>
    )
}
