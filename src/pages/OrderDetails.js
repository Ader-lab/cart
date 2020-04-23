import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io';


function OrderDetails(props) {

const [mycart, setMycart] = useState([]);
  const [mycartDisplay, setMycartDisplay] = useState([]);

  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('cart') || []
    console.log(JSON.parse(newCart))
    // 設定資料
    setMycart(JSON.parse(newCart))
  }


  // 一開始就會開始載入資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 每次mycart資料有變動就會1秒後關掉載入指示
  useEffect(() => {

    let newMycartDisplay = []

    console.log('mycartDisplay', mycartDisplay)
    console.log('mycart', mycart)

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
        console.log('findindex', index)
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    console.log(newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mycart])

  // 計算總價用的函式
  function sum(items) {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price;
    }
    return (total)
  }

  // 計算購買商品總數
  function num(items) {
    let num = 0;
    for (let i = 0; i < items.length; i++) {
      num += items[i].amount;
    }
    return num;
  }

  return (
        <div id="orderDetails">
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
          <div className="orderBody">
            <div className="orderContent">
              <header>
                <h1>👍🏼</h1>
                <h2>完成訂單</h2>
                <p>訂單編號:123456789</p>
              </header>
              <main>
                <table>
                  <thead>
                    <tr>
                      <th>訂單商品</th>
                      <th>單價</th>
                      <th>數量</th>
                      <th>總價</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mycartDisplay.map((value, index) => {
                      return (
                        <tr key={value.id}>
                          <td>
                            <div className="">
                              <img
                                src="http://fakeimg.pl/80x80/282828/EAE0D0/?text=HI"
                                alt=""
                              />
                              <p>{value.name}</p>
                            </div>
                          </td>
                          <td>${value.price}</td>
                          <td>{value.amount}</td>
                          <td>${value.price * value.amount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </main>
              <footer>
                <div>
                  <p>共{num(mycartDisplay)}件</p>
                  <p>商品總金額: ${sum(mycartDisplay)}</p>
                  <p>運費總金額: $60</p>
                  <p>總計: ${sum(mycartDisplay)+60}</p>
                </div>
              </footer>
              <section>
                <p>取貨人資訊(7-11貨到付款)</p>
                <p>姓名: XXX</p>
                <p>手機號碼: 09-xxxxxxxx</p>
                <p>取貨門市: XX門市</p>
                <button type="button" className="btn">繼續購物</button>
              </section>
            </div>
          </div>
        </div>
  )
}


export default OrderDetails