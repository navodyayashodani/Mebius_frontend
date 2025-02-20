import Navigation from "@/Navigation";
import { Outlet } from "react-router";
import Footer from "@/Footer";

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;