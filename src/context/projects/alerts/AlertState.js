import React, { useReducer } from 'react'
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../../types'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'

const AlertState = (props) => {

    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    const showAlert = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                category
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <AlertContext.Provider value={{
            alert: state.alert,
            showAlert,
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
