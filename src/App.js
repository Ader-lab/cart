import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import React from 'react'

import Menu from './components/Menu'

import Cart from './pages/Cart'
import CheckoutPage from './pages/CheckoutPage'
import OrderDetails from './pages/OrderDetails'
import ProductList from './pages/ProductList'
import CartNoProduct from './pages/CartNoProduct'

function App() {
  return (
    <Router>
      <>
          <Switch>
            <Route exact path="/">
              <h1>首頁</h1>
            </Route>
            <Route exact path="/ProductList">
              <ProductList />
            </Route>
            <Route exact path="/Cart">
              <Cart />
            </Route>
            <Route exact path="/CheckoutPage">
              <CheckoutPage />
            </Route>
            <Route exact path="/OrderDetails">
              <OrderDetails />
            </Route>
            <Route exact path="/CartNoProduct">
              <CartNoProduct /> 
            </Route>
          </Switch>
      </>
    </Router>
  )
}

export default App