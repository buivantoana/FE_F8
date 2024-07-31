import { convertToVND } from "@/utils/utils";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  RiAddFill,
  RiArticleLine,
  RiBatteryChargeFill,
  RiCheckFill,
  RiDashboard3Fill,
  RiMovie2Fill,
  RiPencilFill,
  RiQuestionFill,
  RiSubtractFill,
  RiTimeFill,
  RiYoutubeFill,
} from "react-icons/ri";
import StarRatings from "react-star-ratings";
type Props = {
  courses: typeCourses;
  expanded: any;
  handleTongle: any;
  handleTongleAll: any;
  toggle: any;
  totalLesson: number;
  navigate: any;
  handleProgress:any;
  paymentSuccess:any
  star:any
};
const DetailCourseView = ({
  courses,
  expanded,
  handleTongle,
  handleTongleAll,
  toggle,
  totalLesson,
  navigate,
  handleProgress,
  paymentSuccess,
  star
}: Props) => {
  return (
    <Box>
      <Stack direction={"row"}>
        <Box width={"55%"}>
          <Typography fontSize={"28px"} fontWeight={"bold"}>
            {courses && courses.title}
          </Typography>
          <Typography my={"20px"} color={"#333"} fontSize={"14px"}>
            {courses && courses.description}
          </Typography>
          <Typography fontSize={"18px"} m={"20px 0 15px"} fontWeight={"bold"}>
            Bạn sẽ học được gì?
          </Typography>
          <Stack direction={"row"} flexWrap={"wrap"} gap={"10px"}>
            {courses &&
              courses.result_courses.map((item: any) => {
                return (
                  <Stack
                    direction={"row"}
                    mt={"10px"}
                    width={"45%"}
                    gap={"8px"}>
                    <RiCheckFill color={"#f05123"} />
                    <Typography color={"#333"} fontSize={"14px"}>
                      {item}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
          
            <Typography
              fontSize={"15px"}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <b>{courses && courses.lesson.length}</b> chương{" "}
              <b style={{ fontSize: "20px" }}>•</b> {totalLesson} bài học{" "}
              <b style={{ fontSize: "20px" }}>•</b> Thời lượng{" "}
              <b>03 giờ 26 phút</b>
            </Typography>
            <Typography
              onClick={handleTongleAll}
              fontSize={"14px"}
              color={"#f05123"}
              fontWeight={"bold"}>
              {toggle ? "Mở rộng tất cả" : "Thu nhỏ tất cả"}
            </Typography>
          </Stack>

          <ListAccordion
            handleTongle={handleTongle}
            expanded={expanded}
            arr={courses && courses.lesson}
          />
          <Typography fontSize={"18px"} m={"40px 0 15px"} fontWeight={"bold"}>
            Yêu cầu
          </Typography>
          <Stack direction={"column"} flexWrap={"wrap"} gap={"10px"}>
            {courses &&
              courses.courses_requirements.map((item: any) => {
                return (
                  <Stack direction={"row"} mt={"10px"} gap={"8px"}>
                    <RiCheckFill color={"#f05123"} />
                    <Typography color={"#333"} fontSize={"14px"}>
                      {item}
                    </Typography>
                  </Stack>
                );
              })}
          </Stack>
        </Box>
        <Box
          width={"45%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}>
          <Box
            sx={{
              position: "relative",
              width: "513px",
              height: "289px",
              borderRadius: "15px",
            }}>
            <img
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "20px" }}
              src={courses && courses.image.url}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                background:
                  "linear-gradient(180deg, rgba(30, 30, 28, 0), rgba(30, 30, 28, .9))",
                borderRadius: "20px",
              }}></Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <RiYoutubeFill size={"70px"} color={"white"} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <Typography fontWeight={500} fontSize={"15px"} color={"white"}>
                Giới thiệu khóa học
              </Typography>
            </Box>
          </Box>
          <Box  sx={{
                svg: {
                  width: "30px !important",
                  height: "30px !important",
                },
              }} my={"10px"}>
          <StarRatings
                rating={star}
                starRatedColor="blue"
                numberOfStars={5}
                starSpacing="0"
                starRatedColor={"rgb(250, 175, 0)"}
                name="rating"
              />

          </Box>
          <Typography variant='h4' mb={"10px"}  color={"#f05123"}>
            {courses&&<>{courses&&courses.price==0?"Miễn phí":convertToVND(courses.price)}</>}
          </Typography>
          <Button
            onClick={handleProgress}
            sx={{
              width: "180px",
              height: "40px",
              color: "white",
              background: "#f05123",
              borderRadius: "30px",
              fontWeight: "700",
            }}>
              {paymentSuccess?"BẮT ĐẦU":<> {courses&&courses.price==0? "ĐĂNG KÝ HỌC":"MUA KHÓA HỌC"}</>}
           
          </Button>
          
    </Box>
  );
};

export default DetailCourseView;

const ListAccordion = (props: any) => {
  return (
    <>
      {props.arr &&
        props.arr.map((item: any, index: any) => {
          return (
            <Box
              onClick={() => props.handleTongle(index)}
              mt={"15px"}
              maxHeight={props.expanded[index] ? "500px" : "47px"}
              overflow={"hidden"}
              sx={{ transition: ".7s" }}>
              <Box>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"10px 20px"}
                  bgcolor={"#f5f5f5"}
                  borderRadius={"6px"}
                  border={"1px solid #ebebeb"}>
                  <Stack direction={"row"} gap={"10px"} alignItems={"center"}>
                    {props.expanded[index] ? (
                      <RiSubtractFill size={"25px"} color={"#f05123"} />
                    ) : (
                      <RiAddFill size={"25px"} color={"#f05123"} />
                    )}

                    <Typography fontWeight={"bold"}>{item.title}</Typography>
                  </Stack>
                  <Typography fontSize={"12px"}>
                    {item.sub_lesson.length}
                  </Typography>
                </Stack>
                {item.sub_lesson.map((itemchild: any, index2: any) => {
                  return (
                    <Box>
                      <Stack
                        direction={"row"}
                        borderTop={index2 == 0 ? "none" : "1px solid #dddddd"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        padding={"15px 20px"}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          gap={"7px"}>
                          {itemchild.type == "video" && (
                            <RiYoutubeFill size={"20px"} color={"#f05123"} />
                          )}

                          {itemchild.type == "blog" && (
                            <RiArticleLine size={"20px"} color={"#f05123"} />
                          )}
                          {itemchild.type == "code" && (
                            <RiPencilFill size={"20px"} color={"#f05123"} />
                          )}
                          {itemchild.type == "quiz" && (
                            <RiQuestionFill size={"20px"} color={"#f05123"} />
                          )}
                          <Typography color={"#333"} fontSize={"14px"}>
                            {itemchild.title}
                          </Typography>
                        </Stack>
                        <Typography fontSize={"12px"}>
                          {itemchild.duration}
                        </Typography>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
    </>
  );
};
