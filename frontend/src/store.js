import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, allProductsReducer } from "./reducers/productReducers"
import { cartReducer, likeReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userDeleteReducer, userListReducer, userUpdateReducer } from "./reducers/userReducers"
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    OrdersListReducer,
    orderDeliverReducer
} from "./reducers/orderReducers"

import { categoriesListReducer, categoryCreateReducer, categoryReducer } from "./reducers/categoryReducers"

const reducer = combineReducers({
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrderList: myOrderListReducer,
    userList: userListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    orderPay: orderPayReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    OrdersList: OrdersListReducer,
    orderDeliver: orderDeliverReducer,
    categoriesList: categoriesListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDetails: categoryReducer,
    allProducts: allProductsReducer,
    like: likeReducer
})
//here we load or get the data from local storage to put them into initial state of our store
const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems")) : []

const likeItemsFromLocalStorage = localStorage.getItem("likeItems") ?
    JSON.parse(localStorage.getItem("likeItems")) : []

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ?
    JSON.parse(localStorage.getItem("shippingAddress")) : null

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod") ?
    JSON.parse(localStorage.getItem("paymentMethod")) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        paymentMethod: paymentMethodFromLocalStorage
    },
    like: {
        likeItems: likeItemsFromLocalStorage,
    },
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;