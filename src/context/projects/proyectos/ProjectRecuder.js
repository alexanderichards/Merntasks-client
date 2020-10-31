import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, VALIDAR_FORMULARIO } from '../../../types'

const ProjectReducer = (state, action) => {
    switch(action.type){
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS: 
            return{ 
                ...state,
                projects: action.payload
            }
        case AGREGAR_PROYECTO:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                formulario: false,
                errorFormulario: false,
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                currentProject: state.projects.filter(project => project.id === action.payload.id)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload.id),
                currentProject: null
            }
        default: {
            return state;
        }
    }
}

export default ProjectReducer