import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, img: action.img, price: action.price, size: action.size, qty: action.qty }];
        case "remove":
            let temp = [...state];
            temp.splice(action.index, 1);
            return temp;
        case "update" :
            let arr = [...state];
            arr.find((food,index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    arr[index] = {...food,qty: parseInt(action.qty) + food.qty, price : action.price + food.price};
                }
                return arr;
            })
            return arr;  
        case "empty" : {
            let arr = [];
            return arr;
        }      
        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
