const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let Users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de Usuarios', Users);
        } catch (error){
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params :{ id } } = req;
            let user = await UsersService.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound());
            } else{ 
                Response.success(res, 200, `User ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else{
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //update
    updateUser: async (req, res) => {
        try {
            const {params: {id}} = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                const userUpdate = await UsersService.updateById(id, body);
                if (!userUpdate) {
                    Response.error(res, new createError.NotFound());
                } else{ 
                    Response.success(res, 200, 'Usuario Modificado', userUpdate);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //delete
    deleteUser: async (req, res) =>{
        try {
            const {params: {id}} = req;
            const userDelete = await UsersService.deleteById(id);
            if (userDelete === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, 'Producto Eliminado', userDelete);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

  
};