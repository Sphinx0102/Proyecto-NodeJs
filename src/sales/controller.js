const createError = require('http-errors');
const debug = require('debug')('app:module-sales-controller');

const { SalesService } = require('./services');
const { Response } = require('../common/response');

module.exports.SalesController = {
    getUsers: async (req, res) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(res, 200, 'Lista de Ventas', sales);
        } catch (error){
            debug(error);
            Response.error(res);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params :{ id } } = req;
            let sale = await SalesService.getById(id);
            if(!sale){
                Response.error(res, new createError.NotFound());
            } else{ 
                Response.success(res, 200, `Venta ${id}`, sale);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createSale: async (req, res) => {
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else{
                const insertedId = await SalesService.create(body);
                Response.success(res, 201, 'Venta realizada', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //update
    updateSale: async (req, res) => {
        try {
            const {params: {id}} = req;
            const {body} = req;
            if (!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                const saleUpdate = await SalesService.updateById(id, body);
                if (!saleUpdate) {
                    Response.error(res, new createError.NotFound());
                } else{ 
                    Response.success(res, 200, 'Venta Modificada', saleUpdate);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    //delete
    deleteSale: async (req, res) =>{
        try {
            const {params: {id}} = req;
            const saleDelete = await SalesService.deleteById(id);
            if (saleDelete === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, 'Venta Eliminada', saleDelete);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
};