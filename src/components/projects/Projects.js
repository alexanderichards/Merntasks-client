import React from 'react'
import Barra from '../layout/Barra'
import SideBar from '../layout/SideBar'
import FormTask from '../tareas/FormTask'
import TaskList from '../tareas/TaskList'

const Projects = () => {
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
