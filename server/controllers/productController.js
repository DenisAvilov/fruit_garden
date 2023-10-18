const uuid = require('uuid') // Генератор случайніх АЙДИШНИКОВ які не будуть повторюватись
const path = require('path')

const {Product, ProductProp} = require('../models/models')
const productService = require('../service/product-service')
const ApiError = require('../error/ApiError')

class ProductController{
  async createProduct(req,res, next){
    try{ 
       let {name, price, brandId, categoryId, smackId, value}  = req.body // Получаем из ранее созданих БрендАЙДИ и КАТЕРОГИАЙДИ
       const {img} = req.files        
        console.log('smackId>', name, price, brandId, categoryId, smackId, value)
       
        const product = await productService.create(name, price, brandId, categoryId, smackId, value, img)   
      
       return res.json(product) 
    }
    catch(e){
        next(ApiError.badRequest(e.message + ' Create Product'))
    }
  } 
   
  async  getALLProduct(req, res, next){
   try{     
     let {brand_id, category_id, smack_id, limit, page} = req.query    
      const product = await productService.getall(brand_id, category_id, smack_id, limit, page)
      return res.json(product)
   }
   catch(e){
    return next( ApiError.badRequest(e.message + ' Продуктов не найдено', e))
   }
    } 

  async getOne(req, res, next){
    try{
      const {id} = req.params      
      const product = productService.getProduct(id)  
     return res.json(product)  
    }
    catch(e){
      return next(ApiError.badRequest("Не получили товар по АЙДИ"))
    }
      
    
  } 
  // 52 мін
  // https://tokmakov.msk.ru/blog/item/667
  async update(req, res, next){
      try {
         const id = req.params.id
         const {body} = req
            if (!id) {
                throw new Error('Не указан id товара')
            } 
          const img = req.files             
          const product = await productService.update(id, body, img)
          if(!product){
            return next(ApiError.badRequest('Товара с таким индинтификатором нет'))
          }          
          return  res.json(product)
        }
      catch(e) {
          return  next(ApiError.badRequest(e.message))
        }
         
    }
  async deleteProduct(req, res, next){
     try{ 
        if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await productService.delete(req.params.id)
           return res.json(product)
    }
    catch(e){
        next(ApiError.badRequest(e.message))
    }
  }
}
// установить пакет express-fileupload
module.exports = new ProductController()