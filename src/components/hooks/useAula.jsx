import { useState, useEffect } from "react";
import * as Api from '../Api'
export const useAula = () => {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        Api.getAulas().then((aulas) => {
            setAulas(aulas);
        })
    }, []);

    return {
        aulas,
    }
}