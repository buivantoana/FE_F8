import {
  addCategories,
  deleteCategories,
  updateCategories,
} from "@/service/categories";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addRole, deleteRole, updateRole } from "@/service/role";
import { addPermission, deletePermission, updatePermission } from "@/service/permission";
import { addRolePermission, deleteRolePermission, updateRolePermission } from "@/service/role_permission";
type useRolePermissionMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  personName?:any
};
const schema = yup.object({
  _id: yup.string(),
  role_id: yup.string().required(),
 
});
export const useRolePermissionMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  personName,
}: useRolePermissionMutationProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, ...rest } = useMutation({
    mutationFn: async (permission: typeRolePermission) => {
      switch (action) {
        case "CREATE":
          return await addRolePermission({ ...permission });
        case "UPDATE":
          return await updateRolePermission(permission);
        case "DELETE":
          return await deleteRolePermission(permission._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role_permission"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: typeRolePermission) => {
    
    mutate({...values,permission:personName});
  };
  const onRemove = (value: any) => {
    console.log(value);
    mutate(value);
  };
  return {
    register,
    onFinish,
    onRemove,
    handleSubmit,
    errors,
    reset,
  };
};
