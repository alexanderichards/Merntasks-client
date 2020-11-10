import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../types'

const TaskReducer = (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                projectTasks: action.payload
            }
        case AGREGAR_TAREA: 
            return{
                ...state,
                // projectTasks: [...state.projectTasks, action.payload],
                projectTasks: [action.payload, ...state.projectTasks],
                taskError: false
            }
        case VALIDAR_TAREA:
            return{
                ...state, 
                taskError: true
            }
        case ELIMINAR_TAREA:
            return{
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        // case ESTADO_TAREA: 
        //     return{
        //         ...state,
        //         projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? {...task, completed: !task.completed} : task),
        //     }
        case TAREA_ACTUAL:
            return{
                ...state,
                currentTask: action.payload
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? {...task, name: action.payload.name, status: action.payload.status} : task)
            }
        default: {
            return state
        }
    }
}

export default TaskReducer