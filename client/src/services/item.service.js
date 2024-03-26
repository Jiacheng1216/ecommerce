import axios from "axios";
const API_URL = "http://localhost:8080/api/item";

class ItemService {
  //上傳商品
  post(title, description, price, seller, imagePath) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, description, price, seller, imagePath },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //上傳商品照片
  postPhoto(fd) {
    return axios.post(API_URL + "/postPhoto", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  //查詢所有商品
  get() {
    return axios.get(API_URL + "/showItems");
  }

  //查詢個人商品
  getSelf(id) {
    return axios.get(API_URL + "/selfItems/" + id);
  }

  deleteItem(id) {
    return axios.delete(API_URL + "/delete/" + id);
  }
}

export default new ItemService();
