import { createSlice } from '@reduxjs/toolkit'
// import { useDispatch, useSelector } from 'react-redux'


let quantity = 0 
const cartSlice =  createSlice({
    name: 'cart',
    
    initialState: 
    {
        quantity,
    },
    reducers: {
        incerment:(state)=>{state.quantity++},
        decrement:(state)=>{state.quantity--},
    }
})
export const {incerment,decrement} = cartSlice.actions
export const cartItems =  cartSlice.reducer






export  function Cart() 
{   
    // const {quantity} = useSelector(function () {
    //     return cartItems((store)=>store.quantity)
    // })
    // console.log(quantity);
    // const dispatch =  useDispatch()
  return <>
        <h2 className='text-center'>{quantity}</h2>
        <div className='flex justify-center'>
        <button className='border border-black' onClick={()=>dispatch(incerment())}>+</button>
        <button className='border border-black' onClick={()=>dispatch(decrement())}>-</button>
        </div>
  </>
}
