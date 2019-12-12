const { Sequelize, Model, DataTypes } = require('sequelize');

const databaseOptions =
    process.env.NODE_ENV === 'production'
        ? {
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
        : {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: false
        };

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

export const getAllUsers = () => {
    return sequelize.sync().then(() => User.findAll());
};

export const addUser = user => {
    return sequelize.sync().then(() =>
        User.create({
            username: user.name || 'Albert Einstein',
            birthday: new Date()
        })
    );
};
