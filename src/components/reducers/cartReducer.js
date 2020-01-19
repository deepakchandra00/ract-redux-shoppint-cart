import Item1 from '../../images/item1.jpg'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,FETCH_REQUEST,FETCH_SUCCESS } from '../actions/action-types/cart-actions'


const initState = {
    items: [],
    addedItems:[],
}
// if (localStorage.getItem('cartItems')) {
//      initState.addedItems = JSON.parse(localStorage.getItem('cartItems'))
//     }
const cartReducer= (state = initState,action)=>{
    if(action.type === FETCH_REQUEST){
        return {...state}
    }
    if(action.type === FETCH_SUCCESS){ 
        if(state.items.length === 0 ) {
            return {
              ...state,
              items: action.payload
            }
          }
    }
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         const addedItemss = [...state.addedItems, addedItem]
         //localStorage.setItem('cartItems', JSON.stringify(addedItemss));
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
           
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        console.log(itemToRemove)
        //localStorage.setItem('cartItems', JSON.stringify(new_items));
        return{
            ...state,
            addedItems: new_items,
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          return{
              ...state,
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            return{
                ...state,
                addedItems: new_items,
            }
        }
        else {
            addedItem.quantity -= 1
            return{
                ...state,
            }
        }
        
    }
    
  else{
    return state
    }
    
}

export default cartReducer
