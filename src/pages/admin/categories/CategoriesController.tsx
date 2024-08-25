import { useQuery } from "react-query";
import CategoriesView from "./CategoriesView";
import { getCategories } from "@/service/categories";
import { useCategoriesMutation } from "@/hooks/useCategoriesMutation";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import { Box } from "@mui/material";

const CategoriesController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteCategory(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data, isFetching } = useQuery("categories", {
    queryFn: () => getCategories(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useCategoriesMutation({
      action: action,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
        }, 1000);
      },
    });
  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      reset({ name: "", description: "" });
      setOpenModal(true);
    } else {
      reset(data);
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useCategoriesMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = (value: any) => {
    console.log(value);
    onRemove(value);
  };
  return (
    <>
      
        <>
          <CategoriesView
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
            deleteCategory={deleteCategory}
          />

          {loading && <Loading />}
        </>
      
    </>
  );
};

export default CategoriesController;
