import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

let newProductArr = [];

function CartCheckbox(props) {


  


  const { id, name, amount, price } = props.value;
  let num = props.num;
  const [checkboxID, setCheckboxID] = useState('');
  const [checkboxBool, setCheckboxBool] = useState(false);
  const [checkboxChildData, setcheckboxChildData] = useState([]);

  let newProduct = {};

  // 判斷Checkbox有沒有勾選
  function checkboxHandeler( id, name, amount, price, num, e ) {
    setCheckboxID(e.target);
    setCheckboxBool(e.target.checked);


    if(e.target.checked === true) {
      newProduct = { id, name, amount, price };
      newProductArr.push(newProduct);
    }else{
      const index = newProductArr.findIndex(item => item.id === id);
      newProductArr.splice(index,1);
    }
    
    setcheckboxChildData(newProductArr);
    localStorage.setItem('newCart', JSON.stringify(newProductArr));
console.log(123);

  }

  
  useEffect(()=>{

    props.sendMe(checkboxChildData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkboxChildData])

  // useEffect(()=>{

  //   props.sendMe(checkboxChildData);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[checkboxBool])


  function sum(items) {
    console.log(items);
    
    let total = 0;
    if(checkboxID.checked){
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].price;
      }
    }else{

    }
    console.log(total);
    return (total);
  }


  return (
    <>
    <input 
      type="checkbox" 
      id={"box" + id} 
      onChange={(e) => {
        newProduct = checkboxHandeler( id, name, amount, price, num, e );
      }} 
    />
      <label htmlFor={"box" + id}></label>
      <img
          src= {require('../img/pen' + id + '.jpg')}
          alt=""
      />
      <p>{name}</p>

    </>
  )

}


export default withRouter(CartCheckbox)