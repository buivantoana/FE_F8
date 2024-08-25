import {
  addCategories,
  deleteCategories,
  updateCategories,
} from "@/service/categories";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Signin, Signup, updateUSer } from "@/service/auth";
import { useLocalStorage } from "./useStorage";
import { io } from "socket.io-client";
type useAuthMutationProps = {
  action: "SIGNIN" | "SIGNUP" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: (data: any) => void;
};
const schemaSignup = yup.object({
  user_name: yup.string().required(),
  email: yup.string().required(),
});
const schemaSignin: any = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});
export const useAuthMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
}: useAuthMutationProps) => {
  const queryClient = useQueryClient();
  const [, setUser] = useLocalStorage("user", {});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(action == "SIGNIN" ? schemaSignin : schemaSignup),
  });
  const socket = io("ws://localhost:4000");
  const { mutate, ...rest } = useMutation({
    mutationFn: async (auth: any) => {
      switch (action) {
        case "SIGNIN":
          return await Signin({ ...auth });
        case "SIGNUP":
          return await Signup(auth);
        case "UPDATE":
          return await updateUSer(auth);

        default:
          return null;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      if (action == "UPDATE") {
       
        socket.emit("editPermission", { id: data._id });
      } else {
        if (action == "SIGNIN") {
          if (Object.keys(data)[0]) {
            setUser(data);
          }
        } else {
          if (data.token && data.refeshToken) {
            setUser(data);
          }
        }
      }
      onSuccess && onSuccess(data);
    },
  });
  const onFinish = async (values: any) => {
    if (action == "UPDATE") {
      mutate({role:values.role_id,email:values.email,_id:values._id,user_name:values.user_name})
    } else {
      if (values.type == "google") {
        mutate(values);
      } else {
        (values.type = "email"), mutate(values);
      }
    }
  };
  const onRemove = (categories: typeAuth) => {
    mutate(categories);
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
