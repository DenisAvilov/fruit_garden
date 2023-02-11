const uuid = require('uuid') // Генератор случайніх АЙДИШНИКОВ які не будуть повторюватись
const path = require('path')
const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const { dirname } = require('path')
class ProductController{
  async createProduct(req,res, next){
    try{
       const {name, price, brandId, productTypeId, info}  = req.body // Получаем из ранее созданих БрендАЙДИ и ТайпАЙДИ
      //  console.log(req.body)
       const {img} = req.files
       let fileName = uuid.v4() + ".jpeg" // генерируем айдишник и какатенируем с разширением
       if(info){
        info = JSON.parse(info) // Данни приходят в виде строки поєтому єтот масив парсим
       // на фронте в строке а на беки в масив об'єкти
       //resolve адаптує вказаний путь к операціоной системі
       // __dirname - путь к текущей папке 
       img.mv(path.resolve(__dirname, '..', 'static',  fileName)) // переместили созданый файл в папку с файлом 
       const product = await Product.create({name, price, brandId, productTypeId, img: fileName}) 
        info.forEach(i => {
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productTypeId: product.id
          })
        });
       }
       
       return res.json(product)
    }
    catch(e){
        next(ApiError.badRequest(e.message))
    }
  }

  async  getALLProduct(req, res){
    // Получаем из строки запроса
     let {brandId, productTypeId, limit, page} = req.query
     page = page || 1 // если страница не указана то отображать первую
     limit = limit || 9 //если лимит не указан то отображать будим по 9 стр. на каждой странице
     let offset = page * limit - limit     
     let product;
     if(!brandId && !productTypeId){
      //findAndCountAll для пагинации
       product = await Product.findAndCountAll({limit, offset})
     } 
     if(brandId && !productTypeId){
       product = await Product.findAndCountAll({where:{brandId}, limit, offset})
     }  
     if(!brandId && productTypeId){
       product = await Product.findAndCountAll({where:{productTypeId}, limit, offset})
     } 
     if(brandId && productTypeId){
      product = await Product.findAndCountAll({where:{brandId,productTypeId}, limit, offset})
     } 
     return res.json(product)
    }

  async getOne(req, res){
    const {id} = req.params
    product = await Product.findOne(
      {
        where:id,
        include: [{model: ProductInfo, as: 'info'}]
      })
    res.json(product)
  }

}
// установить пакет express-fileupload
module.exports = new ProductController()