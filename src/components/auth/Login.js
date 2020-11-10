import React, { useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = (props) => {

    const authContext = useContext(AuthContext)
    const { login, isAuth, message} = authContext

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    // en caso de que el usuario se haya autentica o registrado o sea un registo duplicado
    useEffect(() => {

        if(isAuth){
            props.history.push('/projects')
        }

        if(message){
            showAlert(message.msg, message.category)
        }

        // eslint-disable-next-line
    }, [message, isAuth, props.history])

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    })

    const onchange = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        //validar que no hay campos vacios
        //validar que no hay campos vacios
        if(credentials.email.trim() === "" || credentials.password.trim() === ""){
            showAlert( "All fields are required", "alerta-error")
            return
        }

        login(credentials)
        // pasarlo al action
    }


    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Tu email" onChange={onchange} value={credentials.email}></input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Tu password" onChange={onchange} value={credentials.password}></input>
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesion"></input>
                    </div>
                </form>
                <Link to="/register" className="enlace-cuenta">Obtener cuenta</Link>
            </div>
        </div>
    )
}

export default Login
