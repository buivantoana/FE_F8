import Loading from "@/components/Loading";
import { useLocalStorage } from "@/hooks/useStorage";
import { getOneCourses } from "@/service/courses";
import {
  getProgress,
  updateCertificate,
  updateProgress,
} from "@/service/progress";
import { calculateProgress, convertToVND, getCurrentDate, roundToOneDecimal } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentController from "./CommentController";
import LearningView from "./LearningView";
import NoteController from "./NoteController";
import html2canvas from "html2canvas";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import certificate from "../../../images/certificate (1).png";
import confetti from "canvas-confetti";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { addNotify } from "@/service/notify";
import { addTransactions } from "@/service/transactions";
import { updateRewardWallet } from "@/service/wallet";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "50px",
  borderRadius: "10px",
  height: "90vh",
};
const LearningController = () => {
  const queryClient = useQueryClient();
  const { id }: any = useParams();
  const [toggle, setToggle] = useState(true);
  const [totalLesson, setTotalLesson] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);
  const [dataLesson, setDataLesson]: any = useState({});
  const [typeCode, setTypeCode]: any = useState(null);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState(false);
  const playedRef: any = useRef(0);
  const [loading, setLoading]: any = useState(false);
  const [detail, setDetail]: any = useState({});
  const [timeVideo, setTimeVideo]: any = useState("");
  const [expanded, setExpanded]: any = useState([]);
  const [progressBar, setprogressBar]: any = useState([]);
  const [totalProgressBar, setTotalprogressBar]: any = useState(0);
  const [openNote, setOpenNote] = useState(false);
  const [nameCertificate, setNameCertificate] = useState("");
  const [checkCertificate, setCheckCertificate] = useState("");
  const captureRef: any = useRef();
  const toggleDrawerNote = (newOpen: boolean) => () => {
    setOpenNote(newOpen);
  };
  const [openDirection, setOpenDirection] = useState(false);
  const toggleDrawerDirection = (newOpen: boolean) => () => {
    setOpenDirection(newOpen);
  };
  const player: any = useRef(null);
  const [user, setUser] = useLocalStorage("user", {});
  const [loadingAll, setLoadingAll] = useState({
    courses: false,
    progress: false,
  });

  const navigate = useNavigate();
  const [openCertificate, setOpenCertificate] = useState(false);
  const handleOpenCertificate = () => {
    setOpenCertificate(true);
  };
  const handleCloseCertificate = () => {
    setOpenCertificate(false);
  };
  const { data: progress } = useQuery(["progress", id], {
    queryFn: () => {
      return getProgress(user.data[0]._id, id);
    },
    onSuccess(data) {
      if (data[0]) {
        let total = 0;
        data[0].lesson_progress.map((item: any) => {
          item.sub_lesson.map(() => total++);
        });   
        const percentagePerItem = roundToOneDecimal(100 / total) ;     
        setTotalprogressBar(percentagePerItem);  
       
      } else {
        navigate("/");
      }
    },
    refetchOnWindowFocus: false,
  });

  
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getOneCourses(id && id);
    },
    onSuccess(data) {
      setTimeout(() => {
        setLoadingAll({ ...loadingAll, courses: true });
      }, 500);

      let arr = [...Array(data.lesson.length).fill(false)];
      setDetail(data);
      let total = 0;
      data.lesson.map((item: any, index: number) => {
        item.sub_lesson.map((itemChild: any, index2: number) => {
          if (progress) {
            if (
              progress[0].lesson_progress[index].sub_lesson[index2].result &&
              progress[0] &&
              progress[0].lesson_progress[index].sub_lesson[index2].completed ==
                false
            ) {
              arr[index] = true;
              setExpanded(arr);
              setActiveLesson(itemChild._id);
              setDataLesson(itemChild);
              // if (itemChild.type == "blog") {
              //   setDone(true);
              // }
              if (itemChild.type == "code") {
                if (
                  Object.keys(JSON.parse(itemChild.type_exercise)).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(itemChild.type_exercise)) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
            if (progress[0].completed) {
              arr[0] = true;
              setExpanded(arr);
              setActiveLesson(
                progress[0].lesson_progress[0].sub_lesson[0].sub_lesson_id
              );
              setDataLesson(data.lesson[0].sub_lesson[0]);
              // if (data.lesson[0].sub_lesson[0].type == "blog") {
              //   setDone(true);
              // }
              if (data.lesson[0].sub_lesson[0].type == "code") {
                if (
                  Object.keys(
                    JSON.parse(data.lesson[0].sub_lesson[0].type_exercise)
                  ).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(
                    data.lesson[0].sub_lesson[0].type_exercise
                  )) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
          }
        });

        return (total += item.sub_lesson.length);
      });

      setTotalLesson(total);
    },

    refetchOnWindowFocus: false,
  });
  const handleTongle = (index: number) => {
    setExpanded((prevExpanded: any) =>
      prevExpanded.map((item: any, idx: any) => (idx === index ? !item : item))
    );
  };
  const handleTongleAll = () => {
    if (toggle) {
      setExpanded(Array(courses && courses.lesson.length).fill(true));
      setToggle(false);
    } else {
      setExpanded(Array(courses && courses.lesson.length).fill(false));
      setToggle(true);
    }
  };
  const handleActiveLesson = (data: any) => {
    setActiveLesson(data._id);
    setDataLesson(data);
    if (data.type == "blog") {
      setDone(true);
    }
    if (data.type == "code") {
      if (Object.keys(JSON.parse(data.type_exercise)).length == 2) {
        setTypeCode("html-css");
      } else {
        for (let key in JSON.parse(data.type_exercise)) {
          if (key == "html") {
            setTypeCode("html");
          } else {
            setTypeCode("javascript");
          }
        }
      }
    }
  };

  // xu ly video
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "videoCurrentTime",
        JSON.stringify(playedRef.current)
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playedRef.current]);

  const handleProgress = (state: any) => {
    if (playedRef.current !== state.played) {
      const minutes = Math.floor(state.playedSeconds / 60);
      const seconds = Math.ceil(state.playedSeconds % 60);
      setTimeVideo(
        minutes < 10
          ? `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
          : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
      );
    }
  };

  const handleEnded = () => {
    setDone(true);
    setPlaying(false);
  };

  const handleNextLesson = async () => {
    setLoading(true);
    let check_lesson_passed = false;
    progress[0].lesson_progress.map((item: any) => {
      item.sub_lesson.map((i: any) => {
        if (i.sub_lesson_id == activeLesson) {
          if (i.completed && i.result) {
            check_lesson_passed = true;
          }
        }
      });
    });
    try {
      if (progress[0].completed) {
        completionCourse();
        setLoading(false);
      } else {
        if (check_lesson_passed) {
          completionCourse();
          setLoading(false);
        } else {
          if (done) {
            courseNotCompleted();
          } else {
            toast.success("Bạn chưa hoàn thành bài học");
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const completionCourse = () => {
    progress[0].lesson_progress.map((item: any, index: number) => {
      item.sub_lesson.map((itemChild: any, index2: number) => {
        if (activeLesson == itemChild.sub_lesson_id) {
          let length = progress[0].lesson_progress[index].sub_lesson.length - 1;
          let lengthLesson = progress[0].lesson_progress.length - 1;
          if (lengthLesson == index && length == index2) {
            true;
          } else {
            if (length == index2) {
              expanded[index + 1] = true;
              setExpanded(expanded);
              setActiveLesson(
                progress[0].lesson_progress[index + 1].sub_lesson[0]
                  .sub_lesson_id
              );
              setDataLesson(courses.lesson[index + 1].sub_lesson[0]);
            } else {
              setActiveLesson(
                progress[0].lesson_progress[index].sub_lesson[index2 + 1]
                  .sub_lesson_id
              );
              setDataLesson(courses.lesson[index].sub_lesson[index2 + 1]);

              if (courses.lesson[index].sub_lesson[index2 + 1].type == "code") {
                if (
                  Object.keys(
                    JSON.parse(
                      courses.lesson[index].sub_lesson[index2 + 1].type_exercise
                    )
                  ).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(
                    courses.lesson[index].sub_lesson[index2 + 1].type_exercise
                  )) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
          }
        }
      });
    });
  };
  const courseNotCompleted = async () => {
    let arr = progress;
    let arrCheck: any[] = [];
    progress[0].lesson_progress.forEach((item_test: any) => {
      item_test.sub_lesson.forEach((i: any) => {
        if (
          (i.completed === false && i.result === true) ||
          (i.completed === false && i.result === false)
        ) {
          arrCheck.push(i);
        }
      });
    });

    progress[0].lesson_progress.map((item: any, index: number) => {
      item.sub_lesson.map((itemChild: any, index2: number) => {
        if (activeLesson == itemChild.sub_lesson_id) {
          let length = progress[0].lesson_progress[index].sub_lesson.length - 1;
          let lengthLesson = progress[0].lesson_progress.length - 1;
          if (arrCheck.length == 1) {
            arr[0].completed = true;
            handleOpenCertificate();
          }

          if (lengthLesson == index && length == index2) {
            arr[0].lesson_progress[index].sub_lesson[index2].completed = true;
            arr[0].lesson_progress[index].completed = true;
          } else {
            if (length == index2) {
              expanded[index + 1] = true;
              setExpanded(expanded);
              arr[0].lesson_progress[index].completed = true;
              arr[0].lesson_progress[index].sub_lesson[index2].completed = true;
              arr[0].lesson_progress[index + 1].sub_lesson[0].result = true;
              setActiveLesson(
                arr[0].lesson_progress[index + 1].sub_lesson[0].sub_lesson_id
              );
              setDataLesson(courses.lesson[index + 1].sub_lesson[0]);
              if (courses.lesson[index + 1].sub_lesson[0].type == "blog") {
                setDone(true);
              } else {
                setDone(false);
              }
            } else {
              setActiveLesson(
                arr[0].lesson_progress[index].sub_lesson[index2 + 1]
                  .sub_lesson_id
              );
              setDataLesson(courses.lesson[index].sub_lesson[index2 + 1]);
              arr[0].lesson_progress[index].sub_lesson[index2 + 1].result =
                true;
              if (courses.lesson[index].sub_lesson[index2 + 1].type == "blog") {
                setDone(true);
              } else {
                setDone(false);
              }
              arr[0].lesson_progress[index].sub_lesson[index2].completed = true;
              if (courses.lesson[index].sub_lesson[index2 + 1].type == "code") {
                if (
                  Object.keys(
                    JSON.parse(
                      courses.lesson[index].sub_lesson[index2 + 1].type_exercise
                    )
                  ).length == 2
                ) {
                  setTypeCode("html-css");
                } else {
                  for (let key in JSON.parse(
                    courses.lesson[index].sub_lesson[index2 + 1].type_exercise
                  )) {
                    if (key == "html") {
                      setTypeCode("html");
                    } else {
                      setTypeCode("javascript");
                    }
                  }
                }
              }
            }
          }
        }
      });
    });

    if (dataLesson.type == "video" && done) {
      try {
        let data = await updateProgress(arr[0]);
        if (data?.status == 0) {
          setprogressBar([Math.round((progressBar[0] += totalProgressBar))]);
          queryClient.invalidateQueries({
            queryKey: ["progress", "detail"],
          });
        }
      } catch (error) {}

      setLoading(false);
    }
    if (dataLesson.type == "blog") {
      try {
        let data = await updateProgress(arr[0]);
        if (data?.status == 0) {
          setprogressBar([Math.round((progressBar[0] += totalProgressBar))]);
          queryClient.invalidateQueries({
            queryKey: ["progress", "detail"],
          });

          setLoading(false);
        }
      } catch (error) {}
    }
    if (dataLesson.type == "code") {
      let data = await updateProgress(arr[0]);
      setprogressBar([Math.round((progressBar[0] += totalProgressBar))]);
      queryClient.invalidateQueries({
        queryKey: ["progress", "detail"],
      });
      setLoading(false);
    }
    if (dataLesson.type == "quiz") {
      try {
        let data = await updateProgress(arr[0]);
        if (data?.status == 0) {
          setprogressBar([Math.round((progressBar[0] += totalProgressBar))]);
          queryClient.invalidateQueries({
            queryKey: ["progress", "detail"],
          });

          setLoading(false);
        }
      } catch (error) {}
    }
    if (arrCheck.length == 1) {
      setprogressBar([100])
    }
  };

  const handleCertificate = async () => {
    try {
      let data = await updateCertificate({
        user_name: nameCertificate,
        date_certificate: getCurrentDate(),
        status_certificate: checkCertificate,
        _id: progress[0]._id,
      });
      if (data?.status == 0) {
        if (courses.price > 0) {
          let price = (10 / 100) * courses.price;
          let wallet = await updateRewardWallet({
            user_id: user.data[0]._id,
            amount: price,
          });
          await addNotify({
            user_id: [user.data[0]._id],
            title: `Bạn nhận đựơc ${convertToVND(price)} vào ví.`,
            message:
              "Chúc mừng bạn đã hoàn thành xuất sắc khóa học bạn được hoàn lại 10% giá trị tiền khóa học.",
            url: "/my_wallet",
            read: false,
          });
          await addTransactions({
            user_id: [user.data[0]._id],
            type: "reward",
            status: "completed",
            amount: price,
            note: `Phần thuởng hoàn thành khóa học ${courses.title}.`,
          });
        }
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: any, max: any) {
          return Math.random() * (max - min) + min;
        }

        var interval: any = setInterval(function () {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
        queryClient.invalidateQueries({
          queryKey: ["progress"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCapture = async () => {
    const element: any = captureRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "capture.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      {loadingAll.courses && loadingAll.progress ? (
        <>
          <LearningView
            courses={courses && courses}
            expanded={expanded}
            handleTongle={handleTongle}
            handleTongleAll={handleTongleAll}
            toggle={toggle}
            activeLesson={activeLesson}
            handleActiveLesson={handleActiveLesson}
            dataLesson={dataLesson}
            typeCode={typeCode}
            progress={progress}
            handleProgress={handleProgress}
            handleEnded={handleEnded}
            player={player}
            playing={playing}
            played={playedRef.current}
            handleNextLesson={handleNextLesson}
            done={done}
            loading={loading}
            setDone={setDone}
            progressBar={progressBar}
            totalProgressBar={totalProgressBar}
            toggleDrawerNote={toggleDrawerNote}
            timeVideo={timeVideo}
            setPlaying={setPlaying}
            navigate={navigate}
            toggleDrawerDirection={toggleDrawerDirection}
            openDirection={openDirection}
            setOpenDirection={setOpenDirection}
            handleOpenCertificate={handleOpenCertificate}
          />
          <CommentController lesson_id={activeLesson} courses_id={id} />
          <NoteController
            lesson_id={activeLesson}
            courses_id={id}
            toggleDrawerNote={toggleDrawerNote}
            openNote={openNote}
          />
          <Modal
            open={openCertificate}
            onClose={handleCloseCertificate}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'>
            <Box sx={{ ...style, overflowY: "scroll", overflowX: "hidden" }}>
              <Typography variant='h6' fontWeight={"bold"}>
                Nhận chứng chỉ 🎉
              </Typography>
              <Typography my={"10px"}>
                Fdemyghi nhận sự nỗ lực của bạn! Bằng cách nhận chứng chỉ này,
                bạn chính thức hoàn thành khóa học <b>{courses.title}</b>
              </Typography>
              <Box
                ref={captureRef}
                position={"relative"}
                sx={{
                  pointerEvents: progress[0].status_certificate
                    ? "none"
                    : "auto",
                }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 390,
                    left: 0,
                    width: "100%",
                  }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}>
                    {courses.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 480,
                    left: 208,
                    width: "100%",
                  }}>
                  <Typography>{getCurrentDate()}</Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 280,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    height: "80px",
                    ".css-1eed5fa-MuiInputBase-root-MuiInput-root": {},
                    ".css-1eed5fa-MuiInputBase-root-MuiInput-root::after": {
                      border: "none",
                    },
                    ".css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                      border: "none",
                    },
                    ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "3.5rem",
                      textAlign: "center",
                    },
                    ".css-1eed5fa-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before":
                      {
                        border: "none",
                      },
                  }}
                >
                 { progress[0].status_certificate? <Typography sx={{ fontFamily: "'Great Vibes', cursive",
                      fontSize: "3.5rem",textAlign: "center"}}>{progress[0].user_name}</Typography>:
                  <TextField
                    value={
                     
                       
                       nameCertificate
                    }
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const words = inputValue.split(" ");

                      for (let i = 0; i < words.length; i++) {
                        if (words[i].length > 0) {
                          words[i] =
                            words[i][0].toUpperCase() +
                            words[i].substring(1).toLowerCase();
                        }
                      }
                      setNameCertificate(words.join(" "));
                    }}
                    placeholder="Nhập họ và tên"
                    variant="standard"
                    autoComplete="off"
                    sx={{
                      height: "100%",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  />}
                </Box>
                <img src={certificate} width={"100%"} alt='' />
              </Box>
              {progress[0].status_certificate ? (
                <Button
                  sx={{
                    background:
                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                    color: "white",

                height: "34px",
                mt: 1,
                mr: 1,
                float:"right"
              }} onClick={handleCapture}><RiDownloadCloud2Line size={"20px"} /> Tải xuống</Button>
              ) : (
                <Box display={"flex"} flexDirection={"column"} gap={"15px"}>
                  <FormControlLabel
                    value={checkCertificate}
                    onChange={(e: any) => setCheckCertificate(e.target.checked)}
                    control={<Checkbox />}
                    label='Bạn không thể chỉnh sửa lại chứng chỉ khi đã ấn xác nhận'
                    labelPlacement='end'
                  />
                  <Button
                    onClick={handleCertificate}
                    disabled={
                      nameCertificate && checkCertificate ? false : true
                    }
                    sx={{
                      background:
                        "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                      color: "white",

                      height: "34px",
                      mt: 1,
                      mr: 1,
                    }}>
                    Xác nhận
                  </Button>
                </Box>
              )}
            </Box>
          </Modal>
        </>
      ) : (
        <Box>
          <Skeleton width="100%" sx={{ mt: "-20px" }} height={"90px"} />
          <Stack direction={"row"} gap={"1%"}>
            <Box width={"74%"}>
              <Skeleton width="100%" variant="rectangular" height={"60vh"} />
              <Skeleton width="100%" height={"39vh"} sx={{ mt: "-20px" }} />
            </Box>
            <Box width={"25%"}>
              <Skeleton width="100%" variant="rectangular" height={"90vh"} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default LearningController;