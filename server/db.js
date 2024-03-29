const { Sequelize } = require('sequelize')


module.exports = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,  
        {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            underscored: true, 
            timestamps: false, 
        }
    }
)

//  underscored: true,  использовать snake_case вместо camelCase для полей таблиц БД
// timestamps: false,  не добавлять поля created_at и updated_at при создании таблиц