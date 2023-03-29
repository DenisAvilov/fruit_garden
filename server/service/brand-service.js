const {Brand} = require('../models/models')
class BrandService{
  async create(name){
    const brand = await Brand.create({name})
    return brand
  }
  async getall(){
    const brands = await Brand.findAll()
    return brands
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