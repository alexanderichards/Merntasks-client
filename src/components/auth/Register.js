import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const { registerUser , message, isAuth} = authContext

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
        password: "",
        name: "",
        passwordConfirm: ""
    })

    const onchange = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        //validar que no hay campos vacios
        if(credentials.name.trim() === "" || credentials.email.trim() === "" || credentials.password.trim() === "" || credentials.passwordConfirm.trim() === ""){
            showAlert( "All fields are required", "alerta-error")
            return
        }
        // password minimo de 6 caraceteres
        if(credentials.password.length < 6){
            showAlert( "The password must be at least 6 characters", "alerta-error")
            return
        }

        if(credentials.password !== credentials.passwordConfirm){
            showAlert('Both passwords must match', "alerta-error")
            return
        }

        registerUser({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        })

        /// 2 password iguales

        // pasarlo al action
    }


    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Tu nombre" onChange={onchange} value={credentials.name}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Tu email" onChange={onchange} value={credentials.email}></input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Tu password" onChange={onchange} value={credentials.password}></input>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="passwordConfirm">Confirmar password</label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmar password" onChange={onchange} value={credentials.passwordConfirm}></input>
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"></input>
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">Iniciar Sesion</Link>
            </div>
        </div>
    )
}

export default Register
