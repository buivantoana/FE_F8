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
type useRoleMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
};
const schema = yup.object({
  _id: yup.string(),
  name: yup.string().required(),
 
});
export const useRoleMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
}: useRoleMutationProps) => {
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
    mutationFn: async (role: typeRole) => {
      switch (action) {
        case "CREATE":
          return await addRole({ ...role });
        case "UPDATE":
          return await updateRole(role);
        case "DELETE":
          return await deleteRole(role._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["role"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: typeRole) => {
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
