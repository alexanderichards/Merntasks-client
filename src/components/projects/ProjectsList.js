import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../context/proyectos/ProjectContext'
import AlertContext from '../../context/alerts/AlertContext'
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {

    const projectContext = useContext(ProjectContext);
    const {projects, obtenerProyectos, message} = projectContext;

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    useEffect(() => {

        if(message){
            showAlert(message.msg, message.category)
        }

        obtenerProyectos()
        // eslint-disable-next-line
    }, [message])

    if(projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    

    return (
        <ul className="listado-proyectos">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div> ) : null}
            <TransitionGroup>
                {projects.map(project => 
                    <CSSTransition key={project._id} timeout={200} classNames="proyecto"> 
                        <Project project={project}></Project>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </ul>

    )
}

export default ProjectsList
