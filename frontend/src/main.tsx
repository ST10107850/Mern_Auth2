import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Hero } from "./components/Hero.tsx";
import { Login } from "./components/Login.tsx";
import { Register } from "./components/Register.tsx";
import { Profile } from "./components/Profile.tsx";
import { PrivateRouter } from "./components/PrivateRouter.tsx";
import store from "./store.tsx";
import { Products } from "./components/Products.tsx";
import { CreateNewProduct } from "./components/CreateNewProduct.tsx";
import { ProductDetails } from "./components/ProductDetails.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private route */}
      <Route element={<PrivateRouter />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/create_product" element={<CreateNewProduct />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
