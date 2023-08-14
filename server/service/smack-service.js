const {Smack} = require('../models/models')
class SmackService{
  async create(name){
     console.log('name service>>>> ', name)
    const smack = await Smack.create(name)
    console.log('smack >> : ',smack)
    return smack
  }
  async get(){    
    const smacks = await Smack.findAll()
    console.log('smacks >> : ', smacks)
    return smacks
  }

  async getId(id){    
    const smack = await Smack.findOne({where: {id}})
    console.log('smack >> : ',smack)
    return smack
  }
  async getSmacksByIds(ids) {
    const smacks = await Smack.findAll({ where: { id: ids } });
    return smacks;
}
  async delete(id){    
    const smack = await Smack.destroy({where: {id}})
    console.log('smack >> : ',smack)
    return smack
  }
}

module.exports = new SmackService()