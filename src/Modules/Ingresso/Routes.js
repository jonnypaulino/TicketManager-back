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

routes.route('/ingressopagamento').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      tipoPagamentoNumber: Joi.number().required(),
      numero: Joi.string().required(),
      titular: Joi.string().required(),
      cpf: Joi.string().required(),
      data: Joi.date().required(),
      boleto: Joi.string().required(),
      qrCode: Joi.string().required(),
      copyPaste: Joi.string().required(),
      userID: Joi.string().required(),
      ingressoID: Joi.string().required(),
    }),
  }),
  UserAuth.verifyToken,
  Controller.finalizaPagamento
)

routes.route('/readoneingresso/:ingressoID').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      ingressoID: Joi.string().required(),
    }),
  }),
  Controller.readOneIngresso
)

routes.route('/readingressosfromuser/:userID').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userID: Joi.string().required(),
    }),
  }),
  Controller.readIngressosFromUser
)

module.exports = routes;
