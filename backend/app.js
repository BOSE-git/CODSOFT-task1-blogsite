import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import blogRouter from './routes/blog-routes.js';
const app = express();
import cors from 'cors';
import tempoRouter from './routes/temporaryData.js';
import commentsRouter from './routes/comments-routes.js';
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/temporaryData",tempoRouter);

mongoose.connect("mongodb+srv://blogger:blogger@cluster0.wfi0wjt.mongodb.net/Blog?retryWrites=true&w=majority").then(() => app.listen(port)).then(() => console.log(`Connected to Database, Listening on Port ${port}`)).catch((err) => console.log(err));
