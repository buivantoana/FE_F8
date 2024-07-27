import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLessonMutation } from "@/hooks/useLessonMutation";
import { getLesson, updateArrangeLesson } from "@/service/lesson";
import SubLessonView from "./SubLessonView";
import { useSubLessonMutation } from "@/hooks/useSubLessonMutation";
import { getSubLesson } from "@/service/sub_lesson";
import { getCourses } from "@/service/courses";
import Loading from "@/components/Loading";

const SubLessonController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [typeOld, setTypeOld]: any = useState(null);
  const [typeOldLesson, setTypeOldLesson]: any = useState(null);
  const [typeExersice, setTypeExersice] = useState("html");
  const [deleteLesson, setDeleteLesson] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [valueLesson, setValueLesson] = useState("");
  const [action, setAction]: any = useState("CREATE");
  const [value, setValue] = React.useState(0);
  const [lesson, setLesson] = React.useState(null);
  const [content, setContent] = React.useState("");
  const [valueRight, setValueRight] = React.useState(0);
  const [exerciseHtml, setexerciseHtml] = React.useState("");
  const [exerciseCss, setexerciseCss] = React.useState("");
  const [exercise, setExercise]: any = useState();
  const [questionCorrect, setQuestionCorrect]: any = useState({
    correctOne: "",
    correctTwo: "",
    correctThree: "",
  });
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [dataEdit, setDataEdit]: any = useState(null);
  const [arrange, setArrange] = React.useState(null);
  const [fileVideo, setFileVideo] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    setFileVideo(file)
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };
  const toggleDrawer = (newOpen: boolean, sub_lesson?: any) => {
    if (sub_lesson) {
      setArrange(sub_lesson);
    }
    setOpenDrawer(newOpen);
  };

 
  const handleCloseModal = () => setOpenModal(false);
  const handleChangeRight = (event: React.SyntheticEvent, newValue: number) => {
    setValueRight(newValue);
  };
  const handleChangeExercise = (e: any) => {
    setExercise(e);
  };
  const handleChangeTypeExercise = (e: any) => {
    setTypeExersice(e.target.value);
  };
  const handleChangeExerciseHtml = (e: any) => {
    setexerciseHtml(e);
  };
  const handleChangeExerciseCss = (e: any) => {
    setexerciseCss(e);
  };
  const handleChangeType = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteLesson(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data: lessonEdit } = useQuery("lesson", {
    queryFn: () => getLesson(),
  });
  const { data } = useQuery("sublesson", {
    queryFn: () => getSubLesson(),
  });
  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });

  const {
    register,
    handleSubmit,
    onFinish,
    errors,
    reset,
    setValue: setValueForm,
  } = useSubLessonMutation({
    fileVideo,
    action: action,
    type: value,
    content,
    typeExersice,
    exerciseHtml,
    exerciseCss,
    exercise,
    typeOld,
    typeOldLesson,
    onSuccess: () => {
      reset();
      setTimeout(() => {
        handleCloseModal();
        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
        if (action == "UPDATE") {
          setDataEdit(null);
          setFileVideo(null)
          setVideoUrl("")
        }else{
          setFileVideo(null)
          setVideoUrl("")
        }
      }, 1000);
    },
  });
  const handleClose = () => {
    setDeleteLesson(null);
    setAnchorEl(null);
  };

  const handleOpenModal = (type: any, data: any, lesson: any) => {
    setAction(type);
    if (type == "CREATE") {
      setLesson(lesson);
      setValue(0);
      setValueLesson("");
      setContent("");
      setQuestionCorrect({
        correctOne: "",
        correctTwo: "",
        correctThree: "",
      });
      setTypeExersice("html");
      setExercise("");
      setexerciseCss("");
      setexerciseHtml("");
      reset({ title: "", duration: "", description: "" });
      setOpenModal(true);
      setVideoUrl("")
      setFileVideo(null)
    } else {
      setLesson(lessonEdit);
      setTypeOldLesson(data.lesson[0]);
      if (data.type == "video") {
        setVideoUrl(data.video_id.url)
        setValue(0);
        setTypeOld(0);
        reset({ ...data, lesson_id: data.lesson[0] });
      } else if (data.type == "quiz") {
        setContent(data.content_quizz);
        let question = JSON.parse(data.questions);
        setQuestionCorrect({
          correctOne: question[0].result,
          correctTwo: question[1].result,
          correctThree: question[2].result,
        });
        reset({
          ...data,
          lesson_id: data.lesson[0],
          answerOne: question[0].answer,
          answerTwo: question[1].answer,
          answerThree: question[2].answer,
        });
        setValue(1);
        setTypeOld(1);
      } else if (data.type == "blog") {
        setTypeOld(2);
        setValue(2);
        setContent(data.content_blog);
        reset({ ...data, lesson_id: data.lesson[0] });
      } else if (data.type == "code") {
        setTypeOld(3);
        setValue(3);
        setContent(data.content_code);

        if (Object.keys(JSON.parse(data.type_exercise)).length == 2) {
          setTypeExersice("html-css");
          for (let key in JSON.parse(data.type_exercise)) {
            if (key == "html") {
              setexerciseHtml(JSON.parse(data.type_exercise).html);
            } else {
              setexerciseCss(JSON.parse(data.type_exercise).css);
            }
          }
        } else {
          for (let key in JSON.parse(data.type_exercise)) {
            setTypeExersice(key);
            if (key == "html") {
              setexerciseHtml(JSON.parse(data.type_exercise).html);
            } else {
              setExercise(JSON.parse(data.type_exercise).javascript);
            }
          }
        }
        reset({ ...data, lesson_id: data.lesson[0] });
      }
      setDataEdit(data);
      setValueLesson(data.lesson[0]);
      setOpenModal(true);
    }
  };
  const { onRemove } = useSubLessonMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = async (value: any) => {
    setLoading(true);
    onRemove(value);
  };
  const handleArrange = async (dataArrange: any) => {
    try {
      let newArr = dataArrange.map((item: any) => item._id);
      let data = await updateArrangeLesson({
        _id: dataArrange[0].lesson[0],
        sub_lesson: newArr,
      });
      if (data?.status == 0) {
        setOpenDrawer(false);

        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <SubLessonView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data}
        lesson={lesson}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        action={action}
        deleteLesson={deleteLesson}
        valueLesson={valueLesson}
        setValueLesson={setValueLesson}
        handleEditorChange={handleEditorChange}
        value={value}
        handleChangeType={handleChangeType}
        handleChangeRight={handleChangeRight}
        handleChangeExercise={handleChangeExercise}
        handleChangeExerciseHtml={handleChangeExerciseHtml}
        handleChangeExerciseCss={handleChangeExerciseCss}
        valueRight={valueRight}
        handleChangeTypeExercise={handleChangeTypeExercise}
        typeExersice={typeExersice}
        exerciseHtml={exerciseHtml}
        exerciseCss={exerciseCss}
        exercise={exercise}
        dataEdit={dataEdit}
        content={content}
        setQuestionCorrect={setQuestionCorrect}
        questionCorrect={questionCorrect}
        courses={courses!==undefined&&courses.length>0?courses:[]}
        handleArrange={handleArrange}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
        arrange={arrange}
        handleImageChange={handleImageChange}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default SubLessonController;
