import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import CartCounter from '../components/CartCounter'
import CartDelete from '../components/CartDelete'
import CartCheckbox from '../components/CartCheckbox'
import { Spinner } from 'react-bootstrap'





function Cart(props) {

  const [mycart, setMycart] = useState([]);
  const [mycartDisplay, setMycartDisplay] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [checkboxData, setCheckboxData] = useState([]);


  function getCartFromLocalStorage() {

    setDataLoading(true);
    // 開啟載入指示
    const newCart = localStorage.getItem('cart') || [];
    // console.log(JSON.parse(newCart));
    // 設定資料
    setMycart(JSON.parse(newCart));
  }




  // 一開始就會開始載入資料
  useEffect(() => {
    // if(localStorage.getItem('cart') === null) {
    //   return props.history.push('/CartNoProduct');
    // }
    // handleClose();

    getCartFromLocalStorage();
  }, [])

  // 每次mycart資料有變動就會1秒後關掉載入指示
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false);
  }, 500)

    let newMycartDisplay = [];

    // console.log('mycartDisplay', mycartDisplay);
    // console.log('mycart', mycart);

    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )
      //有的話就數量+1
      if (index !== -1) {
        // console.log('findindex', index);
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount;
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] };
        newMycartDisplay = [...newMycartDisplay, newItem];
      }
    }

    // console.log(newMycartDisplay)
    setMycartDisplay(newMycartDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mycart])

  // 計算總價用的函式
  function sum(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price;
    }
    return (total);
  }

  // 計算購買商品總數
  function num(items) {
    let num = 0;
    for (let i = 0; i < items.length; i++) {
      num += items[i].amount;
    }
    return num;
  }

  function newsum(Data) {
    setCheckboxData(Data)
    console.log(checkboxData);
  }

  

  const loading = (
    <div className="spinner">
      <Spinner animation="border" variant="warning" className="spinnerBody" />
    </div>
  )

  //

  const display = (
    <div id="cart">
      <div className="shoppingProcess">
        <div className="shoppingImg">
            <div className="cicle left">
            </div>
            <p>確認購物車</p>
            <IoIosArrowForward />
            <div className="cicle center">
            </div>
            <p>付款與運送方式</p>
            <IoIosArrowForward />
            <div className="cicle right">
            </div>
            <p>資料填寫</p>
        </div>
      </div>
      <div className="cartBody">
        <div className="cartContent">
          <main>
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="checkboxStyle">
                      <input type="checkbox" id="aaa" />
                      <label htmlFor="aaa">全選</label>
                    </div>
                  </th>
                  <th>數量</th>
                  <th>單價</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mycartDisplay.map((value, index) => {
                  // console.log(mycartDisplay[index].price);
                  mycartDisplay.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                  return (
                    <tr key={value.id}>
                      <td>
                        <div className="checkboxStyle">
                          <CartCheckbox 
                            value={ value } 
                            num={ index } 
                            sendMe={ newsum } />
                        </div>
                      </td>
                      <td>
                        <div>
                          <CartCounter value={value} />
                        </div>
                      </td>
                      <td>${value.price}</td>
                      <td>
                        <CartDelete value={value} />
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </main>
          <footer>
            <div>
              <p>共{num(mycartDisplay)}件商品</p>
              <p>選擇折價券或輸入折扣碼</p>
              <p>購買總金額: {sum(mycartDisplay)}</p>
              <button 
              onClick={() => {
                props.history.push('/CheckoutPage');
              }} 
              type="button" 
              className="btn">
                下一步
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )

  return (
    <>{dataLoading ? loading : display}</>
  )
}

export default withRouter(Cart);
