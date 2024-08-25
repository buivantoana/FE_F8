import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RiUploadCloudFill } from "react-icons/ri";
import minhhoa from "../../../images/minhhoa.png";
type Props = {
  content: any;
  imageUrl: any;
  handleEditorChange: any;
  handleImageChange: any;
  register: any;
  handleSubmit: any;
  onFinish: any;
  onSubmit: any;
  errors: any;
  file: any;
};
const WiteBlogPostView = ({
  content,
  imageUrl,
  handleEditorChange,
  handleImageChange,
  register,
  handleSubmit,
  onFinish,
  onSubmit,
  errors,
  file,
}: Props) => {
  return (
    <Box>
      <Stack direction={"row"} justifyContent={"space-between"} mb={"20px"}>
        <Typography width={"50%"} fontWeight={"bold"} fontSize={"23px"}>
          Viết bài Blog
        </Typography>
        <Typography
          width={"50%"}
          ml={"50px"}
          fontWeight={"bold"}
          sx={{ display: "flex", alignItems: "end" }}
          fontSize={"18px"}>
          Ảnh minh họa
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onFinish)}>
        <Stack direction={"row"} gap={"30px"}>
          <Stack width={"28%"} direction={"column"} gap={"15px"}>
            <Box>
              <Typography fontSize={"12px"} color={"#333"}>
                <TextField
                  fullWidth
                  {...register("title")}
                  error={errors.title}
                  label='Tiêu đề'
                  id='fullWidth'
                />
                <b>Lưu ý</b>: Viết đúng với nội dung
              </Typography>
            </Box>

            <Box>
              <TextField
                {...register("description")}
                fullWidth
                label='Mô tả khi tin được hiển thị'
                id='fullWidth'
                error={errors.description}
              />

              <Typography fontSize={"12px"} color={"#333"}>
                <b>Lưu ý</b>: Chỉnh sửa tại đây sẽ thay đổi cách bài viết hiển
                thị tại trang chủ.
              </Typography>
            </Box>

            <Box>
              <TextField
                {...register("readers")}
                fullWidth
                label='Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.'
                id='fullWidth'
                error={errors.readers}
              />
              <Typography fontSize={"12px"} color={"#333"}>
                <b>Ví dụ</b>: Front-end,ReactJs,NodeJs
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ width: "19.5%" }}>
            <div
              className='container'
              style={{
                width: "100%",
              }}>
              <label
                htmlFor='input-img'
                className='preview'
                style={{
                  border: "2px dashed  #ff5117",
                  width: "100%",
                  height: "250px",
                  color: " #ff5117",
                  fontSize: "22px",
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    width={300}
                    height={250}
                    style={{
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    alt=''
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
                type='file'
                hidden
                id='input-img'
              />
            </div>
          </Box>
          <Box width={"45%"}>
            <img src={minhhoa} width={"100%"} height={263} alt='' />
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
            }}>
            <Editor
              apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
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
            }}>
            <Editor
              apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
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
            disabled={content == "" || file == null ? true : false}
            type='submit'
            onClick={onSubmit}
            sx={{
              background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
              color: "white",

              width: "92px",
              height: "34px",
            }}>
            Xuất bản
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default WiteBlogPostView;
