const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

class User extends Model {}
User.init(
    {
        username: DataTypes.STRING,
        birthday: DataTypes.DATE
    },
    { sequelize, modelName: 'user' }
);

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        sequelize
            .sync()
            .then(() => User.findAll())
            .then(allUsers => {
                res.json(allUsers);
            });
        break;
    case 'POST':
        sequelize
            .sync()
            .then(() =>
                User.create({
                    username: req.body.username || 'Albert Einstein',
                    birthday: new Date()
                })
            )
            .then(newUser => {
                res.json(newUser.toJSON());
            });
        break;
    default:
        res.status(405).end(); //Method Not Allowed
        break;
    }
};
