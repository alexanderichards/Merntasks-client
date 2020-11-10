import React, { useReducer } from 'react'
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectRecuder';
import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, PROYECTO_ERROR, VALIDAR_FORMULARIO } from '../../types'
import axiosClient from '../../config/axios'

const ProjectState = props => {

    // const projects = [
    //     { id: 1, name: "Create desktop app" },
    //     { id: 2, name: "Create flutter app" }
    // ]

    const initialState = {
        formulario: false,
        errorFormulario: false,
        projects: [],
        currentProject: null,
        message: null
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
    const obtenerProyectos = async () => {

        try {
            const response = await axiosClient.get('/api/projects')
            // console.log(response.data.projects)

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: response.data.projects 
            });
        } catch (error) {
            console.log(error)

            const alerta = {
                msg: 'Something went wrong',
                category: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    const agregarProyecto = async (project) => {
        // project.id = uuidv4();
        try {
            const response = await axiosClient.post('/api/projects', project)
            // console.log(response)

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: response.data
            })

        } catch (error) {
            console.log(error)

            const alerta = {
                msg: 'Something went wrong',
                category: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }


    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const selectProject = (project) => {

        // console.log(project)
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: project
        })
    }

    const deleteProject = async (project) => {

        try {
            await axiosClient.delete(`/api/projects/${project._id}`)
            // console.log(response.data)

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: project
            })
        } catch (error) {
            console.log(error)

            const alerta = {
                msg: 'Something went wrong',
                category: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

        
    }

    return (
        <ProjectContext.Provider value={{
            projects: state.projects,
            formulario: state.formulario,
            errorFormulario: state.errorFormulario,
            currentProject: state.currentProject,
            message: state.message,
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