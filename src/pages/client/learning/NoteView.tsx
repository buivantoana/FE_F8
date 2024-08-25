import BlogContent from "@/components/BlogContent";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { RiCloseLine, RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";

type Props = {
  toggleDrawerNote: any;
  openNote: any;
  data: any;
  handleDeleteNote: any;
  edit: any;
  handleEditNote: any;
  setEdit: any;
  handleEditorChange: any;
  content: any;
  handleChangeEdit: any;
};

const NoteView = ({
  toggleDrawerNote,
  openNote,
  data,
  handleDeleteNote,
  edit,
  handleEditNote,
  setEdit,
  handleEditorChange,
  content,
  handleChangeEdit,
}: Props) => {
  return (
    <Box>
      <Drawer open={openNote} anchor='right' onClose={toggleDrawerNote(false)}>
        <Box
          width={"800px"}
          height={"100vh"}
          padding={"50px"}
          className='comment-tab'
          sx={{ position: "relative", overflowY: "scroll" }}>
          <Box
            position={"absolute"}
            onClick={toggleDrawerNote(false)}
            top={20}
            right={20}>
            <RiCloseLine size={30} />
          </Box>
          <Box>
            <Typography variant='h5' fontWeight={"bold"}>
              Ghi chú của tôi
            </Typography>
            {data.length == 0 ? (
              <Box
                width={"100%"}
                height={"90vh"}
                display={"flex"}
                flexDirection={"column"}
                gap={"5px"}
                alignItems={"center"}
                justifyContent={"center"}>
                <img
                  src='https://fullstack.edu.vn/assets/no-note-yet-Cz1TLb5Q.svg'
                  alt=''
                />
                <Typography fontSize={"15px"} fontWeight={"bold"}>
                  Bạn chưa có ghi chú nào
                </Typography>
                <Typography fontSize={"14px"}>
                  Hãy ghi chép để nhớ những gì bạn đã học!
                </Typography>
              </Box>
            ) : (
              <Stack mt={"50px"} direction={"column"} gap={"20px"}>
                {data &&
                  data.map((item: any) => {
                    return (
                      <Box>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}>
                          <Stack
                            direction={"row"}
                            gap={"15px"}
                            alignItems={"center"}>
                            <Button
                              sx={{
                                background:
                                  "#306de4",
                                color: "white",
                                borderRadius: "99px",
                                padding: "2px 5px",
                              }}>
                              {item.time}
                            </Button>
                            <Typography fontSize={"14px"} fontWeight={"bold"}>
                              {item.sub_lesson_id[0].title}
                            </Typography>
                          </Stack>
                          <Stack direction={"row"} gap={"18px"}>
                            <RiEdit2Fill
                              onClick={() => handleEditNote(item)}
                              color={"rgb(102, 102, 102)"}
                            />
                            <RiDeleteBin2Line
                              onClick={() => handleDeleteNote(item._id)}
                              color={"rgb(102, 102, 102)"}
                            />
                          </Stack>
                        </Stack>
                        <Box
                          mt={"10px"}
                          bgcolor={"rgb(247, 248, 250)"}
                          borderRadius={"5px"}
                          p={"3px 20px"}>
                          <BlogContent content={item.content} />
                        </Box>
                        <Box
                          sx={{
                            maxHeight: edit ? "500px" : "0px",
                            overflow: "hidden",
                            transition: ".3s",
                          }}>
                          <Box
                            sx={{
                              ".tox-statusbar": {
                                display: "none !important",
                              },
                              width: "100%",
                            }}>
                            <Editor
                              initialValue={content}
                              onChange={handleEditorChange}
                              apiKey='vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6'
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
                          <Box
                            display={"flex"}
                            gap={"10px"}
                            justifyContent={"end"}
                            mt={"30px"}>
                            <Button
                              onClick={() => setEdit(null)}
                              sx={{ color: "black" }}>
                              Hủy bỏ
                            </Button>
                            <Button
                              onClick={handleChangeEdit}
                              sx={{
                                background:
                                  "#306de4",
                                color: "white",

                                height: "34px",
                              }}>
                              Tạo ghi chú
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NoteView;
