import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types"

const AuthReducer = (state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO: {
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                isAuth: true,
                message: null,
                loading: false
            }
        }
        case CERRAR_SESION:
        case LOGIN_ERROR: 
        case REGISTRO_ERROR: {
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuth: null,
                user: null,
                message: action.payload,
                loading: false
            }
        }
        case OBTENER_USUARIO:
            return{
                ...state,
                user:  action.payload.user,
                isAuth: true,
                loading: false
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                isAuth: true,
                message: null
            }
        default:{
            return state
        }
    }
}

export default AuthReducer