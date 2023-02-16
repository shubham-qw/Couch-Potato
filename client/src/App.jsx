import React from "react";
import Home from "./Screen/home";
import Login from "./Screen/login";
import Signup from "./Screen/signup";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from "./components/contextReducer";
import Cart from "./Screen/cart";
import Orders from "./Screen/myOrders";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />
  },
  
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/myorders",
    element : <Orders/>
  }
]);



function App() {
  return (
    <CartProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  )
}

export default App;