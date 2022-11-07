import React from "react";
import { ListGroup } from "react-bootstrap";
import Task from "./Task";

const TaskList = ({tareas, setTareas}) => {
  return (
    <ListGroup>
      {
        tareas.map((tareas)=> <Task key={tareas._id} tareas={tareas} setTareas={setTareas}></Task>)
      }
    </ListGroup>
  );
};

export default TaskList;
