import { addLesson, deleteLesson, updateLesson } from "@/service/lesson";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
type useLessonMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  coursesOld?:any
  
};
const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  duration: yup.number().required(),
  courses_id: yup.string(),
});
export const useLessonMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  coursesOld
  
}: useLessonMutationProps) => {
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
    mutationFn: async (lesson: typeLesson) => {
      switch (action) {
        case "CREATE":
          return await addLesson({ ...lesson });
        case "UPDATE":
          return await updateLesson(lesson);
        case "DELETE":
          return await deleteLesson(lesson._id,lesson.courses_id[0]._id);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: typeLesson) => {
    
    if(action=="CREATE"){
      mutate({...values,courses_id:[values.courses_id], sub_lesson:[]})
    }else{
      if(coursesOld===values.courses_id){
        mutate({...values,courses_id:[values.courses_id],changeCourses:false})
      }else{
        mutate({...values,courses_id:[values.courses_id],changeCourses:true,coursesOld})
      }
      
    }
   
  
  };
  const onRemove = (lesson: typeLesson) => {
    mutate(lesson);
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
