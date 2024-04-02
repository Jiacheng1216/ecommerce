import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ItemService from "../../services/item.service";
import "./UserIndividualItem-component.css";

const UserIndividualItemComponent = ({ currentUser, setCurrentUser }) => {
  const { id } = useParams();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    fetchItem();
    console.log(itemData);
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

  return (
    <div>
      {!currentUser && <div>在編輯您的個人商品前，您必須先登錄。</div>}
      {currentUser && itemData && itemData.seller && (
        <>
          {currentUser.user._id != itemData.seller.sellerId && (
            <div>不可以修改別人的商品!</div>
          )}
          {currentUser.user._id === itemData.seller.sellerId && (
            <div className="card">
              <div className="itemContainer">
                <div className="imgContainer">
                  <img
                    src={`http://localhost:8080/images/${itemData.imagePath}`}
                  ></img>
                </div>
                <div className="itemDataContainer">
                  <Link to={`/edit/${itemData._id}`}>
                    <button class="btn btn-primary">編輯商品</button>
                  </Link>
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
                    <p>數量</p>
                    <p className="itemQuantity">剩餘: {itemData.quantity} 個</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserIndividualItemComponent;
