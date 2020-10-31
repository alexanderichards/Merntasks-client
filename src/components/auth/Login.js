import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

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

        // pasarlo al action
    }


    return (
        <div className="form-usuario">
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
