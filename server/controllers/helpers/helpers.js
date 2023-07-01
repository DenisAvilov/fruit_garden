class LimitPages{
 async limitPage(limit, page){ 
     page = page || 1 // если страница не указана то отображать первую
     limit = limit || 2 //если лимит не указан то отображать будим по 9 стр. на каждой странице
      let offset1 = page * limit - limit 
    //Вариант от GPTChat
     let offset = (page - 1) * limit;
  console.log('offset1', offset1, 'offset', offset)
     return{
      limit,
      offset
     }
 }
  
}

module.exports = new LimitPages()
