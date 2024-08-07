import { Box, Button, Stack, Typography } from "@mui/material";
import product from "../images/product.png";
import { RiEyeFill, RiGroup2Line, RiMessage2Fill } from "react-icons/ri";
import user from "../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useNavigate } from "react-router-dom";
import { convertToVND } from "@/utils/utils";

const Product = ({
  type,
  item,
  check,
}: {
  type?: string;
  item?: any;
  check?: boolean;
}) => {
  let navigate = useNavigate();
  const handleRouter = (id: any, type: string) => {
    if (type !== "video" && type !== "blog") {
      if (check) {
        navigate(`/learning/${id}`);
      } else {
        navigate(`/courses/${id}`);
      }
    }
    if (type == "blog") {
      navigate(`/detail_blog/${id}`);
    }
  };
};
