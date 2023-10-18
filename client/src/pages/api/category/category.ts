import { $authHost, $host } from "./../index";
import { CategoryAndSubCategories } from "./category.interface";



class Category{
  async categoryAndSubcategory(){
    try {
      console.log('category.ts')
      const categories = await $host.get<CategoryAndSubCategories[]>('/category')   
       console.log('categories.ts')       
     return categories.data
    } catch (error: any) {
    
    
      return error;
     
    }
  }
}
const category = new Category(); 
export default category; 