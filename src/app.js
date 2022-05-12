const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

/* IMPORTING ROUTES */
const userRoutes = require('./Modules/User/Routes');
const eventoRoutes = require('./Modules/Evento/Routes');
const categoriaRoutes = require('./Modules/Categoria/Routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errors());

/* ROUTES */
app.use(userRoutes);
app.use(eventoRoutes);
app.use(categoriaRoutes);

module.exports = app;