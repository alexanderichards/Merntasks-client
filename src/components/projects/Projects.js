import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import Barra from '../layout/Barra'
import SideBar from '../layout/SideBar'
import FormTask from '../tareas/FormTask'
import TaskList from '../tareas/TaskList'

const Projects = () => {

    const authContext = useContext(AuthContext)
    const {userAuthenticated} = authContext

    useEffect(() => {
        userAuthenticated()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">
            <SideBar></SideBar>
            <div className="seccion-principal">
                <Barra></Barra>
                <main>
                    <FormTask></FormTask>
                    <div className="contenedor-tareas">
                        <TaskList></TaskList>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Projects
