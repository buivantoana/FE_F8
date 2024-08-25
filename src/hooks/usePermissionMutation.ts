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
type usePermissionMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
};
const schema = yup.object({
  _id: yup.string(),
  name: yup.string().required(),
 
});
export const usePermissionMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
}: usePermissionMutationProps) => {
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
    mutationFn: async (permission: typePermission) => {
      switch (action) {
        case "CREATE":
          return await addPermission({ ...permission });
        case "UPDATE":
          return await updatePermission(permission);
        case "DELETE":
          return await deletePermission(permission._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permission"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: typePermission) => {
    mutate(values);
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
