import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { withRouter } from 'react-router-dom';

function CartNoProduct(props) {
  return (
    <h1>沒商品</h1>
  )
}

export default withRouter(CartNoProduct);
