require('dotenv').config() // process.env
const express = require('express')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const cors = require('cors') // Принимать запросі с браузера
const fileUpload = require('express-fileupload')//пакет для работи з файлами
const errorHandler  = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000
const router = require('./routes/index')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)
const start = async () => {
    try {      
        //  await sequelize.drop() 
         await sequelize.authenticate()     
         await sequelize.sync({ alter: true }) 
        //  await sequelize.sync() 
         //Сверяет состояние бд со схемой данних в модульс { force: true }
         //Синхронизирует существующюю таблицу { alter: true }
         
        app.listen(PORT, () => console.log(`starting app on port ${PORT}`))
    } catch (e) {
        console.log('error => ', e)
    } 
}
//https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/
//https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/
//https://rahuldkjain.github.io/gh-profile-readme-generator/
start()
// 20 мін
// 39 мін
// 46 мін
// 48 мін
// 53 min
// 103 min

//230 мин