import React, {useReducer } from 'react'
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../types";
import axiosClient from '../../config/axios'

const TaskState = (props) => {

    const initialState = {
        tasks: [
            // { id:uuidv4(), name: "Create the base code", completed: true, projectId: 1},
            // { id:uuidv4(), name: "Upload to playstore", completed: false, projectId: 2},
            // { id:uuidv4(), name: "Upload to the appstore", completed: false, projectId: 1 }
        ],
        projectTasks: [],
        taskError: false,
        currentTask: null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    // acciones de dispatch 
    
    // Obtener las tareas de un proyecto
    const getProjectTasks = async (projectId) => {
        try {
            const response = await axiosClient.get(`/api/projects/${projectId}/tasks`)
            // console.log(response)

            dispatch({
                type: TAREAS_PROYECTO,
                payload: response.data
            })

        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async (task) => {
        // task.id = uuidv4()
        try {
            const response = await axiosClient.post('/api/tasks', task)
            console.log(response)
            dispatch({
                type: AGREGAR_TAREA,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validateTask = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const deleteTask = async (taskId, projectId) => {

        // console.log(projectId)
        try {
            await axiosClient.delete(`/api/tasks/${taskId}`, {params: {project: projectId}})

            dispatch({
                type: ELIMINAR_TAREA,
                payload: taskId
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const changeTaskState = (task) => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: task
    //     })
    // }

    const updateTask = async (task) => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: response.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }

    const setCurrentTask = (task) => {
        dispatch({
            type: TAREA_ACTUAL,
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
            // changeTaskState,
            setCurrentTask,
            updateTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;