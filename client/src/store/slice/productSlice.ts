// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index'


type Info = {
	description: string;
	title: string
	discretion: string
	number: number
}

export type Product = {
		info: any;
		category: any;
		smak: any;
		description: unknown;
    brandId: number
    categoryId: number
    id: number
    img: string
    name: string
    price: string
    rating: number
}


// export type Product = {
//   id: number,
//   name: string,
// 	img: FileList | undefined,
//   description: string,
//   category: string,
//   price: number,
//   smak: string,
//   rating?: number,
//   info: Info[],
// };

export type Category = {
  id: number 
  name: string 
};
export type Smak = {
	id: number
	name: string
 }

type Brand = {
  id: number,
  name: string
} 


export type PropsTypes = {
  product: Product[]
  category: Array<Category>
	smak: Smak[]
  brand: Brand[]
  loading: boolean;
  error: string | null;
  idCategory: number 
};

const initialState: PropsTypes = {
  product: [
	{
		id: 1,
		img: '',
		name: 'Класичний зефір',
    categoryId: 2,
    category: 'test category',
    price: '',
    rating: 0,
    smak: '',
    brandId: 0,
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		info: 	[]
	},
  ], 
  category: [
    {id: 1, name: 'Зефір'}, 
  ],
  brand: [
    {id: 1, name: 'AVI-FAMILY'}
  ],
	smak: [
		{id: 1, name: 'Абрикос'},		
	],
  loading: false,
  error:  null,
  idCategory: 0,
  
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action: PayloadAction<Product>) => {
      console.log('action', action.payload)
      const newProduct = action.payload;
      state.product =  [...state.product,  newProduct ]    
    },
    categorySuccess: (state, action: PayloadAction<Category>) => {
      
      const newCategory = action.payload;
      state.category = [...state.category, newCategory];       
      
      state.error = null;
    },
    categoryUpdate: (state, action: PayloadAction<Category>) => {
       const updatedCategory = action.payload;
    const categoryIndex = state.category.findIndex((category) => category.id === updatedCategory.id);
    if (categoryIndex !== -1) {     
      state.category[categoryIndex] = updatedCategory;
    }
    },
    categoryRemove: (state, action: PayloadAction<number>) => {
    const categoryIndex = state.category.findIndex((category) => category.id === action.payload);
    if (categoryIndex !== -1) {
    state.category.splice(categoryIndex, 1);
    }
    },
    
     idCategory: (state, action: PayloadAction< {idCategory: number;}>) => {
      state.idCategory = action.payload.idCategory;
    },
     smakSuccess: (state, action: PayloadAction<Smak>) => {
      const newSmak = action.payload;
      state.smak = [...state.smak, newSmak];
    },
		removeSmak: (state, action: PayloadAction<number>) => {
  const smakIndex = state.smak.findIndex((smak) => smak.id === action.payload);
  if (smakIndex !== -1) {
    state.smak.splice(smakIndex, 1);
  }
    },
		updateSmak: (state, action: PayloadAction<Smak>) => {
    const updatedSmak = action.payload;
    const smakIndex = state.smak.findIndex((smak) => smak.id === updatedSmak.id);
    if (smakIndex !== -1) {
     
      state.smak[smakIndex] = updatedSmak;
    }
    },
     loadingEnd: (state) => {
      state.loading = false;
    },
  },
});

export const { 
	 loadingStart,
	 productSuccess,
	 categorySuccess, 
   categoryUpdate,
   categoryRemove,
	 smakSuccess,
	 removeSmak,
	 updateSmak,	 
	 idCategory,
   loadingEnd, 
	} = productSlice.actions;
export default productSlice.reducer;
// export const selectProduct = (state: RootState) => state.product.product;
// export const selectCategory = (state: RootState) => state.product.category;
// export const selectSmak = (state: RootState) => state.product.smak;
// export const  sliceIdCategory = (state: RootState) => state.product.idCategory;
// export const selectLoading = (state: RootState) => state.product.loading;

// export const selectLoading = (state: RootState) => state.auth.loading;
// export const selectStatus = (state: RootState) => state.auth.status;


