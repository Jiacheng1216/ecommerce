import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemService from "../services/item.service";

const ItemComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ItemService.get();
        setItemData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchItem();
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>進行登入以開始購買商品</p>
        </div>
      )}
      <h1>商品一覽</h1>
      {itemData && itemData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {itemData.map((item) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h4 className="card-title">
                    賣家名稱:{item.seller.sellerName}
                  </h4>
                  <h5 className="card-title">商品名稱:{item.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {item.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>價格:{item.price}</p>
                  <p style={{ margin: "0.5rem 0rem" }}>上傳時間:{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ItemComponent;
