import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Tab,
  TablePagination,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MonacoEditor from "@monaco-editor/react";
import ReplayIcon from "@mui/icons-material/Replay";
import { Editor } from "@tinymce/tinymce-react";
import js from "../../../images/ja.svg";
import html from "../../../images/html.svg";
import css from "../../../images/css.svg";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  RiFileTextLine,
  RiPencilFill,
  RiPlayCircleFill,
  RiQuestionFill,
} from "react-icons/ri";
import React, { useEffect, useState } from "react";
type typeProps = {
  data: any;
  register: any;
  handleSubmit: any;
  onFinish: any;
  errors: any;
  handleOpenModal: any;
  handleCloseModal: any;
  openModal: boolean;
  onSubmit: any;
  handleDelete: any;
  handleClick: any;
  handleClose: any;
  id: any;
  anchorEl: any;
  open: any;
  action: string;
  deleteLesson: any;
  valueLesson: any;
  setValueLesson: any;
  handleEditorChange: any;
  value: any;
  handleChangeType: any;
  handleChangeRight: any;
  handleChangeExercise: any;
  handleChangeExerciseHtml: any;
  handleChangeExerciseCss: any;
  valueRight: any;
  lesson: any;
  handleChangeTypeExercise: any;
  typeExersice: any;
  exerciseHtml: any;
  exerciseCss: any;
  exercise: any;
  dataEdit: any;
  content: any;
  setQuestionCorrect: any;
  questionCorrect: any;
  courses: typeCourses[];
  handleArrange: any;
  toggleDrawer: any;
  openDrawer: any;
  arrange: any;
  handleImageChange: any;
  videoUrl: any;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5117",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const SubLessonView = ({
  data,
  register,
  handleSubmit,
  errors,
  onFinish,
  handleCloseModal,
  handleOpenModal,
  openModal,
  onSubmit,
  handleDelete,
  handleClick,
  handleClose,
  id,
  anchorEl,
  open,
  action,
  deleteLesson,
  valueLesson,
  setValueLesson,
  handleChangeType,
  handleEditorChange,
  value,
  handleChangeRight,
  handleChangeExercise,
  handleChangeExerciseHtml,
  handleChangeExerciseCss,
  valueRight,
  lesson,
  handleChangeTypeExercise,
  typeExersice,
  exerciseHtml,
  exerciseCss,
  exercise,
  dataEdit,
  content,
  setQuestionCorrect,
  questionCorrect,
  courses,
  handleArrange,
  toggleDrawer,
  openDrawer,
  arrange,
  handleImageChange,
  videoUrl,
}: typeProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows]: any = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (courses) {
      setPaginatedRows(
        courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, courses]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box width={"500px"} padding={"40px"}>
          <Typography fontSize={"25px"}>Sắp xếp thứ tự bài học</Typography>
          <Typography fontSize={"14px"} color={"#333"}>
            Chọn select để sắp xếp thứ tự sắp xếp được hiển thị bên dưói select
          </Typography>
          <MultipleSelect handleArrange={handleArrange} arrange={arrange} />
        </Box>
      </Drawer>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">SubLesson</Typography>
      </Stack>

      {courses.length == 0 ? (
        <Box display={"flex"} flexDirection={"column"} gap={"5px"} >
          {Array.from({ length: 5 }, (value, index) => (
            <Skeleton sx={{borderRadius:"5px"}} variant="rectangular" height={"50px"} width="100%" />
          ))}
        </Box>
      ) :<>
      {courses &&
        courses.length &&
        courses.map((item_courses: any) => {
          let check = item_courses.lesson[0];
          if (check) {
            return (
              <Accordion
                expanded={expanded === item_courses._id}
                onChange={handleChange(item_courses._id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {item_courses.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button
                    onClick={() =>
                      handleOpenModal("CREATE", undefined, item_courses.lesson)
                    }
                    variant="contained"
                  >
                    Add SubLesson
                  </Button>
                  {item_courses.lesson &&
                    item_courses.lesson.length &&
                    item_courses.lesson.map((item: any) => {
                      return (
                        <Box mt={"20px"} key={item._id}>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Typography sx={{ my: "20px" }} fontWeight={"bold"}>
                              {item.title}
                            </Typography>
                            {item.sub_lesson.length > 1 && (
                              <Button
                                onClick={() =>
                                  toggleDrawer(true, item.sub_lesson)
                                }
                                sx={{ height: "40px" }}
                              >
                                Sắp sếp lại bài học
                              </Button>
                            )}
                          </Box>
                          <TableContainer key={item._id} component={Paper}>
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell align="left">Title</StyledTableCell>
                                  <StyledTableCell align="left">
                                    Description
                                  </StyledTableCell>
                                  <StyledTableCell align="left">Duration</StyledTableCell>
                                  <StyledTableCell align="left">Type</StyledTableCell>
                                  <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.sub_lesson[0] ? (
                                  <>
                                    {item.sub_lesson &&
                                      item.sub_lesson.length &&
                                      item.sub_lesson.map((row: any) => {
                                        let check = item._id == row.lesson[0];
                                        if (check) {
                                          return (
                                            <TableRow
                                              sx={{
                                                "&:last-child td, &:last-child th":
                                                  {
                                                    border: 0,
                                                  },
                                              }}
                                            >
                                              <TableCell align="left">
                                                {row.title}
                                              </TableCell>
                                              <TableCell
                                                component="th"
                                                scope="row"
                                              >
                                                {row.description}
                                              </TableCell>

                                              <TableCell align="left">
                                                {row.duration}
                                              </TableCell>
                                              <TableCell align="left">
                                                {row.type}
                                              </TableCell>

                                              <TableCell align="left">
                                                <Button
                                                  onClick={() =>
                                                    handleOpenModal(
                                                      "UPDATE",
                                                      row
                                                    )
                                                  }
                                                >
                                                  Edit
                                                </Button>
                                                <Button
                                                  aria-describedby={id}
                                                  onClick={(e) =>
                                                    handleClick(e, row)
                                                  }
                                                  sx={{ color: "red" }}
                                                >
                                                  Delete
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          );
                                        }
                                      })}
                                  </>
                                ) : (
                                  <TableRow>
                                    {" "}
                                    <TableCell>Not Found Data</TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            );
          }
        })}
      
      </>}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
        <Box padding={"10px"}>
          <Typography>Bạn có muốn xóa không?</Typography>
          <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={() => handleDelete(deleteLesson)}
              sx={{ color: "red" }}
            >
              Xóa
            </Button>
          </Stack>
        </Box>
      </Popover>
      <ModalForm
        open={openModal}
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleClose={handleCloseModal}
        onSubmit={onSubmit}
        action={action}
        valueLesson={valueLesson}
        setValueLesson={setValueLesson}
        handleChangeType={handleChangeType}
        handleEditorChange={handleEditorChange}
        value={value}
        handleChangeRight={handleChangeRight}
        handleChangeExercise={handleChangeExercise}
        handleChangeExerciseHtml={handleChangeExerciseHtml}
        handleChangeExerciseCss={handleChangeExerciseCss}
        valueRight={valueRight}
        lesson={lesson}
        handleChangeTypeExercise={handleChangeTypeExercise}
        typeExersice={typeExersice}
        exerciseHtml={exerciseHtml}
        exerciseCss={exerciseCss}
        exercise={exercise}
        dataEdit={dataEdit}
        content={content}
        setQuestionCorrect={setQuestionCorrect}
        questionCorrect={questionCorrect}
        handleImageChange={handleImageChange}
        videoUrl={videoUrl}
      />
    </>
  );
};
export default SubLessonView;

const ModalForm = (props: any) => {
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" textAlign={"center"}>
          {props.action == "CREATE" ? "Add SubLesson" : "Update SubLesson"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <Box width={"24%"}>
              <TextField
                fullWidth
                {...props.register("title")}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("duration")}
                type="number"
                fullWidth
                id="outlined-basic"
                label="Duration"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("description")}
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
                size="small"
              />
            </Box>

            <Box width={"24%"}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Lesson</InputLabel>
                <Select
                  {...props.register("lesson_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.valueLesson}
                  onChange={(e) => props.setValueLesson(e.target.value)}
                  label="Lesson"
                >
                  {props.lesson &&
                    props.lesson.length &&
                    props.lesson.map((item: any) => {
                      return <MenuItem value={item._id}>{item.title}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("source")}
                fullWidth
                id="outlined-basic"
                label="Source"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"100%"}>
              <Tabs
                value={props.value}
                onChange={props.handleChangeType}
                aria-label="basic tabs example"
              >
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                      <RiPlayCircleFill size={"14px"} />
                      <Typography textTransform={"lowercase"}>Video</Typography>
                    </Stack>
                  }
                />
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                      <RiQuestionFill size={"14px"} />
                      <Typography textTransform={"lowercase"}>Quizz</Typography>
                    </Stack>
                  }
                />
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                      <RiFileTextLine size={"14px"} />
                      <Typography textTransform={"lowercase"}>Blog</Typography>
                    </Stack>
                  }
                />
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
                      <RiPencilFill size={"14px"} />
                      <Typography textTransform={"lowercase"}>Code</Typography>
                    </Stack>
                  }
                />
              </Tabs>
              {props.value == 0 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        onChange={props.handleImageChange}
                        accept="video/*"
                        type="file"
                      />
                    </Button>
                  </Box>
                  {props.videoUrl && (
                    <video width="320" height="240" controls>
                      <source src={props.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Box>
              )}
              {props.value == 1 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "50%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
                        value={props.content}
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
                    <Box
                      width={"50%"}
                      display={"flex"}
                      flexDirection={"column"}
                      gap={"15px"}
                    >
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerOne")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerOne"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctOne")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={props.questionCorrect.correctOne}
                              onChange={(e) =>
                                props.setQuestionCorrect({
                                  ...props.questionCorrect,
                                  correctOne: e.target.value,
                                })
                              }
                              label="Correct"
                            >
                              <MenuItem value={`true`}>True</MenuItem>
                              <MenuItem value={`false`}>False</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerTwo")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerTwo"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctTwo")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Correct"
                              value={props.questionCorrect.correctTwo}
                              onChange={(e) =>
                                props.setQuestionCorrect({
                                  ...props.questionCorrect,
                                  correctTwo: e.target.value,
                                })
                              }
                            >
                              <MenuItem value={`true`}>True</MenuItem>
                              <MenuItem value={`false`}>False</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box display={"flex"} gap={"10px"}>
                        <Box width={"69%"}>
                          <TextField
                            {...props.register("answerThree")}
                            fullWidth
                            id="outlined-basic"
                            label="AnswerThree"
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Box width={"29%"}>
                          <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">
                              Correct
                            </InputLabel>
                            <Select
                              {...props.register("correctThree")}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Correct"
                              value={props.questionCorrect.correctThree}
                              onChange={(e) =>
                                props.setQuestionCorrect({
                                  ...props.questionCorrect,
                                  correctThree: e.target.value,
                                })
                              }
                            >
                              <MenuItem value={`true`}>True</MenuItem>
                              <MenuItem value={`false`}>False</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              {props.value == 2 && (
                <Box mt={"20px"}>
                  <Box width={"98.5%"} display={"flex"} gap={"20px"}>
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "99.5%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
                        value={props.content}
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
                  </Box>
                </Box>
              )}
              {props.value == 3 && (
                <Box>
                  <Box mt={"10px"} display={"flex"} gap={"15px"}>
                    <Box width={"49%"}>
                      <TextField
                        {...props.register("solution_key")}
                        fullWidth
                        id="outlined-basic"
                        label="Solution Key"
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                    <Box width={"49%"}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Type Exercise
                        </InputLabel>
                        <Select
                          {...props.register("type_exercise")}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={props.handleChangeTypeExercise}
                          label="Type Exercise"
                          value={props.typeExersice}
                        >
                          <MenuItem value={`html`}>Html</MenuItem>
                          <MenuItem value={`html-css`}>Html-Css</MenuItem>
                          <MenuItem value={`javascript`}>JavaScript</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    width={"98.5%"}
                    mt={"15px"}
                    display={"flex"}
                    gap={"20px"}
                  >
                    <Box
                      sx={{
                        ".tox-statusbar": {
                          display: "none !important",
                        },
                        width: "50%",
                      }}
                    >
                      <Editor
                        apiKey="vr0wwkbvph803e16rtf0mauheh4p5jy4fiw0akbjnf1benb6"
                        onEditorChange={props.handleEditorChange}
                        value={props.content}
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

                          height: 290,
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
                      width={"50%"}
                      borderRadius={"10px"}
                      overflow={"hidden"}
                      height={"290px"}
                    >
                      <Stack
                        sx={{
                          ".css-1aquho2-MuiTabs-indicator": {
                            display: "none",
                          },
                          ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
                            minHeight: "0",
                            height: "40px",
                            color: "white",
                          },
                          height: "40px",
                          ".css-heg063-MuiTabs-flexContainer": {
                            mt: "5px",
                            background: "#1e1e1e",
                          },
                          ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected":
                            {
                              color: "#1976d2 !important",
                            },
                        }}
                        bgcolor={"#343434"}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        width={"99.9%"}
                      >
                        {props.typeExersice == "html" && (
                          <Tabs
                            value={props.valueRight}
                            onChange={props.handleChangeRight}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              label={
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"4px"}
                                >
                                  <img
                                    src={html}
                                    width={17}
                                    height={17}
                                    style={{ borderRadius: "5px" }}
                                    alt=""
                                  />
                                  <Typography
                                    fontSize={"12px"}
                                    sx={{ textTransform: "lowercase" }}
                                  >
                                    index.html
                                  </Typography>
                                </Stack>
                              }
                            />
                          </Tabs>
                        )}
                        {props.typeExersice == "javascript" && (
                          <Tabs
                            value={props.valueRight}
                            onChange={props.handleChangeRight}
                            aria-label="basic tabs example"
                          >
                            <Tab
                              label={
                                <Stack
                                  direction={"row"}
                                  alignItems={"center"}
                                  gap={"4px"}
                                >
                                  <img
                                    src={js}
                                    width={17}
                                    height={17}
                                    style={{ borderRadius: "5px" }}
                                    alt=""
                                  />
                                  <Typography
                                    fontSize={"12px"}
                                    sx={{ textTransform: "lowercase" }}
                                  >
                                    main.js
                                  </Typography>
                                </Stack>
                              }
                            />
                          </Tabs>
                        )}
                        {props.typeExersice == "html-css" && (
                          <>
                            <Tabs
                              value={props.valueRight}
                              onChange={props.handleChangeRight}
                              aria-label="basic tabs example"
                            >
                              <Tab
                                label={
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    gap={"4px"}
                                  >
                                    <img
                                      src={html}
                                      width={17}
                                      height={17}
                                      style={{ borderRadius: "5px" }}
                                      alt=""
                                    />
                                    <Typography
                                      fontSize={"12px"}
                                      sx={{ textTransform: "lowercase" }}
                                    >
                                      index.html
                                    </Typography>
                                  </Stack>
                                }
                              />
                              <Tab
                                label={
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    gap={"4px"}
                                  >
                                    <img
                                      src={css}
                                      width={17}
                                      height={17}
                                      style={{ borderRadius: "5px" }}
                                      alt=""
                                    />
                                    <Typography
                                      fontSize={"12px"}
                                      sx={{ textTransform: "lowercase" }}
                                    >
                                      style.css
                                    </Typography>
                                  </Stack>
                                }
                              />
                            </Tabs>
                          </>
                        )}

                        <Box
                          width={"65px"}
                          height={"40px"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          bgcolor={"#1e1e1e"}
                        >
                          <ReplayIcon sx={{ color: "white" }} />
                        </Box>
                      </Stack>
                      <Box
                        sx={{
                          " .slider-mouseover": {
                            display: "none",
                          },
                        }}
                      >
                        {props.typeExersice == "javascript" && (
                          <MonacoEditor
                            width={"100%"}
                            height="250px"
                            language="javascript"
                            theme="vs-dark"
                            value={props.exercise}
                            onChange={(value) =>
                              props.handleChangeExercise(value)
                            }
                          />
                        )}
                        {props.typeExersice == "html" && (
                          <MonacoEditor
                            height="250px"
                            language="html"
                            theme="vs-dark"
                            value={props.exerciseHtml}
                            onChange={(value) =>
                              props.handleChangeExerciseHtml(value)
                            }
                          />
                        )}
                        {props.typeExersice == "html-css" && (
                          <>
                            {props.valueRight == 0 && (
                              <MonacoEditor
                                height="250px"
                                language="html"
                                theme="vs-dark"
                                value={props.exerciseHtml}
                                onChange={(value) =>
                                  props.handleChangeExerciseHtml(value)
                                }
                              />
                            )}
                            {props.valueRight == 1 && (
                              <MonacoEditor
                                height="250px"
                                language="css"
                                theme="vs-dark"
                                value={props.exerciseCss}
                                onChange={(value) =>
                                  props.handleChangeExerciseCss(value)
                                }
                              />
                            )}
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"end"}
              gap={"10px"}
            >
              <Button
                onClick={props.handleClose}
                sx={{
                  color: "black",
                  borderRadius: "99px",
                  width: "82px",
                  height: "34px",
                  border: "1px solid #333",
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                onClick={props.onSubmit}
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  width: "92px",
                  height: "34px",
                }}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

function MultipleSelect({ arrange, handleArrange }: any) {
  const [personName, setPersonName]: any = React.useState([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const sortedData = personName.map((id: any) => {
    return arrange.find((item: any) => item._id === id);
  });

  return (
    <div>
      <FormControl sx={{ mt: "30px", width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {arrange.map((name: any) => (
            <MenuItem value={name._id}>{name.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography my={"20px"} fontSize={"14px"} color={"#333"}>
        Thư tự bài học hiển thị
      </Typography>
      {sortedData &&
        sortedData.map((item: any, index: number) => {
          return (
            <Paper
              sx={{ width: "100%", padding: "10px", mt: "10px" }}
              elevation={3}
            >
              <Box display={"flex"} gap={"10px"}>
                <Typography>Bài {index + 1}</Typography> :{" "}
                <Typography>{item.title}</Typography>
              </Box>
            </Paper>
          );
        })}

      <Button
        disabled={sortedData.length == arrange.length ? false : true}
        onClick={() => handleArrange(sortedData)}
        sx={{
          background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
          color: "white",
          borderRadius: "10px",
          width: "92px",
          height: "34px",
          mt: "30px",
          opacity: sortedData.length == arrange.length ? 1 : 0.5,
        }}
      >
        Submit
      </Button>
    </div>
  );
}
