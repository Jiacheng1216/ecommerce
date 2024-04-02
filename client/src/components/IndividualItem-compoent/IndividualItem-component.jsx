import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemService from "../../services/item.service";
import CartService from "../../services/cart.service";
import "./IndividualItem-component.css";

const IndividualItemComponent = ({ currentUser, setCurrentUser }) => {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);
  let [quantity, setQuantity] = useState("");

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    fetchItem();
  }, []);

  //查找個別物品
  const fetchItem = async () => {
    try {
      const response = await ItemService.getIndividualItem(id);
      setItemData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //加入購物車
  const handleAddCart = async () => {
    if (quantity == "") quantity = 1;
    if (quantity > itemData.quantity) {
      window.alert("已超過剩餘數量!");
      return;
    }

    try {
      let response = await CartService.add(
        currentUser.user._id,
        itemData._id,
        quantity,
        itemData.imagePath,
        itemData.title,
        itemData.price
      );
      window.alert("加入購物車成功!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card">
      <div className="itemContainer">
        <div className="imgContainer">
          <img src={`http://localhost:8080/images/${itemData.imagePath}`}></img>
        </div>
        <div className="itemDataContainer">
          <div className="itemTitleContainer">
            <h5 className="itemTitle">{itemData.title}</h5>
          </div>

          <div className="itemPriceContainer">
            <p className="itemPrice">${itemData.price}</p>
          </div>

          <div className="itemDescriptionContainer">
            <p className="itemDescription">{itemData.description}</p>
          </div>

          <div className="itemQuantityContainer">
            <p>
              數量:{" "}
              <input
                className="quantityInput"
                onChange={handleQuantity}
                type="number"
                id="quantity"
                min="1"
                max={itemData.quantity}
              ></input>
            </p>
            <p className="itemQuantity">剩餘: {itemData.quantity} 個</p>
          </div>

          <div>
            {itemData && itemData.seller && itemData.seller.sellerId && (
              <>
                {currentUser &&
                  currentUser.user._id != itemData.seller.sellerId && (
                    <div className="cartAndBuyContainer">
                      <div onClick={handleAddCart} className="addCartContainer">
                        <p className="addCart">加入購物車</p>
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualItemComponent;
