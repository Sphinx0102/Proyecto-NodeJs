const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const { ProductsUtils } = require('./utils');


const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id)});
};

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
};

//update
const updateById = async (id, newValue) =>{
    const collection = await Database(COLLECTION);
    const filter = {_id: ObjectId(id)};
    const option = {upsert:false};
    const updateProduct = {
        $set:{
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateProduct, option);
    return await getById(id);
};
//delete
const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const query = {_id: ObjectId(id)};
    const product = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
        return product;
    } else {
        return 0;
    }
}


const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    updateById,
    deleteById
}