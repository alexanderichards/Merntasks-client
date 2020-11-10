import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'

const Barra = () => {

    const authContext = useContext(AuthContext)
    const {userAuthenticated, user, logout} = authContext

    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            { user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}
            
            <nav className='nav-principal'>
                <button className="btn btn-blank cerrar-sesion" onClick={() => logout()}>Logout</button>
            </nav>
        </header>
    )
}

export default Barra
