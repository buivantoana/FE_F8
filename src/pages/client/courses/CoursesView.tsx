import { useCoursesContext } from "@/App";
import { convertToVND } from "@/utils/utils";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { RiGroup2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type Props = {
  data: any;
  checkRegisterCourses: any;
  handleRouter: any;
};

const CoursesView = ({ data, checkRegisterCourses, handleRouter }: Props) => {
  return (
    <>
      <Stack direction={"row"} gap={"3%"}>
        <Box
          width={"20%"}
          borderRadius={"5px"}
          height={"max-content"}
          sx={{ border: "1px solid #dddddd", padding: "25px 15px" }}
        >
          <Typography fontWeight={"bold"} fontSize={"20px"}>
            Phân loại kỹ năng:
          </Typography>
          {data[0] ? (
            <>
              {data &&
                data.length &&
                data.map((e: any) => {
                  return (
                    <Box>
                      <Box
                        mt={"10px"}
                        p={"5px 20px"}
                        sx={{
                          background:
                            "#1250dc",
                          width: "max-content",
                          color: "white",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography>{e.name}</Typography>
                      </Box>
                      <Typography mt={"7px"} fontSize={"14px"} color={"#333"}>
                        {e.description}
                      </Typography>
                    </Box>
                  );
                })}
            </>
          ) : (
            <Stack direction={"column"} gap={"15px"}>
              <Box>
                <Skeleton width="40%" height={"50px"} />
                <Skeleton
                  width="100%"
                  variant="rectangular"
                  height={"10vh"}
                  sx={{ borderRadius: "10px" }}
                />
              </Box>
              <Box>
                <Skeleton width="40%" height={"50px"} />
                <Skeleton
                  width="100%"
                  variant="rectangular"
                  height={"10vh"}
                  sx={{ borderRadius: "10px" }}
                />
              </Box>
            </Stack>
          )}
        </Box>

        <Box
          width={"70%"}
          p={"25px 45px"}
          border={"1px solid #dddddd"}
          borderRadius={"5px"}
        >
          {data[0] ? (
            <Box>
              {data &&
                data.length > 0 &&
                data.map((e: any, index: number) => {
                  return (
                    <Box
                      borderTop={index == 0 ? "none" : "1px dashed #dddddd"}
                      mt={index == 0 ? 0 : "10px"}
                      pt={index == 0 ? 0 : "10px"}
                    >
                      <Typography fontSize={20} fontWeight={"bold"}>
                        {e.name}
                      </Typography>
                      <Grid container mt={"3px"} spacing={2}>
                        {e.courses.map((item: typeCourses) => {
                          let check = false;
                          if (checkRegisterCourses && checkRegisterCourses[0]) {
                            check = checkRegisterCourses.includes(item._id);
                          }
                          return (
                            <Grid item xs={12} sm={6} md={3}>
                              <Box width={"100%"}>
                                <Box sx={{ position: "relative" }}>
                                  <img
                                    src={item.image.url}
                                    width={"100%"}
                                    style={{ borderRadius: "18px" }}
                                    alt=""
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
                                    }}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleRouter(item._id, check)
                                      }
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
                                      }}
                                    >
                                      {check ? "Tiếp tục học" : "Xem khóa học"}
                                    </Button>
                                  </Box>
                                </Box>
                                <Box mt={"10px"}>
                                  <Typography
                                    variant="h6"
                                    fontWeight={"bold"}
                                    fontSize={"16px"}
                                  >
                                    {item.title}
                                  </Typography>
                                  <Box>
                                    {item.price > 0 ? (
                                      <Stack direction={"row"} gap={1.5}>
                                        <Typography sx={{ color: "red" }}>
                                          {convertToVND(item.price)}
                                        </Typography>
                                      </Stack>
                                    ) : (
                                      <Stack direction={"row"} gap={1.5}>
                                        <Typography>Miễn phí</Typography>
                                      </Stack>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  );
                })}
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  borderBottom: "1px dashed #dddddd",
                  paddingBottom: "15px",
                }}
              >
                <Skeleton width="20%" height={"50px"} />
                <Grid container spacing={3}>
                  {Array.from({ length: 4 }, (value, index) => (
                    <Grid item xs={12} mt={"15px"} sm={6} md={3}>
                      <Box>
                        <Skeleton
                          variant="rectangular"
                          sx={{ borderRadius: "18px" }}
                          height={"15vh"}
                        />
                        <Box>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ paddingBottom: "15px" }}>
                <Skeleton width="20%" height={"50px"} />
                <Grid container spacing={3}>
                  {Array.from({ length: 4 }, (value, index) => (
                    <Grid item xs={12} mt={"15px"} sm={6} md={3}>
                      <Box>
                        <Skeleton
                          variant="rectangular"
                          sx={{ borderRadius: "18px" }}
                          height={"15vh"}
                        />
                        <Box>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default CoursesView;
