const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');




const COLLECTION = 'sales';

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
    const updateSale = {
        $set:{
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateSale, option);
    return await getById(id);
};
//delete
const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const query = {_id: ObjectId(id)};
    const sale = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
        return sale;
    } else {
        return 0;
    }
}



module.exports.SalesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}