import React, { Fragment, useState, useContext} from 'react'
import ProjectContext from '../../context/proyectos/ProjectContext';
// import TaskContext from '../../context/projects/tareas/TaskContext';

const NewProject = () => {
    
    //get the form state
    const projectContext = useContext(ProjectContext)
    const { formulario, mostrarFormulario, agregarProyecto, mostrarError, errorFormulario} = projectContext;
    // const taskContext = useContext(TaskContext)
    // const { getProjectTasks} = taskContext

    const [project, setProject] = useState({
        name: ""
    })

    const onchange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = async e => {
        e.preventDefault()
        if(project.name.trim() === ""){
            mostrarError()
            return;
        }
        agregarProyecto(project)
        // selectProject(project);
        setProject({
            name: ''
        });
    }

    // const getTasks = (e) => {
    //     e.preventDefault()
    //     getProjectTasks(currentProject[0].id)
    // }
 
    return (
        <Fragment>
            <button type="button" className="btn btn-block btn-primario" onClick={() => mostrarFormulario()}>Nuevo Proyecto</button>
            {formulario
                ?
                    (
                        <form className="formulario-nuevo-proyecto" onSubmit={(e) => {
                            onsubmit(e);
                            // getTasks(e);
                        }}>
                            <input type="text" className="input-text" placeholder="Nombre proyecto" name="name" onChange={onchange} value={project.name}></input>
                            <input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto"></input>
                        </form>
                    )
                : null
            }
            {errorFormulario 
                ? 
                    (
                        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                    )
                : null
            }
        </Fragment>
    )
}

export default NewProject
