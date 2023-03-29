const ApiError = require('../error/ApiError')
const brandService = require('../service/brand-service')
class BrandController{
 async  createBrand(req,res,next){
    try{
        const {name} = req.body
        const brand = await brandService.create({name})
        return res.json(brand)
    }
    catch(e){
        return next(ApiError.badRequest("Бренд не добавлен"))
    }
  }
 async getAll(req, res, next){
    const brands = await brandService.getall()
    return res.json(brands)
  }
 async update(req, res, next) {
    try{
    const {id} = req.params
    const {name} = req.body
    const brand = await brandService.update(id, name) 
    return res.json(brand)
    }
    catch(e){
    return next(ApiError.badRequest("Бренд не поновленно"))
   }
  }
 async delete(req, res, next) {    
       try{
        const {id} = req.params
        if(!id){
            throw ApiError.badRequest('Нема номеру бренда')
        }
        const brand = await brandService.delete(id)
        return res.json(brand)
       }
       catch(e){
        return next(ApiError.badRequest('Невдалося видилити бренд', e))
       }
  }
}
module.exports = new BrandController()