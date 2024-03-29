import axios from 'axios'
import Swal from 'sweetalert2'
import authHeader from "../services/auth-header"
export const URL_BASE = `http://areco.gob.ar:9528/api`
export const API_GET_ACTIVIDADES = `${URL_BASE}/actividad/all`
export const API_GET_COHORTES = `${URL_BASE}/cohorte/all`
export const API_GET_DEPENDENCIAS = `${URL_BASE}/dependencia/all`
export const API_GET_SEDES = `${URL_BASE}/sede/all`
export const API_GET_AULAS = `${URL_BASE}/aula/all`
export const API_GET_HORARIOS = `${URL_BASE}/horario/all`
export const API_GET_SESIONES = `${URL_BASE}/sesionpresencial/all`


// * ACTIVIDADES *

// Get ALL actividades
export const getActividades = async () => {
    return axios.get(API_GET_ACTIVIDADES, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividades', err, 'error'));
}

export const addActividad = async (idPropuesta, nombreActividad) => {
    return axios.post(`${URL_BASE}/actividad/create-por-propuesta/${idPropuesta}`, { nombre: nombreActividad }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Actividad creada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al crear actividad', err, 'error'));
}

export const updateActividad = async (idActividad, nombreActividad) => {
    return axios.put(`${URL_BASE}/actividad/update/${idActividad}`, { nombre: nombreActividad }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Actividad actualizada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al actualizar actividad', err, 'error'));
}

export const deleteActividad = async (idActividad) => {
    return axios.delete(`${URL_BASE}/actividad/delete/${idActividad}`, { headers: authHeader() })
        .then(response => {
            Swal.fire('Actividad eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al eliminar actividad', err, 'error'));
}
// Get Actividad for ID From API
export const getActividadById = async (idActividad) => {
    return axios.get(`${URL_BASE}/actividad/find/${idActividad}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividad', err, 'error'));
}

export const getActividadesByPropuesta = async (idPropuesta) => {
    return axios.get(`${URL_BASE}/actividad/find/propuesta/${idPropuesta}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener actividad', err, 'error'));
}
// * AULAS *
export const addAula = async (nombre, capacidadConAforo, idEdificio) => {
    return axios.post(`${URL_BASE}/aula/create`, {
        nombre: nombre,
        capacidadConAforo: capacidadConAforo,
        edificio: {
            idEdificio: idEdificio
        }
    }, { headers: authHeader() }).then(response => {
        Swal.fire('Aula creada', '', 'success').then(() => { window.location.reload() });
        return response.data.data;
    })
        .catch(err => Swal.fire('Error al crear aula', err, 'error'));
}
export const getAulas = async () => {
    return axios.get(API_GET_AULAS, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al cargar aulas', err, 'error'));
}

export const getAulaById = async (idAula) => {
    return axios.get(`${URL_BASE}/aula/find/${idAula}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al cargar aula', err, 'error'));
}

export const getAulasByEdificio = async (idEdificio) => {
    return axios.get(`${URL_BASE}/aula/find/edificio/${idEdificio}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al cargar aulas', err, 'error'));
}
export const updateAula = async (idAula, nuevoNombre, nuevaCapacidad) => {
    return axios.put(`${URL_BASE}/aula/update/${idAula}`, {
        nombre: nuevoNombre,
        capacidadConAforo: nuevaCapacidad
    }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Aula actualizada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al actualizar aula', err, 'error'));
}

export const deleteAula = async (idAula) => {
    return axios.delete(`${URL_BASE}/aula/delete/${idAula}`, { headers: authHeader() })
        .then(response => {
            Swal.fire('Aula eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al eliminar aula', err, 'error'));
}

// * DEPENDENCIAS *

export const getDependencias = async () => {
    return axios.get(API_GET_DEPENDENCIAS, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener dependencias', err, 'error'));
}

// * COHORTES *

// Get All Cohortes from API
export const getCohortes = async () => {
    return axios.get(API_GET_COHORTES, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener cohortes', err, 'error'));
}

// Get Cohorte for ID From API
export const getCohorteById = async (idCohorte) => {
    return axios.get(`${URL_BASE}/cohorte/find/${idCohorte}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al encontrar cohorte', err, 'error'));
}

export const deleteCohorte = async (idCohorte) => {
    return axios.delete(`${URL_BASE}/cohorte/delete/${idCohorte}`, { headers: authHeader() })
        .then(response => {
            Swal.fire('Cohorte eliminado', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al eliminar cohorte', err, 'error'));
}
export const addCohorte = async (idActividad, idSede, nombreCohorte, fechaInicio, fechaFin) => {
    return axios.post(`${URL_BASE}/cohorte/create/${idActividad}/${idSede}`,
        {
            nombreCohorte: nombreCohorte,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Cohorte creado!', 'Recargue la pagina para ver los cambios', 'success');
            return response.data
        })
        .catch(err => Swal.fire('Error al crear cohorte', err, 'error'));
}

export const updateCohorte = async (idCohorte, nombreCohorte, fechaInicio, fechaFin) => {
    return axios.put(`${URL_BASE}/cohorte/update/${idCohorte}`, {
        nombreCohorte: nombreCohorte,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
    }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Cohorte actualizado', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al actualizar el cohorte', err, 'error'));
}

// * EDIFICIOS *
export const getEdificiosBySede = async (idSede) => {
    return axios.get(`${URL_BASE}/edificio/sede/find/${idSede}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener edificios', err, 'error'));
}

// * HORARIOS *

export const getHorariosByCohorte = async (idCohorte) => {
    return axios.get(`${URL_BASE}/horario/por-cohorte/${idCohorte}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener horarios', err, 'error'));
}

export const addHorarioByCohorteConAula = async (idActividad, idAula, idCohorte, dia, modalidad, horaInicio, horaFin) => {
    return axios.post(`${URL_BASE}/horario/create-por-cohorte/${idActividad}/${idAula}/${idCohorte}`, {
        dia: dia,
        horaFin: horaFin + ':00',
        horaInicio: horaInicio + ':00',
        nombre: modalidad,
    }, { headers: authHeader() })
        .then(response => {
            Swal.fire('Horario Asignado', '', 'success');
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al asignar horario', err, 'error'));

}

// * LOGIN *

export const login = (usuario, password) => {

    axios({
        method: 'post',
        url: `${URL_BASE}/login/ingreso`,
        headers: { 'Content-Type': 'application/json' },
        data: { userName: usuario, password: password }
    })
        .then(response => console.log(response))
        .catch(err => console.error(err))
}
// * PERSONAS *
export const getPersonas = async () => {
    return axios.get(`${URL_BASE}/persona/all`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener personas', err, 'error'));
}

export const getPersonaByDni = async (dni) => {
    return axios.get(`${URL_BASE}/persona/find/dni/${dni}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener persona', err, 'error'));
}

export const getSeguimientoPersonaByFecha = async (idPersona, fechaInicio, fechaFin) => {
    return axios.get(`${URL_BASE}/persona/find/persona_sesion/${fechaInicio}/${fechaFin}/${idPersona}`, { headers: authHeader() })
        .then(response => response.data.personas)
        .catch(err => Swal.fire('Error al obtener seguimiento', err, 'error'));
}
// * PROPUESTAS *

export const getPropuestasByDependencia = async (idDependencia) => {
    return axios.get(`${URL_BASE}/propuesta/find/dependencia/${idDependencia}`, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener propuestas', err, 'error'));
}

// * SEDES *
export const getSedes = async () => {
    return axios.get(API_GET_SEDES, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener sedes', err, 'error'));
}

//* SESIONES *
export const getSesiones = async () => {
    return axios.get(API_GET_SESIONES, { headers: authHeader() })
        .then(response => response.data.data)
        .catch(err => Swal.fire('Error al obtener sesiones', err, 'error'));
}

export const deleteSesion = async (idSesion) => {
    return axios.delete(`${URL_BASE}/sesionpresencial/delete/${idSesion}`, { headers: authHeader() })
        .then((response) => {
            Swal.fire('Sesion eliminada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al eliminar la sesión', err, 'error'));
}

export const updateSesion = async (idSesion, fecha, aula) => {
    return axios.put(`${URL_BASE}/sesionpresencial/update-fecha/${idSesion}/${aula.idAula}`, {fecha: fecha}, { headers: authHeader() })
        .then((response) => {
            Swal.fire('Sesion actualizada', '', 'success').then(() => { window.location.reload() });
            return response.data.data;
        })
        .catch(err => Swal.fire('Error al actualizar la sesión', err, 'error'));

}