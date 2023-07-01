const {Product, ProductProp} = require('../models/models')
const uuid = require('uuid') // Генератор случайніх АЙДИШНИКОВ які не будуть повторюватись
const path = require('path')
const limitPage = require('../controllers/helpers/helpers')
const ApiError = require('../error/ApiError')
class ProductService{
  
async create(name, price, brandId, categoryId, value, img){
  let fileName = uuid.v4() + ".jpeg"     
      // генерируем айдишник и какатенируем с разширением
       const product = await Product.create({name, price, brandId, categoryId, img: fileName}) 
       img.mv(path.resolve(__dirname, '..', 'static',  fileName))// переместили созданый файл в папку с файлом        
       if(value){
        value = JSON.parse(value)       
        // Данни приходят в виде строки поєтому єтот масив парсим
        // на фронте в строке а на беки в масив об'єкти           
            value.forEach(prop => {
                 ProductProp.create({
                    title: prop.title,
                    value: prop.description,
                    productId: product.id                    
                })
            });             
        }
        return product
}
async getall(brand_id, category_id, limits, page){  
    let {limit, offset} = await limitPage.limitPage(limits, page)   
     let product;
     if(!brand_id && !category_id){
      //findAndCountAll для пагинации
       product = await Product.findAndCountAll({limit, offset})
     } 
     if(brand_id && !category_id){
       product = await Product.findAndCountAll({where:{brand_id}, limit, offset})
     }  
     if(!brand_id && category_id){
       product = await Product.findAndCountAll({where:{category_id}, limit, offset})
     } 
     if(brand_id && category_id){
      product = await Product.findAndCountAll({where:{brand_id,category_id}, limit, offset})
     } 
  return product
}
async getProduct(id){
  const product = await Product.findOne(
      {
        where:{id},
        include: [{model: ProductProp, as: 'value'}]
      }) 
      return product
}
async update(id,body ,img){
  const product = await Product.findByPk(id)   
          let fileName = '' 
          const name = body.name ?? product.name
          const price = body.price ?? product.price
          const brandId = body.brandId ?? product.brandId
          const categoryId = body.categoryId ?? product.categoryId
   if(!img){
            fileName = product.img
            // console.log('Файл Остался Без Змін', fileName);
          }
          else{ 
            const pathImg = product.img            
            fileName = uuid.v4() + ".jpeg" 
            img.img.mv(path.resolve(__dirname, '..', 'static',  fileName))
            let fs = require('fs');
            fs.unlink(path.resolve(__dirname, '..','static',pathImg) , err => {
            if(err) throw err;
            // console.log('Файл успешно удалён', pathImg);
          });
            
          } 
     const prodUpdate = await product.update({name, price, categoryId, brandId, img: fileName})                 
      return prodUpdate
}
async delete(id){
  const product = await Product.findByPk(id)
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            let fs = require('fs');
            fs.unlink(path.resolve(__dirname, '..','static', product.img) , err => {
            if(err) throw err;
            // console.log('Файл успешно удалён');
          });
            await product.destroy()
            return product
}
}
module.exports = new ProductService()