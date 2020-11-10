import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from "react-router-dom";
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext)
    const { isAuth, userAuthenticated, loading} = authContext

    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line
    }, [])

    return (
        <Route {...props} render={props => !isAuth && !loading ? (
            <Redirect to="/"></Redirect>
        ) : (
                <Component {...props}></Component>
            )} />
    )
}

export default PrivateRoute
