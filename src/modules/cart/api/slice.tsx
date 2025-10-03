import { createSlice,createSelector,PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../../store/store";
import { select } from 'redux-saga/effects';

interface CartItems {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    // image: string;
    totalPrice: number;
}
interface CartState {
    items: CartItems[];
}

const initialState: CartState = {
    items:[]
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
        addItem:(state,action:PayloadAction<CartItems>)=>{
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = newItem.price * existingItem.quantity;
            }
            else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
               
            }
        },
        removeItem:(state,action:PayloadAction<CartItems>)=>{
            const newItem = action.payload;
            const existingItem = state.items.find(item => item._id === newItem._id);
            if (existingItem) {
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                    existingItem.totalPrice -= existingItem.price;
                }else{
                    state.items = state.items.filter(item => item._id !== newItem._id);
                }
            }
            }
            


    }
})
export const {clearCart,addItem,removeItem} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state:RootState)=>state.cart.items;
export const selectItemCountById = (id:string)=>(createSelector(selectCartItems,(items)=>{
        const item = items.find((item:any)=>item._id===id);
        return item ? item?.quantity :0;
    })
  
)
 
export const selectTotalItemsInCart = createSelector(selectCartItems,(items)=>{
    return items.reduce((total:number,item)=>total+item.quantity,0);
})
export const selectTotalPriceInCart = createSelector(selectCartItems,(items)=>{
    return items.reduce((total:number,item)=>total+item.totalPrice,0);
})
////total price of all items should be calculated in backend and sent to frontend caviat is that we need to know the total price of all items in the cart
////so we need to calculate it in the reducer