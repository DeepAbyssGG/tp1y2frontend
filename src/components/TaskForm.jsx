import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { consultarAPI, crearTareaAPI } from "./helpers/queries";
import TaskList from "./TaskList";
import Swal from "sweetalert2/dist/sweetalert2.all";

const TaskForm = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    consultarAPI().then((respuesta) => {
      setTareas(respuesta);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombreTarea: "",
    },
  });

  const onSubmit = (datos) => {
    crearTareaAPI(datos).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Tarea creada",
          "La tarea fue creada correctamente",
          "success"
        );
        reset();
        consultarAPI().then((respuesta) => {
          setTareas(respuesta);
        });
      } else {
        Swal.fire("Ocurrio un error", "Vuelva a intentarlo mas tarde", "error");
      }
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            {...register("nombreTarea", {
              required: "Este dato es obligatorio",
              minLength: {
                value: 2,
                message: "Debe ingresar como minimo 2 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe ingresar como maximo 50 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreTarea?.message}
          </Form.Text>
          <Button variant="primary" type="submit">
            <PlusCircle />
          </Button>
        </Form.Group>
      </Form>
      <TaskList tareas={tareas} setTareas={setTareas}></TaskList>
    </div>
  );
};

export default TaskForm;
