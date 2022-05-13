const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/local').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        enderecoID: Joi.string().required(),
      }),
    }),
    Controller.createLocal
  )

module.exports = routes;
