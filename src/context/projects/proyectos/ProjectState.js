import React, { useReducer } from 'react'
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectRecuder';
import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, VALIDAR_FORMULARIO } from '../../../types'
import { v4 as uuidv4 } from 'uuid';

const ProjectState = props => {

    const projects = [
        { id: 1, name: "Create desktop app" },
        { id: 2, name: "Create flutter app" }
    ]

    const initialState = {
        formulario: false,
        errorFormulario: false,
        projects: [],
        currentProject: null
    }
    // dispatch para ejectuar las acciones 
    const [state, dispatch] = useReducer(ProjectReducer, initialState)
    // serie de funciones para el crud de proyectos
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    //obtener los proyectos con dispatch 
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: projects   
        });
    }

    const agregarProyecto = (project) => {
        project.id = uuidv4();
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: project
        })
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const selectProject = (project) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: project
        })
    }

    const deleteProject = (project) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: project
        })
    }

    return (
        <ProjectContext.Provider value={{
            projects: state.projects,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            currentProject: state.currentProject,
            selectProject,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            deleteProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;