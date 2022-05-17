const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/tipoingresso').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        valorBase: Joi.number().required(),
      }),
    }),
    Controller.createTipoIngresso
)

module.exports = routes;
