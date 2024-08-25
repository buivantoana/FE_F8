
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addVouchers, deleteVouchers, updateVouchers } from "@/service/vouchers";
type useVouchersMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
};
const schema = yup.object({
  _id: yup.string(),
  code: yup.string().required(),
  description: yup.string().required(),
  start_date:yup.string().required(),
  end_date:yup.string().required(),
  discount_type:yup.string().required(),
  discount_value:yup.number().required(),
});
export const useVouchersMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
}: useVouchersMutationProps) => {
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
    mutationFn: async (vouchers: any) => {
      switch (action) {
        case "CREATE":
          return await addVouchers({ ...vouchers });
        case "UPDATE":
          return await updateVouchers(vouchers);
        case "DELETE":
          return await deleteVouchers(vouchers._id);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: any) => {
    mutate({...values,discount_value:Number(values.discount_value)});
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
