import { getAllUsers, addUser, deleteUser } from '../../database/mongo';

// Also works with postgreSQL
// import { getAllUsers, addUser } from '../../database/postgres';

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        try {
            const allUsers = await getAllUsers();
            return res.json(allUsers);
        } catch (error) {
            res.json(error);
        }
        break;
    case 'POST':
        try {
            const addedUser = await addUser(req.body.user);
            res.json(addedUser);
        } catch (error) {
            res.json(error);
        }
        break;
    case 'DELETE':
        try {
            const addedUser = await deleteUser(req.body._id);
            res.json(addedUser);
        } catch (error) {
            res.json(error);
        }
        break;
    default:
        res.status(405).end(); //Method Not Allowed
        break;
    }
};
