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
      numero: Joi.string().allow('').max(500),
      titular: Joi.string().allow('').max(500),
      cpf: Joi.string().allow('').max(500),
      data: Joi.date().allow('').max(500),
      boleto: Joi.string().allow('').max(500),
      qrCode: Joi.string().allow(null, '').max(500),
      copyPaste: Joi.string().allow(null, '').max(500),
      userID: Joi.string().required(),
      ingressoID: Joi.string().required(),
      parcelas: Joi.number().required(),
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
