import React, {useReducer } from 'react'
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'
import { v4 as uuidv4 } from "uuid";
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../../types";

const TaskState = (props) => {

    const initialState = {
        tasks: [
            { id:uuidv4(), name: "Create the base code", completed: true, projectId: 1},
            { id:uuidv4(), name: "Upload to playstore", completed: false, projectId: 2},
            { id:uuidv4(), name: "Upload to the appstore", completed: false, projectId: 1 }
        ],
        projectTasks: [],
        taskError: false,
        currentTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    // acciones de dispatch 
    
    // Obtener las tareas de un proyecto
    const getProjectTasks = (projectId) => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: projectId
        })
    }

    const addTask = (task) => {
        task.id = uuidv4()
        dispatch({
            type: AGREGAR_TAREA,
            payload: task
        })
    }

    const validateTask = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const deleteTask = (taskId) => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: taskId
        })
    }

    const changeTaskState = (task) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: task
        })
    }

    const setCurrentTask = (task) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        })
    }

    const updateTask = (task) => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: task
        })
    }

    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            projectTasks: state.projectTasks,
            taskError: state.taskError,
            currentTask: state.currentTask,
            getProjectTasks,
            addTask,
            validateTask,
            deleteTask,
            changeTaskState,
            setCurrentTask,
            updateTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;