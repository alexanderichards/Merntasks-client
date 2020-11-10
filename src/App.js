import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Projects from "./components/projects/Projects";
import PrivateRoute from "./components/routes/PrivateRoute";
import tokenAuth from "./config/token";
import AlertState from "./context/alerts/AlertState";
import AuthState from "./context/auth/AuthState";
import ProjectState from "./context/proyectos/ProjectState";
import TaskState from "./context/tareas/TaskState";


// revisar si tenemos un token 
const token = localStorage.getItem('token')

if(token) {
  tokenAuth(token)
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
