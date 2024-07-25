import { Box, Button, Paper, Popover, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

import article from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import parse from "html-react-parser";
import b from "../../../images/fotor-ai-2024061716321.jpg";
import {
  RiBookmarkLine,
  RiFacebookCircleFill,
  RiHeartLine,
  RiMailFill,
  RiMessage3Line,
  RiMoreFill,
  RiTwitterFill,
} from "react-icons/ri";
import hljs from "highlight.js";
import styled from "styled-components";
import BlogContent from "@/components/BlogContent";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { calculateTimeAgoString } from "@/utils/utils";
type Props = {
  post: any;
  handleLikePost: any;
  likes: any;
  user: any;
};
const DetailBlogView = ({ post, handleLikePost, likes, user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  
  const iframeRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const shareUrl: any =
    "https://fullstack.edu.vn/blog/la-thanh-vien-cua-f8-ban-da-thuc-su-su-dung-f8-hieu-qua-chua.html"; // Thay thế bằng URL bạn muốn chia sẻ
  const title: any = post && post.title;

  return (
    <Box>
      <Stack direction={"row"} gap={"5%"}>
        <Box width={"10%"} display={"flex"} justifyContent={"center"}>
          <Box>
          <Stack direction={"row"}>
                <Box width={"100%"}>
                  <Stack direction={"row"} alignItems={"center"} gap={"3px"}>
                    <img
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                      src={
                        post && post.author[0].image.url
                          ? post.author[0].image.url
                          : article
                      }
                      alt=""
                    />
                    <Typography mt={"5px"} fontSize={"17px"}>
                      {post && post.author[0].user_name}
                    </Typography>
                  </Stack>
                  <Typography mt={"13px"} fontSize={"13px"} color={"#333"}>
                  {calculateTimeAgoString(new Date(post && post.createdAt), new Date)} 
                  </Typography>
                </Box>
               
              </Stack>
            <hr style={{ width: "120%", margin: "25px 0" }} />
            <Box display={"flex"} gap={"20px"}>
              <Stack
                color={"#757575"}
                direction={"row"}
                onClick={handleLikePost}
                gap={"7px"}
              >
                <RiHeartLine
                  style={{
                    color:
                      user !== false && likes.includes(user.data[0]._id)
                        ? "red"
                        : undefined,
                  }}
                  size={"23px"}
                />{" "}
                {likes.length}
              </Stack>
             
            </Box>
          </Box>
        </Box>
        <Box width={"60%"}>
          <Box
            sx={{
              " .tox-editor-header": {
                display: "none !important",
              },
              ".tox-statusbar": {
                display: "none !important",
              },
              width: "100%",
            }}
          >
            <Box width={"100%"}>
              <Stack
                mb={"10px"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5" fontWeight={"bold"}>
                  {post && post.title}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                  <RiBookmarkLine color="#333" size={"20px"} />
                  <RiMoreFill
                    onClick={handleClick}
                    color="#333"
                    size={"20px"}
                  />
                </Stack>
              </Stack>
             
            </Box>
            <Box mt={"30px"}>
              <BlogContent content={post && post.content} />
            </Box>
          </Box>
        </Box>
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
            <FacebookShareButton
              url={shareUrl}
              
              hashtag="#yourHashtag"
            >
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

export default DetailBlogView;
