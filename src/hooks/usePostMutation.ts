import { addPost, deletePost, updateActivePost, updatePost } from "@/service/post";
import { deleteImage, uploadImage } from "@/service/upload";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { useLocalStorage } from "./useStorage";
type usePostMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE" | "ACTIVE";
  defaultValues?: any;
  onSuccess?:any;
  file?: any;
  content?: any;
};
const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  readers: yup.string().required(),
});
export const usePostMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  file,
  content,
}: usePostMutationProps) => {
  const queryClient = useQueryClient();
  const [user, setUser]: any = useLocalStorage("user", {});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, ...rest } = useMutation({
    mutationFn: async (post: any) => {
      switch (action) {
        case "CREATE":
          return await addPost({ ...post });
        case "ACTIVE":
          return await updateActivePost(post);
        case "UPDATE":
          return await updatePost(post);
        case "DELETE":
          return await deletePost(post._id);
        default:
          return null;
      }
    },
    onSuccess: (data:any) => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      onSuccess && onSuccess(data);
    },
  });
  const onFinish = async (values: any) => {
    if (action === "CREATE") {
      const formData = new FormData();
      formData.append("image", file);
      const upload: any = await uploadImage(formData);
      if (Object.keys(upload).length > 0) {
        mutate({
          ...values,
          content: content,
          image: {
            url: upload.imageUrl.secure_url,
            public_id: upload.imageUrl.public_id,
          },
          author: [user.data[0]._id],
          active: false,
          notify:false
        });
      }
    } else {
      if (file === null) {
        mutate({
          ...values,
          content: content,
        });
      } else {
        let image: any = await deleteImage(values.image.public_id);
        if (image.imageUrl.result == "ok") {
          const formData = new FormData();
          formData.append("image", file);
          const upload: any = await uploadImage(formData);
          if (Object.keys(upload).length > 0) {
            mutate({
              ...values,
              content: content,
              image: {
                url: upload.imageUrl.secure_url,
                public_id: upload.imageUrl.public_id,
              },
            });
          }
        }
      }
    }
  };
  const onRemove = (post: any) => {
    mutate(post);
  };
  const onActive = (post: any) => {
    mutate(post);
  };
  return {
    register,
    onFinish,
    onRemove,
    handleSubmit,
    errors,
    reset,
    onActive,
  };
};
