import React, { useState } from "react";
import CoursesView from "./CoursesView";
import { useCoursesMutation } from "@/hooks/useCoursesMutation";
import { useQuery } from "react-query";
import { getCourses } from "@/service/courses";
import Loading from "@/components/Loading";
import { getCategories } from "@/service/categories";
import { deleteImage, deleteVideo } from "@/service/upload";
import { deleteCourses } from "../../../service/courses";

import { Box } from "@mui/material";
const CoursesController = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [deleteCourses, setDeleteCourses] = useState(null);
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [valueCategory, setValueCategory] = useState("");
  const handleCloseModal = () => setOpenModal(false);
  const [action, setAction]: any = useState("CREATE");
  const [resultCourses, setResultCourses]: any = useState([]);
  const [resultCoursesEdit, setResultCoursesEdit]: any = useState(null);
  const [textResultCourses, setTextResultCourses]: any = useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [coursesRequirements, setCoursesRequirements]: any = useState([]);
  const [CoursesRequirementsEdit, setCoursesRequirementsEdit]: any =
    useState(null);
  const [textCoursesRequirements, setTextCoursesRequirements]: any =
    useState("");
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteCourses(dataDelete);
    setAnchorEl(event.currentTarget);
  };

  const { data, isFetching } = useQuery("courses", {
    queryFn: () => getCourses(),
  });
  
  const { data: category } = useQuery("categories", {
    queryFn: () => getCategories(),
  });

  const { register, handleSubmit, onFinish, errors, reset } =
    useCoursesMutation({
      file,
      action: action,
      resultCourses,
      coursesRequirements,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          setResultCourses([]);
          handleCloseModal();
          setLoading(false);
          setFile(null);
          setImageUrl("");
        }, 1000);
      },
    });
  const handleClose = () => {
    setDeleteCourses(null);
    setAnchorEl(null);
  };

  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      setResultCourses([]);
      setCoursesRequirements([]);
      setValueCategory("");
      reset({
        title: "",
        instructor: "",
        price: 0,
        description: "",
        category_id: "",
      });
      setImageUrl("");
      setOpenModal(true);
    } else {
      setCoursesRequirements(data.courses_requirements);
      setResultCourses(data.result_courses);
      setImageUrl(data.image.url);
      setValueCategory(data.category_id[0]._id);

      reset({ ...data, category_id: data.category_id[0]._id });
      setOpenModal(true);
    }
  };
  const { onRemove } = useCoursesMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
      setLoading(false);
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = async (value: any) => {
    setLoading(true);

    try {
      let image: any = await deleteImage(value.image.public_id);
      if (image.imageUrl.result == "ok") {
        value.lesson.map((item: any) => {
          item.sub_lesson.map(async (i: any) => {
            if (i.type == "video") {
              await deleteVideo(i.video_id.public_id);
            }
          });
        });
        onRemove(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResultCourses = () => {
    if (resultCoursesEdit !== null) {
      let arr = resultCourses.map((item: any, index: number) =>
        index == resultCoursesEdit ? textResultCourses : item
      );

      setResultCourses(arr);
      setTextResultCourses("");
      setResultCoursesEdit(null);
    } else {
      setResultCourses([...resultCourses, textResultCourses]);
      setTextResultCourses("");
    }
  };
  const handleDeleteResultCourses = (index: number) => {
    setResultCourses(resultCourses.filter((item: any, i: any) => i !== index));
  };
  const handleEditResultCourses = (index: number) => {
    setResultCoursesEdit(index);
    setTextResultCourses(resultCourses[index]);
  };

  const handleCoursesRequirements = () => {
    if (CoursesRequirementsEdit !== null) {
      let arr = coursesRequirements.map((item: any, index: number) =>
        index == CoursesRequirementsEdit ? textCoursesRequirements : item
      );

      setCoursesRequirements(arr);
      setTextCoursesRequirements("");
      setCoursesRequirementsEdit(null);
    } else {
      setCoursesRequirements([...coursesRequirements, textCoursesRequirements]);
      setTextCoursesRequirements("");
    }
  };
  const handleDeleteCoursesRequirements = (index: number) => {
    setCoursesRequirements(
      coursesRequirements.filter((item: any, i: any) => i !== index)
    );
  };
  const handleEditCoursesRequirements = (index: number) => {
    setCoursesRequirementsEdit(index);
    setTextCoursesRequirements(coursesRequirements[index]);
  };

  return (
    <>
     
        <>
          <CoursesView
            register={register}
            handleSubmit={handleSubmit}
            onFinish={onFinish}
            errors={errors}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            openModal={openModal}
            data={data!==undefined&&data.length>0?data:[]}
            onSubmit={onSubmit}
            handleDelete={handleDelete}
            handleClick={handleClick}
            handleClose={handleClose}
            id={id}
            anchorEl={anchorEl}
            open={open}
            action={action}
            setFile={setFile}
            category={category}
            deleteCourses={deleteCourses}
            valueCategory={valueCategory}
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
            setValueCategory={setValueCategory}
            setTextResultCourses={setTextResultCourses}
            textResultCourses={textResultCourses}
            handleResultCourses={handleResultCourses}
            resultCourses={resultCourses}
            handleDeleteResultCourses={handleDeleteResultCourses}
            handleEditResultCourses={handleEditResultCourses}
            resultCoursesEdit={resultCoursesEdit}
            setTextCoursesRequirements={setTextCoursesRequirements}
            textCoursesRequirements={textCoursesRequirements}
            handleCoursesRequirements={handleCoursesRequirements}
            coursesRequirements={coursesRequirements}
            handleDeleteCoursesRequirements={handleDeleteCoursesRequirements}
            handleEditCoursesRequirements={handleEditCoursesRequirements}
            CoursesRequirementsEdit={CoursesRequirementsEdit}
          />
          {loading && <Loading />}
        </>
      
    </>
  );
};

export default CoursesController;
