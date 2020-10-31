import React, { useContext } from 'react'
import ProjectContext from '../../context/projects/proyectos/ProjectContext'
import TaskContext from '../../context/projects/tareas/TaskContext'

const Project = ({ project }) => {

    const projectContext = useContext(ProjectContext)
    const taskContext = useContext(TaskContext)
    const { selectProject } = projectContext
    const { getProjectTasks } = taskContext

    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={() => {
                selectProject(project)
                getProjectTasks(project.id)
            }}>{project.name}</button>
        </li>
    )
}

export default Project
