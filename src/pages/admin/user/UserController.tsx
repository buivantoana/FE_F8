import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { getRole } from "@/service/role";
import React, { useState } from "react";
import UserView from "./UserView";
import { getUser } from "@/service/auth";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useCoursesContext } from "@/App";

const UserController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deleteUser, setDeleteUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const context: any = useCoursesContext();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [valueUser, setValueUser] = useState("");

 
  const { data: role } = useQuery("role", {
    queryFn: () => getRole(),
  });
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteUser(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(context);
  const { register, handleSubmit, onFinish, errors, reset } = useAuthMutation({
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
      setOpenModal(true);
    } else {
      setValueUser(data.role);
      reset(data);
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useAuthMutation({
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
      <UserView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data !== undefined && data.length > 0 ? data.filter((item:any)=>item._id!==context.state.user[0]._id) : []}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        role={role}
        action={action}
        deleteUser={deleteUser}
        setValueUser={setValueUser}
        valueUser={valueUser}
      />

      {loading && <Loading />}
    </>
  );
};

export default UserController;
