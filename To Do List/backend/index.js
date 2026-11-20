const express = require('express');
const app = express();
const cors = require('cors')


const registerRoute = require('./Routes/registerRoute.js')
const loginRoute = require('./Routes/loginRoute.js')
const addTaskRoute = require('./Routes/addTaskRoute.js')
const getTaskRoute = require('./Routes/getTaskRoute.js')
const deleteTaskRoute = require('./Routes/deleteTaskRoute.js')
const editTaskRoute = require("./Routes/editTaskRoute.js")


app.use(cors())
app.use(express.json())



registerRoute(app);
loginRoute(app);
addTaskRoute(app);
getTaskRoute(app);
deleteTaskRoute(app);
editTaskRoute(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});
