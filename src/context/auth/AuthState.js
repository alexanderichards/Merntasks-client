import React, {useReducer } from 'react'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/token'
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'



const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuth: null,
        user: null,
        message: null,
        loading: true         
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const registerUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data)
            const token = response.data.token

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: token
            })

            // get the user
            userAuthenticated()

            
        } catch (error) {
            console.log(error.response)

            const alerta = {
                msg: error.response.data.msg,
                category: "alerta-error"
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('token')
        if(token){
            // funcion para enviar el t oken por headers
            tokenAuth(token)
        }

        try {
            const response = await axiosClient.get('/api/auth')
            // console.log(response)
            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data
            })
            
        } catch (error) {
            // console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const login = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data)
            // console.log(response)
            const token = response.data.token


            dispatch({
                type: LOGIN_EXITOSO,
                payload: token
            })

            userAuthenticated()

        } catch (error) {
            // console.log(error.response)

            const alerta = {
                msg: error.response.data.msg,
                category: "alerta-error"
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const logout = async () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuth: state.isAuth,
            user: state.user,
            message: state.message,
            loading: state.loading,
            registerUser,
            login,
            userAuthenticated,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
