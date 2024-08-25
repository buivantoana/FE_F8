import { addCourses, deleteCourses, updateCourses } from "@/service/courses";
import { deleteImage, uploadImage } from "@/service/upload";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
type useCoursesMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  file?: any;
  resultCourses?: any;
  coursesRequirements?: any;
};
const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  instructor: yup.string().required(),
  category_id: yup.string(),
});
export const useCoursesMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  file,
  resultCourses,
  coursesRequirements,
}: useCoursesMutationProps) => {
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
    mutationFn: async (courses: typeCourses) => {
      switch (action) {
        case "CREATE":
          return await addCourses({ ...courses });
        case "UPDATE":
          return await updateCourses(courses);
        case "DELETE":
          return await deleteCourses(courses._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: typeCourses) => {
    if (action === "CREATE") {
      const formData = new FormData();
      formData.append("image", file);
      const upload: any = await uploadImage(formData);
      if (Object.keys(upload).length > 0) {
        mutate({
          ...values,
          image: {
            url: upload.imageUrl.secure_url,
            public_id: upload.imageUrl.public_id,
          },
          category_id: [values.category_id],
          students: [],
          lesson: [],
          rating: 0,
          result_courses: resultCourses,
          courses_requirements: coursesRequirements,
        });
      }
    } else {
      if (file === null) {
        mutate({
          ...values,
          category_id: [values.category_id],
          result_courses: resultCourses,
          courses_requirements: coursesRequirements,
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
              category_id: [values.category_id],
              image: {
                url: upload.imageUrl.secure_url,
                public_id: upload.imageUrl.public_id,
              },
              result_courses: resultCourses,
              courses_requirements: coursesRequirements,
            });
          }
        }
      }
    }
  };
  const onRemove = (courses: typeCourses) => {
    mutate(courses);
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
