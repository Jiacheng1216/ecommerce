import { Outlet } from "react-router-dom";
import Nav from "./NavComponent/nav-component.jsx";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
