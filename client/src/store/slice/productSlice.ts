// нашa логикa авторизации.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index'
import Auth from '../../pages/api/user/signin'

type Info = {
	description: string;
	title: string
	discretion: string
	number: number
}

export type Product = {
  id: number,
  name: string,
	img: FileList | undefined,
  description: string,
  category: string,
  price: number,
  smak: string,
  rating?: number,
  info: Info[],
	// quantity: number
	
};
export type Category = {
  id: number 
  name: string 
};
export type Smak ={
	id: number
	name: string
 }
type SelectCategoryResponse = {
	selected: number
}

  type ProductResponse = {
  product: Array<Product>
  // category: Array<Category>
	// smak: Array<Smak>
}

export type PropsTypes = {
  product: Array<Product>
  category: Array<Category>
	smak: Smak[]
  loading: boolean;
  error: string | null;
  idCategory: number 
};

const initialState: PropsTypes = {
  product: [
	{
		id: 1,
		img: undefined,
		name: 'Класичний зефір',
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		category: '',
      price: 220,
    smak: 'Полуниці',
		info: 	[]
	},
	{
		id: 2,
		img: undefined,
		name: 'Сливовий зефір',
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		category: '',
      price: 120,
    smak: 'Слива',
		info: []		
	},
	{
		id: 3,
		img: undefined,
		name: 'Зефір по Харьковськи',
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		category: '',
      price: 130,
    smak: 'Лимон',
		info: []		
	},
  ], 
  category: [
    {id: 1, name: 'Зефір'},
    {id: 2, name: 'Пастела'},
    {id: 3, name: 'Снеки'},
  ],
	smak: [
		{id: 1, name: 'Абрикос'},
		{id: 2, name: 'Лемон'},
		{id: 3, name: 'Какао'},
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
export const selectProduct = (state: RootState) => state.product.product;
export const selectCategory = (state: RootState) => state.product.category;
export const selectSmak = (state: RootState) => state.product.smak;
export const  sliceIdCategory = (state: RootState) => state.product.idCategory;
export const selectLoading = (state: RootState) => state.product.loading;

// export const selectLoading = (state: RootState) => state.auth.loading;
// export const selectStatus = (state: RootState) => state.auth.status;


