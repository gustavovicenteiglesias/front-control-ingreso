import React from "react";
import { Container, Card } from "react-bootstrap";
import TablaSeguimientos2 from "./TablaSeguimientos2";

const AdminSeguimientos = () => {
      return (
            <Container fluid className="fondo">
                  <Card>
                        <h2 className="texto-h2">Seguimientos de Personas</h2>
                        <TablaSeguimientos2 />
                  </Card>
            </Container>
      );
};

export default AdminSeguimientos;
