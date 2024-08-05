import { useQuery } from "react-query";
import CategoriesView from "./VouchersView";
import { getCategories } from "@/service/categories";
import { useCategoriesMutation } from "@/hooks/useCategoriesMutation";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import { Box } from "@mui/material";
import VouchersView from "./VouchersView";
import { useVouchersMutation } from "@/hooks/useVouchersMutation";
import { getVouchers } from "@/service/vouchers";

const VouchersController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [valueDiscountType, setValueDiscountType] = useState("");
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
 
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data, isFetching }:any = useQuery("vouchers", {
    queryFn: () => getVouchers(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useVouchersMutation({
      action: action,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
        }, 1000);
      },
    });
    console.log(data);
  const handleOpenModal = (type: any, data: any) => {
    setAction(type);
    if (type == "CREATE") {
      setValueDiscountType("")
      reset({code:"",description:"",end_date:"",start_date:"",discount_type:"",discount_value:0});
      setOpenModal(true);
    } else {
      setValueDiscountType(data.discount_type)
      reset(data);
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useVouchersMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = (value: any) => {
   
    onRemove(value);
  };
  return (
    <>
      
        <>
          <VouchersView
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
            valueDiscountType={valueDiscountType}
            setValueDiscountType={setValueDiscountType}
          />

          {loading && <Loading />}
        </>
      
    </>
  );
};

export default VouchersController;
