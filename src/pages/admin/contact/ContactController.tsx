import { useQuery, useQueryClient } from "react-query";

import { getCategories } from "@/service/categories";
import { useCategoriesMutation } from "@/hooks/useCategoriesMutation";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import ContactView from "./ContactView";
import { getContact, updateContact } from "@/service/contact";
import { useForm } from "react-hook-form";

const ContactController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const queryClient = useQueryClient();
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

  const { data } = useQuery("contact", {
    queryFn: () => getContact(),
  });
  const { register, handleSubmit, reset } = useForm()
    
  const handleOpenModal = (type: any, data: any) => {
    setAction(type);

      reset(data);
      setOpenModal(true);
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
  const onSubmit = async(value:any) => {
    try {
        let data = await updateContact({_id:value._id,reply:value.reply})
        if(data?.status==0){
            queryClient.invalidateQueries({
                queryKey: ["contact"],
            });
            handleCloseModal()
        }
    } catch (error) {
        console.log(error);
    }
  };
  const handleDelete = (value: any) => {
    console.log(value);
    onRemove(value);
  };
  
  
  return (
    <>
      <ContactView
        register={register}
        handleSubmit={handleSubmit}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data?.status==0?data.data:[]}
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
  );
};

export default ContactController;
