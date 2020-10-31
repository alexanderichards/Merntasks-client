import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

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

        // password minimo de 6 caraceteres


        /// 2 password iguales

        // pasarlo al action
    }


    return (
        <div className="form-usuario">
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
