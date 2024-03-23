import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import ItemComponent from "./item-component";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
