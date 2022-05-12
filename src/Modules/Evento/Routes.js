const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes
  .route('/evento')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string(),
        date: Joi.date(),
        organizadorID: Joi.string().required(),
        categoriaID: Joi.string().required(),
      }),
    }),
    Controller.createEvento
  )

routes.route('/updateevento').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      date: Joi.date().required(),
      organizadorID: Joi.string().required(),
      eventoID: Joi.string().required(),
    }),
  }),
  Controller.updateEvento
)

module.exports = routes;
