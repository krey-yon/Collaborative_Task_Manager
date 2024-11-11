import 'dotenv/config'
import express from 'express'
import connectToDatabase from "./connect.js";
import router from './routes/auth.js';
import todoRouter from './routes/todo.js';

const app = express()
const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI;

connectToDatabase(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

//middleware
app.use(express.json());




app.use('/user', router);
app.use('/todo', todoRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})