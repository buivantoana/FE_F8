import {
  Box,
  Button,
  Drawer,
  Popover,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import {
  RiArrowDownSLine,
  RiCloseFill,
  RiCloseLine,
  RiFlagFill,
  RiMessengerFill,
  RiMoreFill,
} from "react-icons/ri";
import image from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import BlogContent from "@/components/BlogContent";
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    borderRadius: "30px",
    padding: "4px 15px",
  },
}));
type Props = {
  id: any;
  toggleDrawer: any;
  content: any;
  contentChild: any;
  handleEditorChange: any;
  handleEditorChangeChild: any;
  handleClick: any;
  handleClose: any;
  open: any;
  etend: any;
  setExtend: any;
  etendDad: any;
  setExtendDad: any;
  etendChild: any;
  setExtendChild: any;
  etendType: any;
  setExtendType: any;
  openPopover: any;
  anchorEl: any;
  handleCommentSubmit: any;
  comments: any;
  anchorElChild: any;
  setAnchorElChild: any;
  handleClickChild: any;
  handleCloseChild: any;
  openChild: any;
  idChild: any;
  handleFeedBackSubmit: any;
  user: any;
  handleDelete: any;
  detailComment: any;
  feedBack: any;
  setFeedBack: any;
  handleEdit: any;
  setFeedBackChild: any;
  feedBackChild: any;
  handleEditChild: any;
  handleDeleteChild: any;
  handleClickOpenReport: any;
};
const CommentView = ({
  id,
  toggleDrawer,
  content,
  contentChild,
  handleEditorChange,
  handleEditorChangeChild,
  handleClick,
  handleClose,
  open,
  etend,
  setExtend,
  etendType,
  setExtendType,
  openPopover,
  anchorEl,
  handleCommentSubmit,
  comments,
  setFeedBack,
  handleClickChild,
  handleCloseChild,
  idChild,
  handleFeedBackSubmit,
  user,
  handleDelete,
  detailComment,
  feedBack,
  handleEdit,
  setAnchorElChild,
  feedBackChild,
  handleEditChild,
  handleDeleteChild,
  handleClickOpenReport,
}: Props) => {
  const [typeChat, setTypeChat] = useState(false);
  return (
    <>
      <Box sx={{ position: "fixed", right: "30%", bottom: "10%" }}>
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#306de4",
            background: "white",
            fontWeight: "700",
            borderRadius: "30px",
            boxShadow: "0 0px 6px grey",
          }}>
          <RiMessengerFill size={20} /> Hỏi đáp
        </Button>
      </Box>

      <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
        <Box
          width={"800px"}
          height={"100vh"}
          padding={"50px"}
          className='comment-tab'
          sx={{ position: "relative", overflowY: "scroll" }}>
          <Box
            position={"absolute"}
            onClick={toggleDrawer(false)}
            top={20}
            right={20}>
            <RiCloseLine size={30} />
          </Box>
          <Button
            onClick={() => setTypeChat(!typeChat)}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#ff5117",
              background: "white",
              fontWeight: "700",
              borderRadius: "10px",
              border: "1px solid #ff5117",
              textTransform: "none",
              mb: "10px",
            }}>
            {!typeChat ? "Hỏi đáp với Chat GPT" : "Hỏi đáp với cộng đồng"}
          </Button>
          {typeChat ? (
            <>
              <Chat />
            </>
          ) : (
            <>
              <Box>
                <Typography fontSize={"20px"} fontWeight={700}>
                  {comments.length} hỏi đáp
                </Typography>
                <Typography
                  mt={"10px"}
                  fontStyle={"italic"}
                  fontSize={"14px"}
                  color={"#333"}>
                  (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
                </Typography>
              </Box>
              <Box mt={"20px"}>
                <Stack direction={"row"} gap={"10px"}>
                  <img
                    src={
                      user.data[0].image.url ? user.data[0].image.url : image
                    }
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    alt=''
                  />
                  <Box
                    sx={{
                      maxHeight: etend ? "400px" : "43px",
                      overflow: "hidden",
                    }}>
                    {etend ? (
                      ""
                    ) : (
                      <Typography
                        onClick={() => setExtend(true)}
                        mt={"20px"}
                        borderBottom={"1px solid #333333"}
                        fontSize={"14px"}>
                        Bạn có thắc mắc gì trong bài học này?
                      </Typography>
                    )}
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "100%",
                      }}>
                      <Editor
                        apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                        onEditorChange={handleEditorChange}
                        value={content}
                        init={{
                          plugins:
                            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                          editimage_cors_hosts: ["picsum.photos"],
                          menubar:
                            "file edit view insert format tools table help",
                          toolbar:
                            "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                          autosave_ask_before_unload: true,
                          autosave_interval: "30s",
                          autosave_prefix: "{path}{query}-{id}-",
                          autosave_restore_when_empty: false,
                          autosave_retention: "2m",
                          image_advtab: true,
                          link_list: [
                            {
                              title: "My page 1",
                              value: "https://www.tiny.cloud",
                            },
                            {
                              title: "My page 2",
                              value: "http://www.moxiecode.com",
                            },
                          ],
                          image_list: [
                            {
                              title: "My page 1",
                              value: "https://www.tiny.cloud",
                            },
                            {
                              title: "My page 2",
                              value: "http://www.moxiecode.com",
                            },
                          ],
                          image_class_list: [
                            { title: "None", value: "" },
                            { title: "Some class", value: "class-name" },
                          ],
                          importcss_append: true,
                          file_picker_callback: (callback, value, meta) => {
                            /* Provide file and text for the link dialog */
                            if (meta.filetype === "file") {
                              callback(
                                "https://www.google.com/logos/google.jpg",
                                {
                                  text: "My text",
                                }
                              );
                            }

                            /* Provide image and alt text for the image dialog */
                            if (meta.filetype === "image") {
                              callback(
                                "https://www.google.com/logos/google.jpg",
                                {
                                  alt: "My alt text",
                                }
                              );
                            }

                            /* Provide alternative source and posted for the media dialog */
                            if (meta.filetype === "media") {
                              callback("movie.mp4", {
                                source2: "alt.ogg",
                                poster:
                                  "https://www.google.com/logos/google.jpg",
                              });
                            }
                          },

                          height: 300,
                          image_caption: true,
                          quickbars_selection_toolbar:
                            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                          noneditable_class: "mceNonEditable",
                          toolbar_mode: "sliding",
                          contextmenu: "link image table",

                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                        }}
                      />
                    </Box>
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-end"}
                      mt={"15px"}
                      gap={1}>
                      <Button
                        onClick={() => setExtend(false)}
                        sx={{
                          color: "black",
                          border: "1px solid #333",
                          borderRadius: "99px",
                          height: "34px",
                        }}>
                        Hủy
                      </Button>
                      <Button
                        onClick={handleCommentSubmit}
                        sx={{
                          background:
                            "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                          color: "white",
                          borderRadius: "99px",

                          height: "34px",
                        }}>
                        Bình Luận
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <Stack mt={"50px"} direction={"column"} gap={"25px"}>
                {comments &&
                  comments.map((item: any, index: number) => {
                    let check = etendType.includes(item._id);
                    let comment = feedBack == item._id;
                    console.log(item);
                    return (
                      <Box>
                        <Stack direction={"row"} gap={"10px"}>
                          <Box>
                            <img
                              src={
                                item.user_id[0].image.url
                                  ? item.user_id[0].image.url
                                  : image
                              }
                              width={40}
                              height={40}
                              style={{ borderRadius: "50%" }}
                              alt=''
                            />
                          </Box>
                          <Box
                            sx={{
                              overflow: "hidden",
                            }}>
                            <Box
                              sx={{
                                padding: "15px",
                                borderRadius: "10px",
                                background: "#f2f3f5",
                                width: "500px",
                              }}>
                              <Typography fontWeight={"700"} fontSize={"14px"}>
                                {item.user_id[0].user_name}
                              </Typography>
                              <Box sx={{ color: "#292929", mt: "5px" }}>
                                <BlogContent content={item.content} />
                              </Box>
                            </Box>
                            <Box>
                              <Stack
                                mt={"8px"}
                                sx={{ cursor: "pointer" }}
                                direction={"row"}
                                alignItems={"center"}
                                gap={"6px"}>
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  width={"300px"}
                                  gap={"6px"}>
                                  <LightTooltip
                                    placement='top-start'
                                    title={
                                      <Stack direction={"row"} gap={"15px"}>
                                        <p style={{ fontSize: "22px" }}>👍</p>
                                        <p style={{ fontSize: "22px" }}>❤️</p>
                                        <p style={{ fontSize: "22px" }}>😀</p>
                                        <p style={{ fontSize: "22px" }}>😲</p>
                                        <p style={{ fontSize: "22px" }}>😰</p>
                                        <p style={{ fontSize: "22px" }}>😠</p>
                                      </Stack>
                                    }>
                                    <Typography
                                      color={"#ff5117"}
                                      fontSize={"12px"}>
                                      Thích
                                    </Typography>
                                  </LightTooltip>
                                  •
                                  <>
                                    <Typography
                                      aria-describedby={idChild}
                                      onClick={(e) => handleClickChild(e, item)}
                                      color={"#ff5117"}
                                      fontSize={"12px"}>
                                      Trả lời
                                    </Typography>
                                    •
                                  </>
                                  <Typography
                                    color={"#292929"}
                                    fontSize={"12px"}>
                                    5 tháng trước
                                  </Typography>
                                  {user.data[0]._id == item.user_id[0]._id ? (
                                    <>
                                      •
                                      <Typography
                                        onClick={() => handleDelete(item._id)}
                                        color={"red"}
                                        fontSize={"13px"}
                                        sx={{
                                          display: "flex ",
                                          alignItems: "center",
                                          gap: "6px",
                                        }}>
                                        Xóa
                                      </Typography>
                                      •
                                      <Typography
                                        onClick={() => handleEdit(item)}
                                        color={"#082ef7"}
                                        fontSize={"13px"}
                                        sx={{
                                          display: "flex ",
                                          alignItems: "center",
                                          gap: "6px",
                                        }}>
                                        Sửa
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      •
                                      <Typography
                                        onClick={() =>
                                          handleClickOpenReport(item, 0)
                                        }
                                        fontSize={"13px"}
                                        sx={{
                                          display: "flex ",
                                          alignItems: "center",
                                          gap: "6px",
                                        }}>
                                        Báo cáo
                                      </Typography>
                                    </>
                                  )}
                                </Stack>

                                {item.comments_child[0] && (
                                  <>
                                    {!check ? (
                                      <Typography
                                        onClick={() => {
                                          setFeedBack("");
                                          setExtendType([
                                            ...etendType,
                                            item._id,
                                          ]);
                                        }}
                                        sx={{ marginLeft: "70px" }}
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={"3px"}
                                        fontSize={"13px"}
                                        justifyContent={"end"}>
                                        Xem {item.comments_child.length} câu trả
                                        lời
                                        <RiArrowDownSLine size={"20px"} />
                                      </Typography>
                                    ) : (
                                      <Typography
                                        onClick={() => {
                                          setExtendType(
                                            etendType.filter(
                                              (i: any) => i !== item._id
                                            )
                                          );
                                        }}
                                        sx={{ marginLeft: "170px" }}
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={"3px"}
                                        fontSize={"13px"}
                                        justifyContent={"end"}>
                                        Thu gọn
                                        <RiArrowDownSLine size={"20px"} />
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </Stack>

                              <>
                                <Box
                                  maxHeight={check ? "6000px" : "0px"}
                                  overflow={"hidden"}
                                  sx={{ ml: "40px", transition: ".4s" }}>
                                  {item.comments_child.map(
                                    (it: any, index2: number) => {
                                      let commentChild =
                                        feedBackChild == index2;
                                      console.log(it);
                                      return (
                                        <Box>
                                          <Stack
                                            mt={"20px"}
                                            direction={"column"}
                                            gap={"25px"}>
                                            <Box>
                                              <Stack
                                                direction={"row"}
                                                gap={"10px"}>
                                                <Box>
                                                  <img
                                                    src={
                                                      it.user_id[0].image.url
                                                        ? it.user_id[0].image
                                                            .url
                                                        : image
                                                    }
                                                    width={40}
                                                    height={40}
                                                    style={{
                                                      borderRadius: "50%",
                                                    }}
                                                    alt=''
                                                  />
                                                </Box>
                                                <Box
                                                  sx={{
                                                    transition: ".4s",
                                                    overflow: "hidden",
                                                  }}>
                                                  <Box
                                                    sx={{
                                                      padding: "15px",
                                                      borderRadius: "10px",
                                                      background: "#f2f3f5",
                                                      width: "500px",
                                                    }}>
                                                    <Typography
                                                      fontWeight={"700"}
                                                      fontSize={"14px"}>
                                                      Bùi Văn Toản
                                                    </Typography>
                                                    <Box
                                                      sx={{
                                                        color: "#292929",
                                                        mt: "5px",
                                                      }}>
                                                      <BlogContent
                                                        content={it.content}
                                                      />
                                                    </Box>
                                                  </Box>
                                                  <Box>
                                                    <Stack
                                                      mt={"8px"}
                                                      sx={{ cursor: "pointer" }}
                                                      direction={"row"}
                                                      alignItems={"center"}
                                                      gap={"6px"}>
                                                      <LightTooltip
                                                        placement='top-start'
                                                        title={
                                                          <Stack
                                                            direction={"row"}
                                                            gap={"15px"}>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              👍
                                                            </p>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              ❤️
                                                            </p>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              😀
                                                            </p>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              😲
                                                            </p>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              😰
                                                            </p>
                                                            <p
                                                              style={{
                                                                fontSize:
                                                                  "22px",
                                                              }}>
                                                              😠
                                                            </p>
                                                          </Stack>
                                                        }>
                                                        <Typography
                                                          color={"#ff5117"}
                                                          fontSize={"12px"}>
                                                          Thích
                                                        </Typography>
                                                      </LightTooltip>
                                                      •
                                                      <Typography
                                                        color={"#292929"}
                                                        fontSize={"12px"}>
                                                        5 tháng trước
                                                      </Typography>
                                                      {user.data[0]._id ==
                                                      it.user_id[0]._id ? (
                                                        <>
                                                          •
                                                          <Typography
                                                            onClick={() =>
                                                              handleDeleteChild(
                                                                index2,
                                                                item
                                                              )
                                                            }
                                                            color={"red"}
                                                            fontSize={"13px"}
                                                            sx={{
                                                              display: "flex ",
                                                              alignItems:
                                                                "center",
                                                              gap: "6px",
                                                            }}>
                                                            Xóa
                                                          </Typography>
                                                          •
                                                          <Typography
                                                            onClick={() =>
                                                              handleEditChild(
                                                                it,
                                                                item,
                                                                index2
                                                              )
                                                            }
                                                            color={"#082ef7"}
                                                            fontSize={"13px"}
                                                            sx={{
                                                              display: "flex ",
                                                              alignItems:
                                                                "center",
                                                              gap: "6px",
                                                            }}>
                                                            Sửa
                                                          </Typography>
                                                        </>
                                                      ) : (
                                                        <>
                                                          {" "}
                                                          •
                                                          <Typography
                                                            onClick={() =>
                                                              handleClickOpenReport(
                                                                item,
                                                                1,
                                                                it._id
                                                              )
                                                            }
                                                            fontSize={"13px"}
                                                            sx={{
                                                              display: "flex ",
                                                              alignItems:
                                                                "center",
                                                              gap: "6px",
                                                            }}>
                                                            Báo cáo
                                                          </Typography>
                                                        </>
                                                      )}
                                                    </Stack>
                                                  </Box>
                                                </Box>
                                              </Stack>
                                            </Box>
                                          </Stack>
                                          <Box
                                            maxHeight={
                                              commentChild ? "6000px" : "0px"
                                            }
                                            overflow={"hidden"}
                                            sx={{
                                              ml: "40px",
                                              transition: ".4s",
                                            }}>
                                            <Box
                                              sx={{
                                                ".tox-statusbar": {
                                                  display: "none !important",
                                                },
                                                width: "520px",
                                              }}>
                                              <Editor
                                                apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                                                onEditorChange={
                                                  handleEditorChangeChild
                                                }
                                                value={contentChild}
                                                init={{
                                                  plugins:
                                                    "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                                  editimage_cors_hosts: [
                                                    "picsum.photos",
                                                  ],
                                                  menubar:
                                                    "file edit view insert format tools table help",
                                                  toolbar:
                                                    "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                                                  autosave_ask_before_unload: true,
                                                  autosave_interval: "30s",
                                                  autosave_prefix:
                                                    "{path}{query}-{id}-",
                                                  autosave_restore_when_empty: false,
                                                  autosave_retention: "2m",
                                                  image_advtab: true,
                                                  link_list: [
                                                    {
                                                      title: "My page 1",
                                                      value:
                                                        "https://www.tiny.cloud",
                                                    },
                                                    {
                                                      title: "My page 2",
                                                      value:
                                                        "http://www.moxiecode.com",
                                                    },
                                                  ],
                                                  image_list: [
                                                    {
                                                      title: "My page 1",
                                                      value:
                                                        "https://www.tiny.cloud",
                                                    },
                                                    {
                                                      title: "My page 2",
                                                      value:
                                                        "http://www.moxiecode.com",
                                                    },
                                                  ],
                                                  image_class_list: [
                                                    {
                                                      title: "None",
                                                      value: "",
                                                    },
                                                    {
                                                      title: "Some class",
                                                      value: "class-name",
                                                    },
                                                  ],
                                                  importcss_append: true,
                                                  file_picker_callback: (
                                                    callback,
                                                    value,
                                                    meta
                                                  ) => {
                                                    /* Provide file and text for the link dialog */
                                                    if (
                                                      meta.filetype === "file"
                                                    ) {
                                                      callback(
                                                        "https://www.google.com/logos/google.jpg",
                                                        {
                                                          text: "My text",
                                                        }
                                                      );
                                                    }

                                                    /* Provide image and alt text for the image dialog */
                                                    if (
                                                      meta.filetype === "image"
                                                    ) {
                                                      callback(
                                                        "https://www.google.com/logos/google.jpg",
                                                        {
                                                          alt: "My alt text",
                                                        }
                                                      );
                                                    }

                                                    /* Provide alternative source and posted for the media dialog */
                                                    if (
                                                      meta.filetype === "media"
                                                    ) {
                                                      callback("movie.mp4", {
                                                        source2: "alt.ogg",
                                                        poster:
                                                          "https://www.google.com/logos/google.jpg",
                                                      });
                                                    }
                                                  },

                                                  height: 300,
                                                  image_caption: true,
                                                  quickbars_selection_toolbar:
                                                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                                                  noneditable_class:
                                                    "mceNonEditable",
                                                  toolbar_mode: "sliding",
                                                  contextmenu:
                                                    "link image table",

                                                  content_style:
                                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                                                }}
                                              />
                                            </Box>
                                            <Stack
                                              direction={"row"}
                                              justifyContent={"flex-end"}
                                              mt={"15px"}
                                              gap={1}>
                                              <Button
                                                onClick={handleCloseChild}
                                                sx={{
                                                  color: "black",
                                                  border: "1px solid #333",
                                                  borderRadius: "99px",
                                                  height: "34px",
                                                }}>
                                                Hủy
                                              </Button>
                                              <Button
                                                onClick={handleFeedBackSubmit}
                                                sx={{
                                                  background:
                                                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                                                  color: "white",
                                                  borderRadius: "99px",

                                                  height: "34px",
                                                }}>
                                                Phản hồi
                                              </Button>
                                            </Stack>
                                          </Box>
                                        </Box>
                                      );
                                    }
                                  )}
                                </Box>
                              </>
                            </Box>
                          </Box>
                        </Stack>
                        <Box
                          maxHeight={comment ? "600px" : "0px"}
                          overflow={"hidden"}
                          sx={{ ml: "40px", transition: ".4s" }}>
                          <Box
                            sx={{
                              ".tox-statusbar": {
                                display: "none !important",
                              },
                              width: "580px",
                            }}>
                            <Editor
                              apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
                              onEditorChange={handleEditorChangeChild}
                              value={contentChild}
                              init={{
                                plugins:
                                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                editimage_cors_hosts: ["picsum.photos"],
                                menubar:
                                  "file edit view insert format tools table help",
                                toolbar:
                                  "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                                autosave_ask_before_unload: true,
                                autosave_interval: "30s",
                                autosave_prefix: "{path}{query}-{id}-",
                                autosave_restore_when_empty: false,
                                autosave_retention: "2m",
                                image_advtab: true,
                                link_list: [
                                  {
                                    title: "My page 1",
                                    value: "https://www.tiny.cloud",
                                  },
                                  {
                                    title: "My page 2",
                                    value: "http://www.moxiecode.com",
                                  },
                                ],
                                image_list: [
                                  {
                                    title: "My page 1",
                                    value: "https://www.tiny.cloud",
                                  },
                                  {
                                    title: "My page 2",
                                    value: "http://www.moxiecode.com",
                                  },
                                ],
                                image_class_list: [
                                  { title: "None", value: "" },
                                  { title: "Some class", value: "class-name" },
                                ],
                                importcss_append: true,
                                file_picker_callback: (
                                  callback,
                                  value,
                                  meta
                                ) => {
                                  /* Provide file and text for the link dialog */
                                  if (meta.filetype === "file") {
                                    callback(
                                      "https://www.google.com/logos/google.jpg",
                                      {
                                        text: "My text",
                                      }
                                    );
                                  }

                                  /* Provide image and alt text for the image dialog */
                                  if (meta.filetype === "image") {
                                    callback(
                                      "https://www.google.com/logos/google.jpg",
                                      {
                                        alt: "My alt text",
                                      }
                                    );
                                  }

                                  /* Provide alternative source and posted for the media dialog */
                                  if (meta.filetype === "media") {
                                    callback("movie.mp4", {
                                      source2: "alt.ogg",
                                      poster:
                                        "https://www.google.com/logos/google.jpg",
                                    });
                                  }
                                },

                                height: 300,
                                image_caption: true,
                                quickbars_selection_toolbar:
                                  "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                                noneditable_class: "mceNonEditable",
                                toolbar_mode: "sliding",
                                contextmenu: "link image table",

                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                              }}
                            />
                          </Box>
                          <Stack
                            direction={"row"}
                            justifyContent={"flex-end"}
                            mt={"15px"}
                            gap={1}>
                            <Button
                              onClick={handleCloseChild}
                              sx={{
                                color: "black",
                                border: "1px solid #333",
                                borderRadius: "99px",
                                height: "34px",
                              }}>
                              Hủy
                            </Button>
                            <Button
                              onClick={handleFeedBackSubmit}
                              sx={{
                                background:
                                  "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                                color: "white",
                                borderRadius: "99px",

                                height: "34px",
                              }}>
                              Phản hồi
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                    );
                  })}
              </Stack>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CommentView;

function Chat() {
  const khoa = "";
  const systemMessage = {
    role: "system",
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };
  const [messages, setMessages]: any = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: any) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: any) {
    let apiMessages = chatMessages.map((messageObject: any) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + khoa,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "740px",
        width: "700px",
        padding: "10px",

        ".cs-message--outgoing:nth-child(odd)": {
          justifyContent: "flex-start",
          marginLeft: 0,
        },
        ".cs-message--outgoing:nth-child(odd) .cs-message__content": {
          background: "#c6e3fa",
          borderRadius: "0.7rem",
        },
        ".cs-message-list__scroll-wrapper": {
          padding: "10px",
        },
      }}>
      <Typography
        textAlign={"center"}
        fontWeight={"bold"}
        variant='h6'
        mb={"20px"}>
        Hỏi đáp với Chat GPT
      </Typography>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior='smooth'
            typingIndicator={
              isTyping ? <TypingIndicator content='ChatGPT is typing' /> : null
            }>
            {messages.map((message: any, i: any) => {
              console.log(message);
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder='Type message here' onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </Box>
  );
}
