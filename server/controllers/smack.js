const ApiError = require('../error/ApiError')
const smackService = require('../service/smack-service')
class Smack{
  async create(req, res, next){
        try{
        const {name} = req.body
       
        const nuw_smack = await smackService.create({name})
        return res.json(nuw_smack)
    }
    catch(e){
        return next(ApiError.badRequest("Смак не добавлен", e))
    }
  }
  async get(req, res, next){
        try{            
        const smacks = await smackService.get()       
        return res.json(smacks)
    }
    catch(e){
        return next(ApiError.badRequest("Смаки не знайдени", e))
    }
  }
  async getId(req, res, next){
        try{
        const {id} = req.params       
        const smack = await smackService.getId(id)
        console.log('param', smack)
        return res.json(smack)
    }
    catch(e){
        return next(ApiError.badRequest("Смак не знайден", e))
    }
  }
  async getSmacksByIds(req, res, next) {
    try {
        const { ids } = req.query;
        if (!ids) {
            return next(ApiError.badRequest("Параметр 'ids' не найден."));
        }

        const idArray = ids.split(',').map(id => parseInt(id, 10));
        const smacks = await smackService.getSmacksByIds(idArray);
        console.log('smacks: ', smacks);
        return res.json(smacks);
    } catch (e) {
        return next(ApiError.badRequest("Смаки не найдены", e));
    }
  }
  async delete(req, res, next){
        try{
        const {id} = req.params       
        const smack = await smackService.delete(id)
        console.log('param', smack)
        return res.json(smack)
    }
    catch(e){
        return next(ApiError.badRequest("Смак не видален", e))
    }
  }

}

module.exports = new Smack()