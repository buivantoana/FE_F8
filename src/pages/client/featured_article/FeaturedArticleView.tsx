import {
  Box,
  Button,
  Fade,
  Pagination,
  Paper,
  Popover,
  Popper,
  PopperPlacementType,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import article from "../../../images/article.png";
import user from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import b from "../../../images/fotor-ai-2024061716321.jpg";
import {
  RiBookmarkLine,
  RiFacebookCircleFill,
  RiMailFill,
  RiMoreFill,
  RiTwitterFill,
} from "react-icons/ri";
import { useState } from "react";
import { calculateTimeAgoString } from "@/utils/utils";
type Props = {
  post: any;
  id: any;
  open: any;
  anchorEl: any;
  handleClick: any;
  handleClose: any;
  handleDetailPost: any;
  totalPage: any;
  handleChangePagination: any;
  page: any;
};
const FeaturedArticleView = ({
  post,
  id,
  anchorEl,
  handleClick,
  handleClose,
  open,
  handleDetailPost,
  totalPage,
  handleChangePagination,
  page,
}: Props) => {
  const shareUrl: any =
    "https://fullstack.edu.vn/blog/la-thanh-vien-cua-f8-ban-da-thuc-su-su-dung-f8-hieu-qua-chua.html"; // Thay thế bằng URL bạn muốn chia sẻ
  const title: any =
    "la-thanh-vien-cua-f8-ban-da-thuc-su-su-dung-f8-hieu-qua-chua";


   
  
  // Ví dụ sử dụng


  
  return (
    <Box>
      <Typography variant="h4" fontWeight={"bold"}>
        Bài viết nổi bật
      </Typography>
      <Typography mt={"20px"} fontSize={"14px"} color={"#333"}>
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </Typography>
      <Stack direction={"row"} gap={"120px"} mt={"60px"}>
        <Stack width={"58%"} direction={"column"} gap={"20px"}>
          {post?<>
            {post &&
            post.length &&
            post.map((item: any) => {
              let arr = item.readers.split(",");

              return (
                <Box
                  width={"100%"}
                  sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
                  padding={"15px 25px"}
                >
                  <Stack
                    mb={"10px"}
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                      <img
                        width={26}
                        height={26}
                        style={{ borderRadius: "50%" }}
                        src={item.author[0].image.url?item.author[0].image.url:user}
                        alt=""
                      />
                      <Typography mt={"5px"} fontSize={"12px"}>
                        {item.author[0].user_name}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                      <RiBookmarkLine color="#333" size={"20px"} />
                      <RiMoreFill
                        onClick={handleClick}
                        color="#333"
                        size={"20px"}
                      />
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Box
                      width={"60%"}
                      onClick={() => handleDetailPost(item._id)}
                    >
                      <Typography variant="h6" fontWeight={"bold"}>
                        {item.title}
                      </Typography>
                      <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                        {item.description}
                      </Typography>
                      <Typography
                        mt={"13px"}
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"13px"}
                        color={"#333"}
                      >
                        {calculateTimeAgoString(new Date(item.createdAt), new Date)} 
                        <Stack ml={"20px"} direction={"row"} gap={"10px"}>
                          {arr.map((item: string) => {
                            return (
                              <Typography
                                sx={{
                                  bgcolor: "#f2f2f2",
                                  color: "#333",
                                  fontSize: "12px",
                                  borderRadius: "100px",
                                  fontWeight: 600,
                                  padding: "5px 10px",
                                }}
                              >
                                {item}
                              </Typography>
                            );
                          })}
                        </Stack>
                      </Typography>
                    </Box>
                    <Box width={"40%"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <img
                          width={"200px"}
                          style={{ borderRadius: "8px", objectFit: "cover" }}
                          height={"112px"}
                          src={item.image.url}
                          alt=""
                        />
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </>:<>
          {Array.from({ length: 2 },()=>{
            return <Box
            width={"100%"}
            sx={{ border: " 2px solid #e8e8e8", borderRadius: "16px" }}
            padding={"15px 25px"}
            display={"flex"}
            gap={"60px"}
          >
            <Box width={"60%"} sx={{ pt: 0.5 }}>
              <Skeleton width="100%" height={"40px"}/>
              <Skeleton width="100%" height={"20px"} />
              <Skeleton width="100%" height={"150px"} />
            </Box>
            <Box>
            <Skeleton variant="rectangular" sx={{borderRadius:"20px"}} width={300} height={200} />
            </Box>
          </Box>
          })}
          </>}
          
         

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePagination}
              color="primary"
            />
          </Box>
        </Stack>

        <Stack width={"25%"}>
          <Typography fontSize={"17px"} color={"#757575"}>
            CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT
          </Typography>
          <Stack mt={"20px"} direction={"row"} gap={"10px"} flexWrap={"wrap"}>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              Front-end / Mobile apps
            </Button>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              Back-end / Devops
            </Button>
            <Button
              sx={{
                bgcolor: "#f2f2f2",
                color: "#333",
                width: "max-content",
                borderRadius: "30px",
                fontSize: "12px",
                padding: "5px 8px",
              }}
            >
              UI / UX / Design
            </Button>
          </Stack>
          <Box mt={"20px"}>
            <img
              src={b}
              width={"300px"}
              height={"250px"}
              style={{ borderRadius: "10px", objectFit: "cover" }}
              alt=""
            />
          </Box>
        </Stack>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper>
          <Stack padding={"18px"} direction={"column"} gap={"20px"}>
            <FacebookShareButton url={shareUrl} hashtag="#yourHashtag">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              via="yourTwitterHandle"
              hashtags={["yourHashtag1", "yourHashtag2"]}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  );
};

export default FeaturedArticleView;
