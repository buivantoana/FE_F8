import { useQuery } from "react-query";

import Loading from "@/components/Loading";
import React, { useState } from "react";

import { usePermissionMutation } from "@/hooks/usePermissionMutation";
import { getRolePermission } from "@/service/role_permission";
import RolePermissionView from "./RolePermissionView";
import { useRolePermissionMutation } from "@/hooks/useRolePermissionMutation";
import { getRole } from "@/service/role";
import { getPermission } from "@/service/permission";
import { SelectChangeEvent } from "@mui/material";

const RolePermissionController = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction]: any = useState("CREATE");
  const [deleteRole, setDeleteRole] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [valueRole, setValueRole] = useState("");
  const [dataRole, setDataRole] = useState([]);
  const [personName, setPersonName]: any = React.useState([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    dataDelete: any
  ) => {
    setDeleteRole(dataDelete);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useQuery("role_permission", {
    queryFn: () => getRolePermission(),
  });
  const { data: role } = useQuery("role", {
    queryFn: () => getRole(),
  });
  const { data: permission } = useQuery("permission", {
    queryFn: () => getPermission(),
  });
  const { register, handleSubmit, onFinish, errors, reset } =
    useRolePermissionMutation({
      action: action,
      personName,
      onSuccess: () => {
        reset();
        setTimeout(() => {
          handleCloseModal();
          setLoading(false);
          setPersonName([]);
        }, 1000);
      },
    });

  const handleOpenModal = (type: any, values: any) => {
    setAction(type);
    if (type == "CREATE") {
      let arr = data.map((item: any) => item.role_id[0]._id);
      let filter = role.filter((item: any) => !arr.includes(item._id));
      setValueRole("");
      setDataRole(filter);
      reset();
      setOpenModal(true);
    } else {
      setDataRole(role);
      setValueRole(values.role_id[0]._id);
      setPersonName(values.permission.map((item: any) => item._id));
      reset({ _id: values._id, role_id: values.role_id[0]._id });
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    reset();
    setOpenModal(false);
  };
  const { onRemove } = useRolePermissionMutation({
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
      <RolePermissionView
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        data={data !== undefined && data.length > 0 ? data : []}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        action={action}
        deleteRole={deleteRole}
        role={dataRole}
        permission={permission}
        setValueRole={setValueRole}
        valueRole={valueRole}
        handleChange={handleChange}
        personName={personName}
      />

      {loading && <Loading />}
    </>
  );
};

export default RolePermissionController;
