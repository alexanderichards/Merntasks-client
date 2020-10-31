import React from 'react'
import ProjectsList from '../projects/ProjectsList'
import NewProject from '../projects/NewProject'

const SideBar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject></NewProject>
            <div className="proyectos">
                <h2>Tus proyectos</h2>
            </div>
            <ProjectsList></ProjectsList>
        </aside>
    )
}

export default SideBar
