import { Outlet } from "react-router";
import HeaderLayout from "./Home/HeaderLayout";

const DefaultLayout = () => {
  return (
    <>
      <HeaderLayout />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
