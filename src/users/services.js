const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');




const COLLECTION = 'users';

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
    const updateUser = {
        $set:{
            ...newValue
        }
    };
    const result = await collection.updateOne(filter, updateUser, option);
    return await getById(id);
};
//delete
const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const query = {_id: ObjectId(id)};
    const user = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1) {
        return user;
    } else {
        return 0;
    }
}



module.exports.UsersService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}