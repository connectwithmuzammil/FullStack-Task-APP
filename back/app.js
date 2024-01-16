const express = require('express');
const app = express();
const task = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

const PORT = 3000 || process.env.PORT;

//Middleware
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("Task Manager API");
// })

app.use('/api/v1/tasks', task);
const start = async () => {
  console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);
  try {
    await connectDB('mongodb+srv://muzammil:muzammil123@freecodecampcluster.pr3ujdn.mongodb.net/Task-Manager?retryWrites=true&w=majority');
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
