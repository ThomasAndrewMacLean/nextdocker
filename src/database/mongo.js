const connectionstring = process.env.MONGO_CONNECTION_STRING;
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
