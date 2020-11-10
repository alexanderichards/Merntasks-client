import React, { useState, useContext, useEffect } from 'react'
import ProjectContext from '../../context/proyectos/ProjectContext';
import TaskContext from '../../context/tareas/TaskContext';

const FormTask = () => {

    const projectContext = useContext(ProjectContext)
    const { currentProject } = projectContext;
    const taskContext = useContext(TaskContext)
    const {addTask, validateTask, taskError, getProjectTasks, currentTask, updateTask, setCurrentTask} = taskContext

    

    const [task, settask] = useState({
        name: "",
    })

    const onchange = e => {
        settask({
            ...task,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        if(currentTask === null) return
        settask(currentTask)
    }, [currentTask])

    const onsubmit = e => {
        e.preventDefault();
        if(task.name.trim() === ""){
            validateTask()
            return 
        }

        // revisar si es edicion o si es una nueva tarea

        if(currentTask === null){
            addTask({
                name: task.name,
                project: currentProject[0]._id
            })
        } else {
            updateTask(task)
        }

        getProjectTasks(currentProject[0].id)

        settask({
            name: "",
        })

        setCurrentTask(null)
    }

    const mostrarForm = () => {
        if (currentProject != null) {
            return (
                <div className="formulario">
                    <form onSubmit={onsubmit}>
                        <div className="contenedor-input">
                            <input type="text" className="input-text" placeholder="Nombre Tarea" name="name" onChange={onchange} value={task.name}></input>
                        </div>
                        <div className="contenedor-input">
                            <input type="submit" className="btn btn-primario btn-submit btn-block" value={currentTask === null ? "Registrar Tarea" : "Editar Tarea"}></input>
                        </div>
                    </form>
                    {taskError === true ? <p className="mensaje error">Ingresa un nombre en la tarea</p> : null}
                </div>
            )
        }
        return null
    }

    return (
        mostrarForm()        
    )
}

export default FormTask
