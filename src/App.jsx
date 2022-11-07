import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Container } from "react-bootstrap";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <>
      <Container className="my-5 mainPage">
        <section className="text-light">
          <h1 className="display-4 text-center">Lista de tareas</h1>
          <hr />
          <TaskForm/>
        </section>
      </Container>
      <footer className="bg-dark text-light text-center py-4">
        &copy; Todos los derechos reservados
      </footer>
    </>
  );
}

export default App;
