import { useQuery } from "react-query";

import Loading from "@/components/Loading";
import { useRoleMutation } from "@/hooks/useRoleMutation";
import { getRole } from "@/service/role";
import React, { useState } from "react";

import PermissionView from "./PermissionView";
import { usePermissionMutation } from "@/hooks/usePermissionMutation";
import { getPermission } from "@/service/permission";

const PermissionController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deletePermission, setDeletePermission] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeletePermission(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useQuery("permission", {
    queryFn: () => getPermission(),
  });
  console.log(data);
  const { register, handleSubmit, onFinish, errors, reset } =
    usePermissionMutation({
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
      reset({ name: "" });
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
  const { onRemove } = usePermissionMutation({
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
      <PermissionView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data != undefined && data.length > 0 ? data : []}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        action={action}
        deletePermission={deletePermission}
      />

      {loading && <Loading />}
    </>
  );
};

export default PermissionController;
