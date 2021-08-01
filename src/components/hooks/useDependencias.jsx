import { useState, useEffect } from "react";
import * as Api from '../Api'
export const useDependencias = () => {

    const [dependencias, setDependencias] = useState([]);

    useEffect(() => {
        // Get all Dependencias from API
        Api.getDependencias()
            .then((data) => {
                setDependencias(data);
                console.log("Dependencias", dependencias);
            })
    }, []);

    return {
        dependencias,
    }
}