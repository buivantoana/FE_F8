
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addUserVouchers, deleteUserVouchers, updateUserVouchers } from "@/service/user_vouchers";

type useUserVouchersMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  type?:string
};
const schema = yup.object({
  _id: yup.string(),
  status: yup.boolean(),
  
});
export const useUserVouchersMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  type
}: useUserVouchersMutationProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({resolver:yupResolver(schema)});
  const { mutate, ...rest } = useMutation({
    mutationFn: async (vouchers: any) => {
      switch (action) {
        case "CREATE":
          return await addUserVouchers({ ...vouchers });
        case "UPDATE":
          return await updateUserVouchers(vouchers);
        case "DELETE":
          return await deleteUserVouchers(vouchers._id);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      
      queryClient.invalidateQueries({
        queryKey: ["user_vouchers"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: any) => {
    if(action=="CREATE"){
      mutate({type:type,body:{status:false,user_id:[values.user_id],vouchers_id:[values.vouchers_id]}});

    }else{
      mutate({...values,user_id:[values.user_id],vouchers_id:[values.vouchers_id]});
    }
  };
  const onRemove = (value: any) => {
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
