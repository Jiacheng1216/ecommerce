import React, { useState } from "react";
import ItemService from "../services/item.service";
import { useNavigate } from "react-router-dom";

const PostItemComponent = ({ currentUser, setCurrentUser }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [message, setMessage] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handlePostItem = async () => {
    try {
      let response = await ItemService.post(title, description, price, {
        sellerId: currentUser.user._id,
        sellerName: currentUser.user.username,
      });
      window.alert("刊登商品成功!");
      navigate("/item");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "5rem" }}>
      <div className="mb-3">
        {message && <div className="alert alert-danger">{message}</div>}
        <label htmlFor="exampleInputTitle" className="form-label">
          商品名稱:
        </label>

        <input
          onChange={handleTitle}
          type="text"
          className="form-control"
          id="exampleInputTitle"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputDescription" className="form-label">
          描述:
        </label>
        <input
          onChange={handleDescription}
          type="text"
          className="form-control"
          id="exampleInputDescription"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPrice" className="form-label">
          價錢:
        </label>
        <input
          onChange={handlePrice}
          type="text"
          className="form-control"
          id="exampleInputPrice"
        />
      </div>

      <button className="btn btn-primary" onClick={handlePostItem}>
        刊登商品
      </button>
    </form>
  );
};

export default PostItemComponent;
