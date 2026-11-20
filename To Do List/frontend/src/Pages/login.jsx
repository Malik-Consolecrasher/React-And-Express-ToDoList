import React, { useState } from "react";
import Navigator from "../routes/Navigation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [baseTask, setBaseTask] = useState("");

  function handleChangeUsername(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleChangeBaseTask(e) {
    e.preventDefault();
    setBaseTask(e.target.value);
  }

  function handleSubmit() {
    fetch("http://localhost:8000/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          sessionStorage.setItem("JWToken", data.token);
          sessionStorage.setItem("User", data.user.id);
        });
        if (response.ok) {
          navigate("/todo");
        }
      })

      .catch((error) => {
        console.error("Account couldn't be created \n\n", error);
      });
  }

  return (
    <>
      <Navigator />

      <h2>Please enter Login details for account</h2>
      <label>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={handleChangeUsername}
        ></input>{" "}
        <br />
      </label>
      <label>
        Password:{" "}
        <input
          type="text"
          value={password}
          onChange={handleChangePassword}
        ></input>{" "}
        <br />
      </label>
      <button onClick={handleSubmit}>Submit Account creation Request</button>
    </>
  );
};

export default Login;
