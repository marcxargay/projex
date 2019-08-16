const express = require('express');

const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const { mongoConnect } = require('./util/database');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
// app.use(projectRoutes);
app.use(userRoutes);
app.use(projectRoutes);

mongoConnect(() => {
  app.listen(PORT)
})