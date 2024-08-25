import { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";
import { Box } from "@mui/material";
import Footer from "../Footer";

const LayoutWebsite = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Kiểm tra xem người dùng đã cuộn đến khoảng 95% chiều cao của trang chưa
      if (scrollPercentage >= 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Box >
      <Header />
      <Box
        width={"96px"}
        height={"100vh"}
        position={"fixed"}
        left={0}
        top={0}
        marginTop={scroll ? "-20px" : "80px"}
        display={"flex"}
        sx={{ transition: ".1s" }}
        flexDirection={"column"}
        alignItems={"center"}
        
        zIndex={2}>
        <SideBar />
      </Box>
      <Box padding={"120px 0 0 120px"}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default LayoutWebsite;
