const {Product, ProductInfo, ProductSmack, ProductBrand, Smack, Brand, Category} = require('../models/models')
const uuid = require('uuid') // Генератор случайніх АЙДИШНИКОВ які не будуть повторюватись
const path = require('path')
const limitPage = require('../controllers/helpers/helpers')
const ApiError = require('../error/ApiError')
class ProductService{
  
async create(name, price, brandId, categoryId, smackId , value, img){
  let fileName = uuid.v4() + ".jpeg"     

      // генерируем айдишник и какатенируем с разширением
       const product = await Product.create({name, price, brandId, categoryId,  img: fileName}) 
      
       img.mv(path.resolve(__dirname, '..', 'static',  fileName))// переместили созданый файл в папку с файлом    
      
      if (brandId){
        await product.addBrand(brandId)
      } 

          // Перевірка наявності ідентифікаторів у вигляді рядка
      if (typeof smackId === 'string') {
        smackId = smackId.split(',').map(id => parseInt(id, 10));
      }
      
      console.log('Должен быть масив smackId', smackId);
      
      // Зв'язуємо Smack з Product
      if (Array.isArray(smackId) && smackId.length > 0) {
        await product.addSmack(smackId);
      }

       if(value){
        value = JSON.parse(value)       
        // Данни приходят в виде строки поєтому єтот масив парсим
        // на фронте в строке а на беки в масив об'єкти  
        console.log('value',value)         
            value.forEach(prop => {
                 ProductInfo.create({
                    title: prop.title,
                    value: prop.description,
                    productId: product.id                    
                })
            });             
        }
        return product
}

async getall(brand_id, category_id, smack_id, limits, page) {  
    const brandIds = brand_id ? brand_id.split(',') : [];
    const categoryIds = category_id ? category_id.split(',') : [];
    const smackIds = smack_id ? smack_id.split(',') : [];
  let { limit, offset } = await limitPage.limitPage(limits, page);  

  let includeOptions = []; 
  
  if (brandIds.length > 0) {
    includeOptions.push({
      model: Brand,
      where: { id: brandIds },
      through: { attributes: [] },
    });
    }

   if (categoryIds.length > 0) {
    includeOptions.push({
      model: Category,
      where: { id: categoryIds },     
    });
    }

    if (smackIds.length > 0) {
    includeOptions.push({
      model: Smack,
      where: { id: smackIds },
      through: { attributes: [] },
    });
    }

    const queryOptions = includeOptions.length === 0 ? { limit, offset, include:  [Brand, Category, Smack]} : { limit, offset, include: includeOptions };

    const products = await Product.findAndCountAll(queryOptions);

    return products;
}


async getProduct(id){
  const product = await Product.findOne(
      {
        where:{id},
        include: [{model: ProductInfo, as: 'value'}]
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
            
          }
          else{ 
            const pathImg = product.img            
            fileName = uuid.v4() + ".jpeg" 
            img.img.mv(path.resolve(__dirname, '..', 'static',  fileName))
            let fs = require('fs');
            fs.unlink(path.resolve(__dirname, '..','static',pathImg) , err => {
            if(err) throw err;
            
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