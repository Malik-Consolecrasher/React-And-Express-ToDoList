import React, { use, useState } from "react";
import Navigator from "../routes/Navigation";
import { useNavigate } from "react-router-dom";

//Built whole task system from scratch just so i can iron out all the bugs (everything)
//Originally borrowed code from "Brocode", but now completely redone by yours truly

//How it works, a task is collected from the user, sent to the back end
//What then should happen, is that the backend stores the new task and sends back all existing tasks to then render

function ToDoList() {
  const navigate = useNavigate();
  let loginToken = sessionStorage.getItem("JWToken");
  let userID = sessionStorage.getItem("User");

  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskToEdit, setTaskToEdit] = useState("");
  const [editResult, setEditResult] = useState("");

  const [newError, setNewError] = useState("No Errors");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleEditTask(event) {
    setTaskToEdit(event.target.value);
  }

  function handleEditResult(event) {
    setEditResult(event.target.value);
  }

  //Function to add a new task then update the existing task list to display tasks

  async function addTask() {
    let taskToAdd = newTask;

    fetch("http://localhost:8000/AddTask", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + loginToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskToAdd, user: userID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.tasks !== undefined) {
          setTaskList(data.tasks);
        } else {
          setNewError(data.message);
        }
      })

      .catch((error) => {
        console.error("Could not add Task" + "\n", error);
      });
  }

  async function getTasks() {
    fetch("http://localhost:8000/GetTask?UserID=" + userID, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + loginToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.tasks !== undefined) {
          setTaskList(data.tasks);
        } else {
          setNewError(data.message);
        }
      })

      .catch((error) => {
        setNewError(error);
        console.error("Could not get Tasks" + "\n", error);
      });
  }

  async function deleteTask(e) {
    let taskToDelete = e;

    fetch("http://localhost:8000/DeleteTask", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + loginToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskToDelete, userID: userID }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.tasks !== undefined) {
          setTaskList(data.tasks);
        } else {
          setNewError(data.message);
        }
      })

      .catch((error) => {
        setNewError(error);
        console.error("Could not Delete Task" + "\n", error);
      });
  }

  async function editTask() {
    let oldTask = taskToEdit;
    let newTask = editResult;

    fetch("http://localhost:8000/EditTask", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + loginToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldTask: oldTask,
        newTask: newTask,
        user: userID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.tasks !== undefined) {
          setTaskList(data.tasks);
        } else {
          setNewError(data.message);
        }
      })

      .catch((error) => {
        console.error("Could not add Task" + "\n", error);
      });
  }

  return (
    <>
      <Navigator />

      <h1>To-Do-List</h1>
      <h3>Errors: {newError}</h3>

      <label>Enter a task to add: </label>
      <input type="text" value={newTask} onChange={handleInputChange} />

      <button className="add-button" onClick={addTask}>
        Add Task
      </button>

      <br />
      <button className="get-button" onClick={getTasks}>
        Get Tasks
      </button>

      <h2>Task List</h2>

      <ol>
        {taskList.map((item) => (
          <li key={item} >
            {item}
            <button style={{margin: 10}} onClick={() => deleteTask(item)}>Delete Task</button>
          </li>
        ))}
      </ol>

      <h3>Edit Tasks</h3>
      <label>Enter a task to Change: </label>
      <input type="text" value={taskToEdit} onChange={handleEditTask} />
      <br />
      <label>Enter what you would like to change it to: </label>
      <input type="text" value={editResult} onChange={handleEditResult} />
      <br />
      <button className="get-button" onClick={editTask}>
        Edit Task
      </button>
    </>
  );
}
export default ToDoList;
