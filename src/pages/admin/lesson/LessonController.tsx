import React, { useState } from "react";
import LessonView from "./LessonView";
import { useQuery, useQueryClient } from "react-query";
import { getCourses, updateArrangeCourses } from "@/service/courses";
import { useLessonMutation } from "@/hooks/useLessonMutation";
import { getLesson } from "@/service/lesson";
import Loading from "@/components/Loading";

const LessonController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [coursesOld, setCoursesOld] = React.useState(null);
  const [valueCourses, setValueCourses] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [action, setAction]: any = useState("CREATE");
  const [arrange, setArrange] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const toggleDrawer = (newOpen: boolean, sub_lesson?: any) => {
    if (sub_lesson) {
      setArrange(sub_lesson);
    }
    setOpenDrawer(newOpen);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteLesson(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data } = useQuery("lesson", {
    queryFn: () => getLesson(),
  });

  const { data: courses } = useQuery("courses", {
    queryFn: () => getCourses(),
  });
  const { register, handleSubmit, onFinish, errors, reset } = useLessonMutation(
    {
      action: action,
      coursesOld,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
          queryClient.invalidateQueries({
            queryKey: ["courses"],
          });
        }, 1000);
      },
    }
  );
  const handleClose = () => {
    setDeleteLesson(null);
    setAnchorEl(null);
  };

  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      setValueCourses("");
      reset({
        title: "",
        duration: 0,
        description: "",
      });
      setOpenModal(true);
    } else {
      setCoursesOld(data.courses_id[0]);
      setValueCourses(data.courses_id[0]);
      reset({ ...data, courses_id: data.courses_id[0] });
      setOpenModal(true);
    }
  };
  const { onRemove } = useLessonMutation({
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
      let data = await updateArrangeCourses({
        _id: dataArrange[0].courses_id[0],
        lesson: newArr,
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
      <LessonView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        action={action}
        courses={courses!==undefined&&courses.length>0?courses:[]}
        deleteLesson={deleteLesson}
        valueCourses={valueCourses}
        setValueCourses={setValueCourses}
        toggleDrawer={toggleDrawer}
        openDrawer={openDrawer}
        arrange={arrange}
        handleArrange={handleArrange}
      />
    </>
  );
};

export default LessonController;
