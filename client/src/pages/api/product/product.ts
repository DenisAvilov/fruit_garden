import { $authHost, $host } from "./../index";

interface Product {
    brandId: number
    categoryId: number
    id: number
    img: string
    name: string
    price: string
    rating: number
}

class ProductApi{
   
  async productGetAll() {
    try {
      const product = await $host.get<Product>("/product");
      
     console.log('product client', product.data)
     return product
    } catch (error: any) {
    
    
      return error;
     
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductApi()