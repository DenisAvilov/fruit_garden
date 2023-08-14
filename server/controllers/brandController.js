const ApiError = require('../error/ApiError')
const brandService = require('../service/brand-service')

class BrandController{
 async  createBrand(req,res,next){
    try{
        const {name} = req.body
        const brand = await brandService.create(name)
        return res.json(brand)
    }
    catch(e){
        return next(ApiError.badRequest("Бренд не добавлен", e))
    }
  }
 async getAll(req, res, next){
    const brands = await brandService.getall()
    return res.json(brands)
  }

async getOneBrand(req, res, next){
   try{
    let { brand_id ,limits, page} = req.query
    const product = await brandService.getOneBrand(brand_id ,limits, page)
    return res.json(product)
   }
   catch(e){
    return next(ApiError.badRequest("ВСПОМОГАТЕЛЬНАЯ ТАБЛИЦА", e))
   }
    
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