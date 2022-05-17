const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/assento').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        descricao: Joi.string().required(),
        salaID: Joi.string().required(),
        salaLocalID: Joi.string().required(),
        tipoIngressoID: Joi.string().required(),
      }),
    }),
    Controller.createAssento
  )

routes.route('/updateassento').put(
celebrate({
    [Segments.BODY]: Joi.object().keys({
        assentoID: Joi.string().required(),
    }),
}),
Controller.updateStatus
)

module.exports = routes;
