const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/sala').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        capacidade: Joi.number().required(),
        localID: Joi.string().required(),
      }),
    }),
    Controller.createSala
  )

module.exports = routes;
