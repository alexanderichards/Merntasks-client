import React, { useContext } from 'react'
import ProjectContext from '../../context/projects/proyectos/ProjectContext';
import TaskContext from '../../context/projects/tareas/TaskContext'

const Task = ({ task }) => {

    const projectContext = useContext(ProjectContext) 
    const { currentProject } = projectContext;

    const taskContext = useContext(TaskContext)
    const {deleteTask, getProjectTasks, changeTaskState, setCurrentTask} = taskContext

    const changeState = (task => {
        changeTaskState(task)
        getProjectTasks(currentProject[0].id)
    })

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.completed
                    ?   (<button type="button" className="completo" onClick={() => changeState(task)}>Completo</button>)
                    :   (<button type="button" className="incompleto" onClick={() => changeState(task)}>Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => setCurrentTask(task)}>Editar</button>
                <button type="button" className="btn btn-primario" onClick={() => {
                    deleteTask(task.id)
                    getProjectTasks(currentProject[0].id)
                }}>Eliminar</button>
            </div>
        </li>
    )
}

export default Task
