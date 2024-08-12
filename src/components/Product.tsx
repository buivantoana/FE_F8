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
  console.log(item);
  return (
    <>
      {item ? (
        <Box width={"100%"}>
          <Box sx={{ position: "relative" }}>
            <img
              src={item.image.url}
              width={"100%"}
              height={"183px"}
              style={{ borderRadius: "18px", objectFit: "cover" }}
              alt=''
            />
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "98%",
                top: 0,
                left: 0,
                background: "rgba(0,0,0,.5)",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "0.5s",
                "&:hover": {
                  opacity: 1,
                },
                "&:hover button": {
                  transform: "translateY(0px)",
                },
              }}>
              <Button
                onClick={() => handleRouter(item._id, String(type))}
                sx={{
                  background: "white",
                  color: "black",
                  height: "30px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  transition: ".5s",
                  transform: "translateY(20px)",
                  "&:hover": {
                    color: "black", // Thay đổi màu chữ khi hover
                    backgroundColor: "white",
                  },
                }}>
                {type == "free" ? (
                  <>{check ? "Tiếp tục học" : "Xem khóa học"}</>
                ) : (
                  <>
                    {type === "takecharge" && (
                      <>{check ? "Tiếp tục học" : "Xem khóa học"}</>
                    )}
                    {type === "video" && "Xem video"}
                    {type === "blog" && "Xem Bài viết"}
                  </>
                )}
              </Button>
            </Box>
          </Box>
          <Box mt={"10px"}>
            <Typography variant='h6' fontWeight={"bold"} fontSize={"16px"}>
              {item.title}
            </Typography>
            <Box>
              {type === "free" && (
                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                  <RiGroup2Line size={24} color={"#666666"} />{" "}
                  <Typography fontSize={"14px"} color={"#666666"}>
                    {item.students.length}
                  </Typography>
                </Stack>
              )}
              {type === "takecharge" && (
                <Stack direction={"row"} gap={1.5}>
                  <Typography sx={{ color: "red" }}>
                    {convertToVND(item.price)}
                  </Typography>
                </Stack>
              )}
              {type === "blog" && (
                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                  <img
                    src={
                      item.author[0].image.url ? item.author[0].image.url : user
                    }
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%" }}
                    alt=''
                  />
                  <Typography fontWeight={"600"} fontSize={"14px"}>
                    {item.author[0].user_name}
                  </Typography>
                  <Typography fontSize={"12px"} color={"#666666"}>
                    6 phút đọc
                  </Typography>
                </Stack>
              )}
              {type === "video" && (
                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <RiEyeFill size={"16px"} color={"#666666"} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      245.400
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <ThumbUpIcon sx={{ color: "#666666", fontSize: "16px" }} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      400
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <RiMessage2Fill size={"16px"} color={"#666666"} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      200
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box width={"100%"}>
          <Box sx={{ position: "relative" }}>
            <img
              src={product}
              width={"100%"}
              style={{ borderRadius: "18px" }}
              alt=''
            />
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "98%",
                top: 0,
                left: 0,
                background: "rgba(0,0,0,.5)",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "0.5s",
                "&:hover": {
                  opacity: 1,
                },
                "&:hover button": {
                  transform: "translateY(0px)",
                },
              }}>
              <Button
                sx={{
                  background: "white",
                  color: "black",
                  height: "30px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  transition: ".5s",
                  transform: "translateY(20px)",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white",
                  },
                }}>
                {type === "video" && "Xem video"}
                {type !== "video" && type !== "blog" && "Xem khóa học"}
                {type === "blog" && "Xem Bài viết"}
              </Button>
            </Box>
          </Box>
          <Box mt={"10px"}>
            <Typography variant='h6' fontWeight={"bold"} fontSize={"16px"}>
              HTML CSS Pro
            </Typography>
            <Box>
              {type === "free" && (
                <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                  <RiGroup2Line size={24} color={"#666666"} />{" "}
                  <Typography fontSize={"14px"} color={"#666666"}>
                    132.500
                  </Typography>
                </Stack>
              )}
              {type === "takecharge" && (
                <Stack direction={"row"} gap={1.5}>
                  <Typography sx={{ textDecoration: "line-through" }}>
                    2.500.000
                  </Typography>
                  <Typography sx={{ color: "red" }}>1.500.000</Typography>
                </Stack>
              )}
              {type === "blog" && (
                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                  <img
                    src={user}
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%" }}
                    alt=''
                  />
                  <Typography fontWeight={"600"} fontSize={"14px"}>
                    Bùi Văn Toản
                  </Typography>
                  <Typography fontSize={"12px"} color={"#666666"}>
                    6 phút đọc
                  </Typography>
                </Stack>
              )}
              {type === "video" && (
                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <RiEyeFill size={"16px"} color={"#666666"} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      245.400
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <ThumbUpIcon sx={{ color: "#666666", fontSize: "16px" }} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      400
                    </Typography>
                  </Box>
                  <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                    <RiMessage2Fill size={"16px"} color={"#666666"} />
                    <Typography fontSize={"13px"} color={"#666666"}>
                      200
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Product;
