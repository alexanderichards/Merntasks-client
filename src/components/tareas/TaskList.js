import React, { Fragment, useContext, useEffect} from 'react'
import ProjectContext from '../../context/proyectos/ProjectContext';
import TaskContext from '../../context/tareas/TaskContext';
import Task from './Task';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = () => {

    const projectContext = useContext(ProjectContext)
    const { currentProject, deleteProject} = projectContext;
    const taskContext = useContext(TaskContext)
    const { projectTasks, getProjectTasks} = taskContext

    useEffect(() => {
        if(currentProject === null) return
        getProjectTasks(currentProject[0]._id)
        // eslint-disable-next-line
    }, [currentProject])

    return (
        <Fragment>
            {currentProject != null
                ?
                (
                    <Fragment>
                        <h2>Project: {currentProject[0].name}</h2>
                        <ul className="listado-tareas">
                            {projectTasks.length === 0
                                ? (<li className="tarea">No hay tareas</li>)
                                : <TransitionGroup>
                                    {projectTasks.map(task =>
                                        <CSSTransition key={task._id} timeout={200} classNames="tarea">
                                            <Task task={task}></Task>
                                        </CSSTransition>)}
                                </TransitionGroup>
                            }
                        </ul>
                        <button type="button" className="btn btn-eliminar" onClick={() => deleteProject(currentProject[0])}>Eliminar Proyecto &times;</button>
                    </Fragment>
                )
                : <h2>Select or create a new project</h2>}
        </Fragment>
    )
}

export default TaskList
