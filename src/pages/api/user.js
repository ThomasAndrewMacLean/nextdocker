const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            socketPath: process.env.DB_SOCKETPATH
        }
    }
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
