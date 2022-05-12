const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes.route('/categoria').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        adminID: Joi.string().required(),
      }),
    }),
    Controller.createCategoria
)

routes.route('/updatecategoria').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      adminID: Joi.string().required(),
      categoriaID: Joi.string().required(),
    }),
  }),
  Controller.updateCategoria
)

routes.route('/deletecategoria').delete(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      adminID: Joi.string().required(),
      categoriaID: Joi.string().required(),
    }),
  }),
  Controller.deleteCategoria
)

module.exports = routes;
