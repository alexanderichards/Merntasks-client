import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../context/projects/proyectos/ProjectContext'
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ProjectsList = () => {

    const projectContext = useContext(ProjectContext);
    const {projects, obtenerProyectos} = projectContext;

    useEffect(() => {
        obtenerProyectos()
        // eslint-disable-next-line
    }, [])

    if(projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map(project => 
                    <CSSTransition key={project.id} timeout={200} classNames="proyecto"> 
                        <Project project={project}></Project>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </ul>

    )
}

export default ProjectsList
