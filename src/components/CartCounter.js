import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';



function CartCounter(props) {
  
  const { id, name, amount, price } = props.value;
  const [idx, setIdx] = useState(0);
  const [mycart, setMycart] = useState([])


  function updateCartToLocalStorage( id, name, amount, price, type = '') {

    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    let newCart = {id, name, amount, price};
    
    
      if(type === 'increase') {
        newCart.amount = 1;
        const displayCart = [...currentCart, newCart];
        localStorage.setItem('cart', JSON.stringify(displayCart));

        // 設定資料
        setMycart(displayCart);
        // 重新整理
        window.location.reload(" http://localhost:3000/Cart ");

      }else if(type === 'decrease') {

        const index = currentCart.findIndex(item => item.id === id);
        // console.log(index);

        const decreaseCart = [
          ...currentCart.slice(0, index),
          ...currentCart.slice(index + 1)
        ];

        if(idx <= 1){
          return
        }
        newCart.amount = 1;
        
        localStorage.setItem('cart', JSON.stringify(decreaseCart));
        // 設定資料
        setMycart(decreaseCart);

        // 重新整理
        window.location.reload(" http://localhost:3000/Cart ");
      }
    
  }

  useEffect(() => {
    setIdx(amount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <button 
        // disabled="true"
        onClick={()=>{
          setIdx((idx > 1) ? (idx - 1) : idx);
          updateCartToLocalStorage( id, name, amount, price, 'decrease');
        }}>-</button>
        <input
          className="cartQuantity"
          type="text"
          onChange={(e) => e.target.value}
          value={idx}
        />
      <button onClick={()=>{
        setIdx(idx + 1);
        updateCartToLocalStorage( id, name, amount, price, 'increase');

      }}>+</button>

    </>
  )
}

export default withRouter(CartCounter)