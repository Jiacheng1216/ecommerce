import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemService from "../../services/item.service";
import "./Item-component.css";
import { Link } from "react-router-dom";

const ItemComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    fetchItem();
  }, []);

  //查找所有物品
  const fetchItem = async () => {
    try {
      const response = await ItemService.get();
      setItemData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p className="hint">進行登入以開始購買商品</p>
        </div>
      )}
      <div className="spil">
        <h1>商品一覽</h1>
      </div>

      {itemData && itemData.length != 0 && (
        <div
          className="card-container"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {itemData.map((item) => {
            return (
              <div className="card-group" key={item._id}>
                <Link to={`IndividualItem/${item._id}`} className="link-style">
                  <div
                    className="card shadow-on-hover"
                    style={{ width: "18rem", margin: "1rem" }}
                  >
                    <img
                      src={`http://localhost:8080/images/${item.imagePath}`}
                      className="card-img-top"
                      alt="..."
                      height={250}
                    ></img>
                    <div className="card-body">
                      <h4 className="card-title">
                        由 {item.seller.sellerName} 刊登
                      </h4>
                      <h5 className="card-title">{item.title}</h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text description"
                      >
                        {item.description}
                      </p>
                      <p
                        style={{
                          margin: "0.5rem 0rem",
                          color: "red",
                        }}
                      >
                        $ {item.price}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        剩餘: {item.quantity} 個
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        {item.date[0]}
                        {item.date[1]}
                        {item.date[2]}
                        {item.date[3]} 年 {item.date[5]}
                        {item.date[6]} 月 {item.date[8]}
                        {item.date[9]} 日 {item.date[11]}
                        {item.date[12]} : {item.date[14]}
                        {item.date[15]} 上傳
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ItemComponent;
