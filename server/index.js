const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const { loadUsersToDB } = require('./services/usersService');

const authRouter = require('./controllers/authController');
const usersRouter = require('./controllers/usersController');
const departmentsRouter = require('./controllers/departmentsController');
const employeesRouter = require('./controllers/employeesController');
const shiftsRouter = require('./controllers/shiftsController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/departments', departmentsRouter);
app.use('/employees', employeesRouter);
app.use('/shifts', shiftsRouter);

//init users to DB
loadUsersToDB();

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
