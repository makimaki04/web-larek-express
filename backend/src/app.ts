import express from "express";
import cors from "cors"
import "dotenv/config"
import routes from './routes/routes'
import mongoose from "mongoose";
import path from 'path'
import { errors } from "celebrate";
import { requestLogger, errorLogger } from "./middleware/logger";
import errorsHandler from "./middleware/errorsHandler";

mongoose.connect(`${process.env.DB_ADDRESS}`);

const app = express();
app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler)

app.listen(3000, () => {
  console.log('Listening port 3000')
})