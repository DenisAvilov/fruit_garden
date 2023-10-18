// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index'
import { Category, CategoryAndSubCategories, SubCategory } from '@/pages/api/category/category.interface';


type Categories = {
    categories: Category[]
    subCategories: SubCategory[]
		categoryAndSubCategories: CategoryAndSubCategories[]
}



const initialState: Categories = { 
  categories: [{
    id: 0,
    name: ''
  }],
  subCategories: [{
    id: 0,
    name: '',
    categoryId: 0
  }],
  categoryAndSubCategories: [{
    id: 0,
    name: '',
    subcategories: [{
      id: 0,
      name: '',
      categoryId: 0
    }]
  }]
};

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    subCategories:(state, action: PayloadAction<CategoryAndSubCategories[]>) => {
      state.categoryAndSubCategories = action.payload;
    },
    // productSuccess: (state, action: PayloadAction<Product>) => {
    //   console.log('action', action.payload)
    //   const newProduct = action.payload;
    //   state.product =  [...state.product,  newProduct ]    
    // },
    // categorySuccess: (state, action: PayloadAction<Category>) => {
      
    //   const newCategory = action.payload;
    //   state.category = [...state.category, newCategory];       
      
    //   state.error = null;
    // },
    // categoryUpdate: (state, action: PayloadAction<Category>) => {
    //    const updatedCategory = action.payload;
    // const categoryIndex = state.category.findIndex((category) => category.id === updatedCategory.id);
    // if (categoryIndex !== -1) {     
    //   state.category[categoryIndex] = updatedCategory;
    // }
    // },
    // categoryRemove: (state, action: PayloadAction<number>) => {
    // const categoryIndex = state.category.findIndex((category) => category.id === action.payload);
    // if (categoryIndex !== -1) {
    // state.category.splice(categoryIndex, 1);
    // }
    },
    
    //  idCategory: (state, action: PayloadAction< {idCategory: number;}>) => {
    //   state.idCategory = action.payload.idCategory;
    // },
    //  smakSuccess: (state, action: PayloadAction<Smak>) => {
    //   const newSmak = action.payload;
    //   state.smak = [...state.smak, newSmak];
    // },
	// 	removeSmak: (state, action: PayloadAction<number>) => {
  // const smakIndex = state.smak.findIndex((smak) => smak.id === action.payload);
  // if (smakIndex !== -1) {
  //   state.smak.splice(smakIndex, 1);
  // }
  //   },
		// updateSmak: (state, action: PayloadAction<Smak>) => {
    // const updatedSmak = action.payload;
    // const smakIndex = state.smak.findIndex((smak) => smak.id === updatedSmak.id);
    // if (smakIndex !== -1) {
     
    //   state.smak[smakIndex] = updatedSmak;
    // }
    // },
    //  loadingEnd: (state) => {
    //   state.loading = false;
    // },
  },
// }
  );

export const { 
	 subCategories
	} = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const dbCategoryAndSubCategories  = (state: RootState) => state.productCategory.categoryAndSubCategories

// export const selectProduct = (state: RootState) => state.product.product;
// export const selectCategory = (state: RootState) => state.product.category;
// export const selectSmak = (state: RootState) => state.product.smak;
// export const  sliceIdCategory = (state: RootState) => state.product.idCategory;
// export const selectLoading = (state: RootState) => state.product.loading;

// export const selectLoading = (state: RootState) => state.auth.loading;
// export const selectStatus = (state: RootState) => state.auth.status;


