const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/ingresso').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        clienteTelefone: Joi.string().required(),
        tipoIngressoID: Joi.string().required(),
        eventoID: Joi.string().required(),
      }),
    }),
    Controller.createIngresso
  )

routes.route('/updateingresso').put(
celebrate({
    [Segments.BODY]: Joi.object().keys({
        ingressoID: Joi.string().required(),
        status: Joi.string().required(),
    }),
}),
Controller.updateStatus
)

module.exports = routes;
