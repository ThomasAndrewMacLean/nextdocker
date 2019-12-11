const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    'dbuser',
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        // e.g. host: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
        host: `/cloudsql/${process.env.DB_CONNECTION_NAME}`,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
            // same as host string above
            socketPath: `/cloudsql/${process.env.DB_CONNECTION_NAME}`
        },
        logging: false
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
