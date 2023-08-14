import http from '../index'

class Basket {
  async addBasket (productId: number, userID: number ) {
        try{
           const basket = await http.post("/basket", {productId, userID}, { 
          
       
      });

    
        }
        catch(e: any){
           return e;
        }

  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Basket()