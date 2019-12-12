require('dotenv').config();

const connectionstring = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-shard-00-00-rbgsu.gcp.mongodb.net:27017,cluster0-shard-00-01-rbgsu.gcp.mongodb.net:27017,cluster0-shard-00-02-rbgsu.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;
const monk = require('monk');
const db = monk(connectionstring);

const users = db.get('users');

export const getAllUsers = () => {
    return users.find({});
};

export const deleteUser = _id => {
    return users.remove({ _id: _id });
};

export const addUser = user => {
    return users.insert(user);
};
