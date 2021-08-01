import { Form, Button, Modal} from "react-bootstrap";
import { useState, useEffect } from "react";
import * as Api from "../Api.js";
import React from 'react';
import {useSedes} from '../hooks/useSedes'
import {useDependencias} from '../hooks/useDependencias'

const DIAS_SEMANA = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const MODALIDADES = ["Practico", "Teorico", "Teorico-Practico", "Actividad Extracurricular"];

let placeholder = "Ingrese una";

export default (props) => {

    var actividadCohorte = { nombre: "default" };
    // * Parametros
    const [show, setShow] = useState(false);
    const {sedes} = useSedes();
    const {dependencias} = useDependencias();
    
    const [propuestas, setPropuestas] = useState([]);
    const [actividades, setActividades] = useState([]);
    const [cohortes, setCohortes] = useState([]);

    // * Cohorte
    const [nombre, setNombre] = useState("");
    const [sede, setSede] = useState();
    const [dependencia, setDependencia] = useState();
    const [propuesta, setPropuesta] = useState();
    const [actividad, setActividad] = useState();
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    // const [sedeDelCohorte, setSedeDelCohorte] = useState();
    const [actividadDelCohorte, setActividadDelCohorte] = useState({
        nombre: "default",
    });

    // * Horario
    const [dia, setDia] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFin, setHoraFin] = useState();
    const [modalidad, setModalidad] = useState();
    const [aula, setAula] = useState();
    const [edificiosDelCohorte, setEdificiosDelCohorte] = useState([]);
    const [aulasDelEdificio, setAulasDelEdificio] = useState([]);
    const [hiddenActividad, setHiddenActividad] = useState(true);

    // * Extra
    const [cohorteCreado, setCohorteCreado] = useState();

    // * Eventos
    const handleNombre = (event) => setNombre(event.target.value);
    const handleSede = (event) => setSede(event.target.value);
    const handleDependencia = (event) => {
        setDependencia(event.target.value);
        Api.getPropuestasByDependencia(event.target.value).then((data) => {
            setPropuestas(data);
        });
    };
    const handlePropuesta = (event) => {
        setPropuesta(event.target.value);
        Api.getActividadesByPropuesta(event.target.value).then((data) => {
            setActividades(data);
        });
    };
    const handleActividad = (event) => setActividad(event.target.value);
    const handleFechaInicio = (event) => setFechaInicio(event.target.value);
    const handleFechaFin = (event) => setFechaFin(event.target.value);
    const handleDia = (event) => setDia(event.target.value);
    const handleHoraInicio = (event) => setHoraInicio(event.target.value);
    const handleHoraFin = (event) => setHoraFin(event.target.value);
    const handleModalidad = (event) => setModalidad(event.target.value);
    const handleCohorte = (event) => {
        setCohorteCreado(event.target.value)

        Api.getCohorteById(event.target.value).then((data) => {
            console.log(data);
            setActividadDelCohorte(data.actividad);
            actividadCohorte = data.actividad;
            console.log('Variable: ', actividadCohorte);
            console.log('State: ', actividadDelCohorte);
            setHiddenActividad(!hiddenActividad);
            Api.getEdificiosBySede(data.sede.idSede).then((data) => {
                setEdificiosDelCohorte(data)
            })
        })
    };
    const handleEdificio = event => {
        Api.getAulasByEdificio(event.target.value).then((data) => {
            setAulasDelEdificio(data);
        });
    };
    const handleAula = event => setAula(event.target.value);
    const handleSubmit = async () => { };

    const handleCrearCohorte = async () => {
        console.log(`${nombre}, ${sede}, ${dependencia}, ${propuesta}, ${actividad}, ${fechaInicio}, ${fechaFin}`);
        console.log(Api.addCohorte(actividad, sede, nombre, fechaInicio, fechaFin).then((res) => setCohorteCreado(res)));
    };
    const handleAsignarHorario = async () => {
        Api.addHorarioByCohorteConAula(actividadDelCohorte.idActividad, aula, cohorteCreado, dia, modalidad, horaInicio, horaFin)

    };

    useEffect(() => {
        setShow(props.showModal);
    }, [props.showModal]);



    useEffect(() => {
        Api.getCohortes().then((res) => {
            setCohortes(res);
        });

    }, [cohorteCreado]);
    return (
        <>
            <Modal show={show} onHide={props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Cohorte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formNombre" className="mt-2">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={handleNombre} autoComplete="off" type="text" placeholder="Ejemplo: Primer Cuatrimestre" required />
                    </Form.Group>
                    <Form.Group controlId="formSede" className="mt-2">
                        <Form.Label>Sede</Form.Label>
                        <Form.Control onChange={handleSede} defaultValue={placeholder} as="select" required>
                            <option disabled value={placeholder}>
                                {placeholder}
                            </option>
                            {sedes.map((sede) => (
                                <option key={sede.idSede} value={sede.idSede}>
                                    {sede.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDependencia" className="mt-2">
                        <Form.Label>Dependencia: </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handleDependencia} required>
                            <option disabled value={placeholder}>
                                {placeholder}
                            </option>
                            {dependencias.map((dependencia) => (
                                <option key={dependencia.idDependencia} value={dependencia.idDependencia}>
                                    {dependencia.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formPropuesta" className="mt-2">
                        <Form.Label>Propuesta </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handlePropuesta} required>
                            <option disabled value={placeholder}>
                                {placeholder}
                            </option>
                            {propuestas.map((propuesta) => (
                                <option key={propuesta.idPropuesta} value={propuesta.idPropuesta}>
                                    {propuesta.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formActividad" className="mt-2">
                        <Form.Label>Actividad </Form.Label>
                        <Form.Control as="select" defaultValue={placeholder} onChange={handleActividad} required>
                            <option disabled value={placeholder}>
                                {placeholder}
                            </option>
                            {actividades.map((actividad) => (
                                <option key={actividad.idActividad} value={actividad.idActividad}>
                                    {actividad.nombre}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFechaInicio" className="mt-2">
                        <Form.Label>Fecha Inicio</Form.Label>
                        <Form.Control type="date" onChange={handleFechaInicio} required />
                    </Form.Group>

                    <Form.Group controlId="formFechaFin" className="mt-2">
                        <Form.Label>Fecha Fin</Form.Label>
                        <Form.Control type="date" onChange={handleFechaFin} required />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" block onClick={handleCrearCohorte}>
                        Crear Cohorte
                    </Button>
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Asignar Dias y Horarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formCohorte" className="mt-2">
                        <Form.Label>Cohorte</Form.Label>
                        <Form.Control as="select" onChange={handleCohorte} required>
                            <option key="blank" hidden value>
                                Seleccione uno
                            </option>
                            {cohortes.map((cohorte) => (
                                <option key={cohorte.idCohorte} value={cohorte.idCohorte}>
                                    {`${cohorte.idCohorte} - ${cohorte.nombreCohorte}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formActividad" className="mt-2" hidden={hiddenActividad}>
                        <Form.Label>Actividad</Form.Label>
                        <Form.Control type="text" value={actividadDelCohorte.nombre} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formEdificio" className="mt-2">
                        <Form.Label>Edificio</Form.Label>
                        <Form.Control as="select" onChange={handleEdificio} required>
                            <option key="blank" hidden value>
                                Seleccione uno
                            </option>
                            {edificiosDelCohorte.map((edificio) => (
                                <option key={edificio.idEdificio} value={edificio.idEdificio}>
                                    {`${edificio.idEdificio} - ${edificio.nombre}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formAula" className="mt-2">
                        <Form.Label>Aula</Form.Label>
                        <Form.Control as="select" onChange={handleAula} required>
                            <option key="blank" hidden value>
                                Seleccione una
                            </option>
                            {aulasDelEdificio.map((aula) => (
                                <option key={aula.idAula} value={aula.idAula}>
                                    {`${aula.idAula} - ${aula.nombre}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formDia" className="mt-2">
                        <Form.Label>Dia</Form.Label>
                        <Form.Control as="select" onChange={handleDia}>
                            <option key="blank" hidden value>
                                Seleccione uno
                            </option>
                            {DIAS_SEMANA.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formHoraInicio" className="mt-2">
                        <Form.Label>Hora Inicio</Form.Label>
                        <Form.Control type="time" value={horaInicio} onChange={handleHoraInicio} />
                    </Form.Group>
                    <Form.Group controlId="formHoraFin" className="mt-2">
                        <Form.Label>Hora Fin</Form.Label>
                        <Form.Control type="time" value={horaFin} onChange={handleHoraFin} />
                    </Form.Group>
                    <Form.Group controlId="formModalidad" className="mt-2">
                        <Form.Label>Modalidad</Form.Label>
                        <Form.Control as="select" onChange={handleModalidad} defaultValue="Seleccione una">
                            <option disabled>Seleccione una</option>
                            {MODALIDADES.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button className="mt-3" variant="primary" block onClick={handleAsignarHorario}>
                        Asignar Horario
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={props.handleClose}>
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
