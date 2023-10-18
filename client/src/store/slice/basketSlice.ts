import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";

type Product = {
  id: number
  name: string
	img: ''
  description: string
  price: string
  rating?: number
	quantity: number
};


type PropsBasket = {
  product: Array<Product>
  items: number | null
  priceSum: number | null
}

const initialState:  PropsBasket = {
 product: [
    {
		id: 1,
		img: '',
		name: 'Класичний зефір',
		description:
			"це ідеальний вибір для любителів традиційного зефіру. Цей зефір має м'яку та повітряну текстуру, а також солодкий смак, який точно сподобається всім.",
		price: '220',
    rating: 0,
    quantity: 0
	}, 
 ],
 items: null,
 priceSum: null
 }

const basketSlice = createSlice({
  name: 'basketProduct',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.product.find((item: Product) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.product.push({ ...action.payload, quantity: 1 });
      }
    },    
    incrementQuantity: (state, action:  PayloadAction<number>) => {
      const item = state.product.find((item) => item.id === action.payload);
      if(item)
      item.quantity++;
    },
    decrementQuantity: (state, action:  PayloadAction<number>) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item && item.quantity === 1) {
        item.quantity = 1
      } 
      // else {
      //   item.quantity--;
      // }
    },
    removeItem: (state, action:  PayloadAction<number>) => {
      const removeItem = state.product.filter((item) => item.id !== action.payload);
      state.product = removeItem;
    },
  },
});


export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = basketSlice.actions;
export  default basketSlice.reducer;
// export const  basketStore = (state: RootState) => state.basket.product;