import {useState, useEffect} from 'react'
import * as Api from '../Api'
export default usePersona = () => {
    const [personas, setPersonas] = useState([])

    useEffect(() => {
          Api.getPersonas().then(res => {
                setPersonas(res)
          })
    }, []);

    return {
        personas,
    }
}

