import { useState, useEffect } from "react";
import * as Api from '../Api'

export const useSedes = () => {
    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        Api.getSedes().then((res) => {
            setSedes(res);
        });
    }, []);

    return {
        sedes,
    }
}