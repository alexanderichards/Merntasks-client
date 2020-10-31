import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../../types'

const TaskReducer = (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return{
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId === action.payload)
            }
        case AGREGAR_TAREA: 
            return{
                ...state,
                // projectTasks: [...state.projectTasks, action.payload],
                tasks: [action.payload, ...state.tasks],
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
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case ESTADO_TAREA: 
            return{
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, completed: !task.completed} : task),
            }
        case TAREA_ACTUAL:
            return{
                ...state,
                currentTask: action.payload
            }
        case ACTUALIZAR_TAREA:
            return{
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, name: action.payload.name} : task)
            }
        default: {
            return state
        }
    }
}

export default TaskReducer