import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import ToDoList from "./Pages/to-do-list.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/todo",
    element: <ToDoList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <h1>Navigation</h1>
      <RouterProvider router={router} />
      <hr />
    </>
  );
}

export default App;
