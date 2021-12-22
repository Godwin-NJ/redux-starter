import {DECREASE,INCREASE,CLEAR_CART, REMOVE,GET_TOTALS,TOGGLE_AMOUNT } from './action'
// import cartItems from './cart-items'

function reducer(state, action){
    // console.log({state, action})
    if(action.type === DECREASE){
      let tempCart = []

      if(action.payload.amount === 1){
        tempCart = state.cart.filter((cartItem) => {
          return  cartItem.id !== action.payload.id 
         })
      }

      tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === action.payload.id){
          cartItem = {
            ...cartItem, amount : cartItem.amount - 1
          } 
        }
        return cartItem
      })
    

      return {...state, cart:tempCart}
      
    }
  
    if(action.type === INCREASE){
      let tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === action.payload.id){
          cartItem = {
            ...cartItem, amount : cartItem.amount + 1
          } 
        }
        return cartItem
      })
     
      

      return {...state, cart:tempCart}
     
    }

    if(action.type === REMOVE){
      return {
        ...state, 
        cart : state.cart.filter((cartItem) => {
         return  cartItem.id !== action.payload.id 
        })
      }
     
    }

    if(action.type === CLEAR_CART){
      return{
        ...state,
        cart: []
      }
    }
  

    if(action.type === GET_TOTALS ){
      let{total,amount} = state.cart.reduce((cartTotal,cartItem) => {
        const{amount,price} = cartItem
        const itemTotal = amount * price
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      }, {
        total : 0,
        amount: 0
      })
      total = parseFloat(total.toFixed(2))
      return{...state,total,amount }
    }   

    if(action.type === TOGGLE_AMOUNT){
      return {...state, cart : state.cart.map((cartItem) => {
        if(cartItem.id === action.payload.id){
          if(action.payload.toggle === 'inc'){
              return (cartItem ={...cartItem, amount : cartItem.amount + 1})
          }
          if(action.payload.toggle === 'dec'){
            return (cartItem ={...cartItem, amount : cartItem.amount - 1})
        }
        }
        return cartItem
      })}
    }

    return state
  }


  export default reducer