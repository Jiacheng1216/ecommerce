import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import ItemService from "../services/item.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ItemService.getSelf(currentUser.user._id);
        setItemData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchItem();
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
      {currentUser && (
        <div>
          <h2>以下是您的個人資料：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <br></br>

      {currentUser && (
        <div>
          <h2>您刊登的商品</h2>
          {itemData && itemData.length != 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {itemData.map((item) => {
                return (
                  <div
                    className="card"
                    style={{ width: "18rem", margin: "1rem" }}
                  >
                    <img
                      src={`http://localhost:8080/images/${item.imagePath}`}
                      class="card-img-top"
                      alt="..."
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">商品名稱:{item.title}</h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text"
                      >
                        {item.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        價格:{item.price}$
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        上傳時間:{item.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
