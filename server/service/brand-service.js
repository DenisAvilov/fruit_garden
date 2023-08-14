const {Brand, ProductBrand, Product} = require('../models/models')
const limitPage = require('../controllers/helpers/helpers')
class BrandService{
  async create(name){
    console.log('name',name)
    const brand = await Brand.create({name})
    return brand
  }
  async getall(){
    const brands = await Brand.findAll()
    return brands
  }
  async getOneBrand(brand_id,limits, page){
    let { limit, offset } = await limitPage.limitPage(limits, page);

      let brand = await ProductBrand.findOne({
    where: { id: 1 },
    include: [
      {
        model: Product,
        attributes: ['product_id'], // атрибути, які ви хочете вибрати з продуктів
        limit,
        offset,
      },
    ],
  });
   return brand
//     let product;
//     product = await ProductBrand.findAndCountAll({ limit, offset,
//     include: [
//       {
//         model: ProductBrand, 
//         attributes: ['brandId'], 
//       }, 
//     ],
 
// })
//  return product
  }
  async update(id, name){
    const brand = await Brand.findByPk(id)
    const update =  brand.update({name})
    return update
  }
  async delete(id){
    const brand = await Brand.findByPk(id)
        if (!brand) {
            throw new Error('Бренд не найден в БД')
        }
        await brand.destroy()
    return brand
  }
}
module.exports = new BrandService()