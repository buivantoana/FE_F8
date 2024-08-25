import {
  Box,
  Button,
  Drawer,
  Popover,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RiFlagFill, RiMoreFill, RiUploadCloudFill } from "react-icons/ri";
import demo from "../../../images/demo_learning.png";
import { Editor } from "@tinymce/tinymce-react";
import { calculateTimeAgoString } from "@/utils/utils";

type Props = {
  id: any;
  open: any;
  anchorEl: any;
  handleClick: any;
  handleClose: any;
  handleChangeTabs: any;
  value: any;
  dataActive: any;
  dataNotActive: any;
  handleDeletePost: any;
  toggleDrawer: any;
  openDrawer: any;
  content: any;
  imageUrl: any;
  handleEditorChange: any;
  handleImageChange: any;
  register: any;
  handleSubmit: any;
  onFinish: any;
  isLoading:any
};
const MyArticleView = ({
  id,
  anchorEl,
  handleClick,
  handleClose,
  open,
  handleChangeTabs,
  value,
  dataActive,
  dataNotActive,
  handleDeletePost,
  toggleDrawer,
  openDrawer,
  content,
  imageUrl,
  handleEditorChange,
  handleImageChange,
  register,
  handleSubmit,
  onFinish,
  isLoading
}: Props) => {
  return (
    <Box>
      <Drawer open={openDrawer} anchor="right" onClose={toggleDrawer(false)}>
        <Box padding={"50px"} width={"1200px"}>
          <form onSubmit={handleSubmit(onFinish)}>
            <Stack direction={"row"} gap={"30px"}>
              <Stack width={"50%"} direction={"column"} gap={"15px"}>
                <Box>
                  <Typography fontSize={"12px"} color={"#333"}>
                    <TextField
                      fullWidth
                      {...register("title")}
                      label="Tiêu đề"
                      id="fullWidth"
                    />
                    <b>Lưu ý</b>: Viết đúng với nội dung
                  </Typography>
                </Box>

                <Box>
                  <TextField
                    {...register("description")}
                    fullWidth
                    label="Mô tả khi tin được hiển thị"
                    id="fullWidth"
                  />

                  <Typography fontSize={"12px"} color={"#333"}>
                    <b>Lưu ý</b>: Chỉnh sửa tại đây sẽ thay đổi cách bài viết
                    hiển thị tại trang chủ.
                  </Typography>
                </Box>

                <Box>
                  <TextField
                    {...register("readers")}
                    fullWidth
                    label="Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì."
                    id="fullWidth"
                  />
                  <Typography fontSize={"12px"} color={"#333"}>
                    <b>Ví dụ</b>: Front-end,ReactJs,NodeJs
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ width: "30%" }}>
                <div
                  className="container"
                  style={{
                    width: "100%",
                  }}
                >
                  <label
                    htmlFor="input-img"
                    className="preview"
                    style={{
                      border: "2px dashed  #1250dc",
                      width: "100%",
                      height: "250px",
                      color: " #1250dc",
                      fontSize: "22px",
                      position: "relative",
                      borderRadius: "6px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        width={"100%"}
                        height={250}
                        style={{
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                    <RiUploadCloudFill size={"37px"} />
                    <Typography fontSize={"14px"}>
                      Upload to preview image
                    </Typography>
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    hidden
                    id="input-img"
                  />
                </div>
              </Box>
            </Stack>
            <Stack direction={"row"} gap={"46.5%"} mt={"10px"}>
              <Typography fontWeight={"bold"} fontSize={"18px"}>
                Nội dung
              </Typography>
              <Typography fontWeight={"bold"} fontSize={"18px"}>
                Preview
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", gap: "20px", mt: "10px" }}>
              <Box
                sx={{
                  ".tox-statusbar": {
                    display: "none !important",
                  },
                  width: "50%",
                }}
              >
                <Editor
                  value={content}
                  apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                  onEditorChange={handleEditorChange}
                  init={{
                    plugins:
                      "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                    editimage_cors_hosts: ["picsum.photos"],
                    menubar: "file edit view insert format tools table help",
                    toolbar:
                      "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                    autosave_ask_before_unload: true,
                    autosave_interval: "30s",
                    autosave_prefix: "{path}{query}-{id}-",
                    autosave_restore_when_empty: false,
                    autosave_retention: "2m",
                    image_advtab: true,
                    link_list: [
                      { title: "My page 1", value: "https://www.tiny.cloud" },
                      { title: "My page 2", value: "http://www.moxiecode.com" },
                    ],
                    image_list: [
                      { title: "My page 1", value: "https://www.tiny.cloud" },
                      { title: "My page 2", value: "http://www.moxiecode.com" },
                    ],
                    image_class_list: [
                      { title: "None", value: "" },
                      { title: "Some class", value: "class-name" },
                    ],
                    importcss_append: true,
                    file_picker_callback: (callback, value, meta) => {
                      /* Provide file and text for the link dialog */
                      if (meta.filetype === "file") {
                        callback("https://www.google.com/logos/google.jpg", {
                          text: "My text",
                        });
                      }

                      /* Provide image and alt text for the image dialog */
                      if (meta.filetype === "image") {
                        callback("https://www.google.com/logos/google.jpg", {
                          alt: "My alt text",
                        });
                      }

                      /* Provide alternative source and posted for the media dialog */
                      if (meta.filetype === "media") {
                        callback("movie.mp4", {
                          source2: "alt.ogg",
                          poster: "https://www.google.com/logos/google.jpg",
                        });
                      }
                    },

                    height: 600,
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
              <Box
                sx={{
                  " .tox-editor-header": {
                    display: "none !important",
                  },
                  ".tox-statusbar": {
                    display: "none !important",
                  },
                  width: "50%",
                  height: "600px",
                }}
              >
                <Editor
                  apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                  initialValue={content}
                  init={{
                    height: "600px",
                  }}
                  disabled
                />
              </Box>
            </Box>
            <Box mt={"20px"}>
              <Button
                type="submit"
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #1250dc)",
                  color: "white",

                  width: "92px",
                  height: "34px",
                }}
              >
                Xuất bản
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
      <Typography variant="h4" fontWeight={"700"} fontSize={"26px"}>
        Bài viết của tôi
      </Typography>
      <Box
        mt={"20px"}
        sx={{
          ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
            color: " #1250dc",
          },
          ".css-1aquho2-MuiTabs-indicator": {
            background: "#1250dc",
          },
        }}
      >
        <Tabs sx={{ width: "400px" }} value={value} onChange={handleChangeTabs}>
          <Tab
            label={
              <>
                <Typography sx={{ gap: "5px" }}>Đã xuất bản</Typography>
              </>
            }
          />
          <Tab
            label={
              <>
                <Typography sx={{ gap: "5px" }}>Chờ duyệt</Typography>
              </>
            }
          />
        </Tabs>
        <Stack direction={"row"}>
          {value == 0 && (
            <Box display={"flex"} width={"60%"}>
              {!dataActive[0] ? (
                <>
                {isLoading?<> <>
                  <Stack width={"100%"} direction={"column"} gap={"20px"}>
                      {Array.from({ length: 2 }, () => {
                        return (
                          <Box
                            width={"100%"}
                            sx={{
                              border: " 2px solid #e8e8e8",
                              borderRadius: "16px",
                            }}
                            padding={"15px 25px"}
                            display={"flex"}
                            gap={"60px"}
                          >
                            <Box width={"60%"} sx={{ pt: 0.5 }}>
                              <Skeleton width="100%" height={"40px"} />
                              <Skeleton width="100%" height={"20px"} />
                              <Skeleton width="100%" height={"150px"} />
                            </Box>
                            <Box>
                              <Skeleton
                                variant="rectangular"
                                sx={{ borderRadius: "20px" }}
                                width={300}
                                height={200}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                      </Stack>
                    </></>:<> <Typography mt={"20px"} ml={"15px"}>
                    Chưa có xuất bản nào
                  </Typography></>}
                 
                </>
              ) : (
                <Stack
                  mt={"15px"}
                  direction={"column"}
                  gap={"20px"}
                  width={"100%"}
                >
                 
                      {dataActive &&
                        dataActive.length &&
                        dataActive.map((item: any) => {
                          let arr = item.readers.split(",");
                          return (
                            <Box
                              width={"100%"}
                              sx={{
                                border: " 2px solid #e8e8e8",
                                borderRadius: "16px",
                              }}
                              padding={"15px 25px"}
                            >
                              <Stack
                                mb={"10px"}
                                direction={"row"}
                                justifyContent={"end"}
                                alignItems={"center"}
                              >
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"10px"}
                                >
                                  <RiMoreFill
                                    onClick={(e: any) => handleClick(e, item)}
                                    color="#333"
                                    size={"20px"}
                                  />
                                </Stack>
                              </Stack>
                              <Stack direction={"row"}>
                                <Box width={"60%"}>
                                  <Typography variant="h6" fontWeight={"bold"}>
                                    {item.title}
                                  </Typography>
                                  <Typography
                                    mt={"13px"}
                                    fontSize={"13px"}
                                    color={"#333"}
                                  >
                                    {item.description}
                                  </Typography>
                                  <Typography
                                    mt={"13px"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    fontSize={"13px"}
                                    color={"#333"}
                                  >
                                     {calculateTimeAgoString(new Date( item.createdAt), new Date)} 
                                    <Stack
                                      ml={"20px"}
                                      direction={"row"}
                                      gap={"10px"}
                                    >
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
                                      style={{
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                      }}
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
                  
                 
                </Stack>
              )}
            </Box>
          )}

          {value == 1 && (
            <Box display={"flex"} width={"60%"}>
              {!dataNotActive[0] ? (
                <>
                  <Typography mt={"20px"} ml={"15px"}>
                    Chưa có xuất bản nào
                  </Typography>
                </>
              ) : (
                <Stack
                  mt={"15px"}
                  direction={"column"}
                  gap={"20px"}
                  width={"100%"}
                >
                  {dataNotActive &&
                    dataNotActive.length &&
                    dataNotActive.map((item: any) => {
                      let arr = item.readers.split(",");
                      return (
                        <Box
                          width={"100%"}
                          sx={{
                            border: " 2px solid #e8e8e8",
                            borderRadius: "16px",
                          }}
                          padding={"15px 25px"}
                        >
                          <Stack
                            mb={"10px"}
                            direction={"row"}
                            justifyContent={"end"}
                            alignItems={"center"}
                          >
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              gap={"10px"}
                            >
                              <RiMoreFill
                                onClick={(e: any) => handleClick(e, item)}
                                color="#333"
                                size={"20px"}
                              />
                            </Stack>
                          </Stack>
                          <Stack direction={"row"}>
                            <Box width={"60%"}>
                              <Typography variant="h6" fontWeight={"bold"}>
                                {item.title}
                              </Typography>
                              <Typography
                                mt={"13px"}
                                fontSize={"13px"}
                                color={"#333"}
                              >
                                {item.description}
                              </Typography>
                              <Typography
                                mt={"13px"}
                                display={"flex"}
                                alignItems={"center"}
                                fontSize={"13px"}
                                color={"#333"}
                              >
                                {calculateTimeAgoString(new Date( item.createdAt), new Date)} 
                                <Stack
                                  ml={"20px"}
                                  direction={"row"}
                                  gap={"10px"}
                                >
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
                                  style={{
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                  }}
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
                </Stack>
              )}
            </Box>
          )}
          <Box width={"40%"}>
            <img src={demo} width={"100%"} alt="" />
          </Box>
        </Stack>
      </Box>
      <Stack direction={"row"}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box padding={"12px"} width={"178px"}>
            <Typography
              onClick={toggleDrawer(true)}
              color={"#333"}
              fontSize={"13px"}
              sx={{
                p: 1,
                display: "flex ",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Chỉnh sửa
            </Typography>
            <Typography
              onClick={handleDeletePost}
              color={"#333"}
              fontSize={"13px"}
              sx={{
                p: 1,
                display: "flex ",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Xóa
            </Typography>
          </Box>
        </Popover>
      </Stack>
    </Box>
  );
};

export default MyArticleView;
