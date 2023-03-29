class LimitPages{
 async limitPage(limit, page){ 
     page = page || 1 // если страница не указана то отображать первую
     limit = limit || 2 //если лимит не указан то отображать будим по 9 стр. на каждой странице
     let offset = page * limit - limit 
     console.log('limit, page')
     console.log(limit, page)
     return{
      limit,
      offset
     }
 }
  
}

module.exports = new LimitPages()
