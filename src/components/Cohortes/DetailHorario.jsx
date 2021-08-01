import React, { useState, useEffect } from 'react'
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, { Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager, MasterDetail } from "devextreme-react/data-grid";
import { FilterRow } from "devextreme-react/tree-list";

import CustomStore from "devextreme/data/custom_store";

const filtros = ["contains", "="];

const columnas = [
    {
        dataField: "dia",
        width: 100,
        caption: "Dia",
    },
    {
        dataField: "horaInicio",
        width: 150,
        caption: "Hora de inicio",
    },
    {
        dataField: "horaFin",
        width: 150,
        caption: "Hora de fin",
    },
    {
        dataField: "nombre",
        width: 150,
        caption: "Modalidad",
    },
];

const DetailHorarios = (props, { idCohorte }) => {
    console.log(props.data.data)
    const [data] = useState(
        new CustomStore({
            key: "idHorario",
            load: () => {
                return Api.getHorariosByCohorte(props.data.data.idCohorte);
            }
        }
        ));

    return (
        <>
        <div style={{'fontWeight': 'bold'}}className="mb-2">
          {`Horarios del cohorte:`}
        </div>
            <DataGrid
                id="dataGrid"
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>

                {columnas.map((c) => {
                    return (
                        <Column dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}>
                            <RequiredRule message={`${c.caption} es un campo obligatorio.`} />
                        </Column>
                    );
                })}
            </DataGrid>
        </>
    )
}

export default DetailHorarios
