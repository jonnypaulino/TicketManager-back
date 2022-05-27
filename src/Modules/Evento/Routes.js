const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes
  .route('/evento')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        time1: Joi.string().required(),
        time2: Joi.string().required(),
        data: Joi.date().required(),
        descricao: Joi.string().allow(null, '').max(500),
        localName: Joi.string().required(),
        localNumber: Joi.number().allow(null, '').max(500),
        localComplement: Joi.string().allow(null, '').max(500),
        cep: Joi.string().allow('').max(500),
        rua: Joi.string().allow('').max(500),
        bairro: Joi.string().allow(null, '').max(500),
        estado: Joi.string().allow(null, '').max(500),
        pais: Joi.string().allow(null, '').max(500),
        capacidadeN: Joi.number().required(),
        valorN: Joi.number().required(),
        capacidadeS: Joi.number().required(),
        valorS: Joi.number().required(),
        capacidadeL: Joi.number().required(),
        valorL: Joi.number().required(),
        capacidadeO: Joi.number().required(),
        valorO: Joi.number().required(),
        capacidadeC: Joi.number().required(),
        valorC: Joi.number().required(),
        userID: Joi.string().required(),
      }),
    }),
    UserAuth.verifyToken,
    Controller.createEvento
  )

routes.route('/updateevento').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      data: Joi.date().required(),
      userID: Joi.string().required(),
      eventoID: Joi.string().required(),
    }),
  }),
  UserAuth.verifyToken,
  Controller.updateEvento
)

routes.route('/removeevento').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userID: Joi.string().required(),
      eventoID: Joi.string().required(),
    }),
  }),
  UserAuth.verifyToken,
  Controller.removeEvento
)

routes.route('/readeventos').get(Controller.readEventos);

routes.route('/readeventofromorganizador/:userID').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userID: Joi.string().required(),
    }),
  }),
  Controller.readEventosFromOrganizador
)

module.exports = routes;
