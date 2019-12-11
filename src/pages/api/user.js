const { Sequelize, Model, DataTypes } = require('sequelize');

// TODO: also connect on local machine.
const databaseOptions =
    process.env.NODE_ENV === 'production'
        ? {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false
        }
        : {};

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    databaseOptions
);

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
        try {
            sequelize
                .sync()
                .then(() => User.findAll())
                .then(allUsers => {
                    res.json(allUsers);
                });
        } catch (error) {
            res.json(error);
        }
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
