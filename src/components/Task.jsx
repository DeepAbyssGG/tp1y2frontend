import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { borrarTareaAPI, consultarAPI } from "./helpers/queries";


const Task = ({ tareas, setTareas  }) => {
  const borrarTarea = () => {
    Swal.fire({
      title: "¿Esta seguro de eliminar la tarea?",
      text: "No se puede revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarTareaAPI(tareas._id).then((respuesta) => {
          if (respuesta.status === 200) {
            consultarAPI().then((respuesta) => {
              setTareas(respuesta);
            });

            Swal.fire(
              "Tarea eliminada!",
              "La tarea fue correctamnete eliminada.",
              "success"
            );
          } else {
            Swal.fire(
              "Se produjo un error!",
              "Intente realizar esta operacion mas tarde.",
              "error"
            );
          }
        });
      }
    });
  };
  
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {tareas.nombreTarea}
      <i className="bi bi-x-circle-fill"></i>
      <Button variant="outline-danger" onClick={borrarTarea}>
        <XCircle />
      </Button>
    </ListGroup.Item>
  );
};

export default Task;
