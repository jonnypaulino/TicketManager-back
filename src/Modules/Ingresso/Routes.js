const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/ingresso').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        tipoIngressoNumber: Joi.number().required(),
        quantidade: Joi.number().required(),
        valorFinal: Joi.number().required(),
        userID: Joi.string().required(),
        eventoID: Joi.string().required(),
      }),
    }),
    UserAuth.verifyToken,
    Controller.createIngresso
)

module.exports = routes;
