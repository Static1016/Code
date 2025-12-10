import express from "express"

const app = express(); // Create an express app

app.use(express.json());

// Routes import
import userRouter from './routes/user.route.js'


// routes declaration
app.use("/api/v1/users", userRouter);

//example route: http

export default app;