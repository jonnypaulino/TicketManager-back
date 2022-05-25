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
        localNumber: Joi.number().required(),
        localComplement: Joi.string().required(),
        cep: Joi.string().required(),
        rua: Joi.string().required(),
        bairro: Joi.string().required(),
        estado: Joi.string().required(),
        pais: Joi.string().required(),
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
  Controller.updateEvento
)

module.exports = routes;
