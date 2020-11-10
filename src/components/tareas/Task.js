import React, { useContext } from 'react'
import ProjectContext from '../../context/proyectos/ProjectContext';
import TaskContext from '../../context/tareas/TaskContext'

const Task = ({ task }) => {

    const projectContext = useContext(ProjectContext) 
    const { currentProject } = projectContext;

    const taskContext = useContext(TaskContext)
    const {deleteTask, getProjectTasks, updateTask, setCurrentTask} = taskContext

    const changeState = (task, value) => {

        // console.log(value)
        // if(task.status){
        //     task.status = false
        // } else {
        //     task.status = true
        // }

        task.status = !value

        // task = {
        //     ...task,
        //     status: !task.status 
        // }

        // console.log(task)


        updateTask(task)
        getProjectTasks(currentProject[0]._id)
    }

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status
                    ?   (<button type="button" className="completo" onClick={() => changeState(task, true)}>Completo</button>)
                    :   (<button type="button" className="incompleto" onClick={() => changeState(task, false)}>Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => setCurrentTask(task)}>Editar</button>
                <button type="button" className="btn btn-primario" onClick={() => {
                    deleteTask(task._id, currentProject[0]._id)
                    getProjectTasks(currentProject[0]._id)
                }}>Eliminar</button>
            </div>
        </li>
    )
}

export default Task
