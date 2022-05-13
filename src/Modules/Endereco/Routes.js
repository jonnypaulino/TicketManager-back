const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/endereco').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        cep: Joi.number().required(),
        rua: Joi.string().required(),
        bairro: Joi.string().required(),
        estado: Joi.string().required(),
        pais: Joi.string().required(),
        numero: Joi.number().required(),
        complemento: Joi.string().required(),
      }),
    }),
    Controller.createEndereco
  )

module.exports = routes;
