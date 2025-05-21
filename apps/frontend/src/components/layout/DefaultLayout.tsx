import { Outlet } from "react-router";
import HeaderLayout from "./Home/HeaderLayout";
import FooterLayout from "./Home/FooterLayout";

const DefaultLayout = () => {
  return (
    <>
      <HeaderLayout />
      <Outlet />
      <FooterLayout />
    </>
  );
};

export default DefaultLayout;
