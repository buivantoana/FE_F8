import { addLesson, deleteLesson, updateLesson } from "@/service/lesson";
import {
  addSubLesson,
  deleteSubLesson,
  updateSubLesson,
} from "@/service/sub_lesson";
import { deleteVideo, uploadVideo } from "@/service/upload";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
type useSubLessonMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  defaultValues?: any;
  onSuccess?: () => void;
  type?: any;
  content?: any;
  typeExersice?: any;
  exerciseHtml?: any;
  exerciseCss?: any;
  exercise?: any;
  typeOld?: any;
  typeOldLesson?: any;
  fileVideo?: any;
};

export const useSubLessonMutation = ({
  action,
  defaultValues = { name: "" },
  onSuccess,
  type,
  content,
  typeExersice,
  exercise,
  exerciseCss,
  exerciseHtml,
  typeOld,
  typeOldLesson,
  fileVideo,
}: useSubLessonMutationProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (sub_lesson: any) => {
      switch (action) {
        case "CREATE":
          return await addSubLesson({ ...sub_lesson });
        case "UPDATE":
          return await updateSubLesson(sub_lesson);
        case "DELETE":
          return await deleteSubLesson(sub_lesson._id, sub_lesson.lesson[0]);
        default:
          return null;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sublesson"],
      });
      onSuccess && onSuccess();
    },
  });
  const onFinish = async (values: any) => {
    if (action == "CREATE") {
      if (type == 0) {
        const formData = new FormData();
        formData.append("video", fileVideo);
        const upload: any = await uploadVideo(formData);
        if (Object.keys(upload).length > 0) {
          mutate({
            description: values.description,
            duration: values.duration,
            source: values.source,
            title: values.title,
            type: "video",
            lesson: [values.lesson_id],
            video_id: {
              url: upload.videoUrl.secure_url,
              public_id: upload.videoUrl.public_id,
            },
          });
        }
        // video
      } else if (type == 1) {
        let question = [
          {
            answer: values.answerOne,
            result: values.correctOne,
          },
          {
            answer: values.answerTwo,
            result: values.correctTwo,
          },
          {
            answer: values.answerThree,
            result: values.correctThree,
          },
        ];
        mutate({
          description: values.description,
          duration: values.duration,
          title: values.title,
          type: "quiz",
          content_quizz: content,
          questions: JSON.stringify(question),
          lesson: [values.lesson_id],
          source: values.source,
        });
        // quizz
      } else if (type == 2) {
        // blog
        mutate({
          description: values.description,
          duration: values.duration,
          title: values.title,
          type: "blog",
          content_blog: content,
          lesson: [values.lesson_id],
          source: values.source,
        });
      } else {
        let body: any = {
          description: values.description,
          duration: values.duration,
          title: values.title,
          type: "code",
          content_code: content,
          solution_key: values.solution_key,
          lesson: [values.lesson_id],
          source: values.source,
        };
        if (typeExersice == "html") {
          body.type_exercise = JSON.stringify({ html: exerciseHtml });
        } else if (typeExersice == "html-css") {
          body.type_exercise = JSON.stringify({
            html: exerciseHtml,
            css: exerciseCss,
          });
        } else if (typeExersice == "javascript") {
          body.type_exercise = JSON.stringify({
            javascript: exercise,
          });
        } else if (typeExersice == "java") {
          body.type_exercise = JSON.stringify({
            java: exercise,
          });
        } else if (typeExersice == "python") {
          body.type_exercise = JSON.stringify({
            python: exercise,
          });
        }
        mutate(body);
      }
    } else {
      let changeType = type !== typeOld;
      let changeTypeLesson = typeOldLesson !== values.lesson_id;
      let body: any;
      if (type == 0) {
        if (fileVideo) {
          let image: any = await deleteVideo(values.video_id.public_id);
          if (image.message == "Video deleted successfully") {
            const formData = new FormData();
            formData.append("video", fileVideo);
            const upload: any = await uploadVideo(formData);
            if (Object.keys(upload).length > 0) {
              body = {
                description: values.description,
                duration: values.duration,
                title: values.title,
                source: values.source,
                type: "video",
                lesson: [values.lesson_id],
                video_id: {
                  url: upload.videoUrl.secure_url,
                  public_id: upload.videoUrl.public_id,
                },
              };
            }
          }
        } else {
          body = {
            description: values.description,
            duration: values.duration,
            title: values.title,
            source: values.source,
            type: "video",
            lesson: [values.lesson_id],
            video_id: values.video_id,
          };
        }

        // video
      } else if (type == 1) {
        let question = [
          {
            answer: values.answerOne,
            result: values.correctOne,
          },
          {
            answer: values.answerTwo,
            result: values.correctTwo,
          },
          {
            answer: values.answerThree,
            result: values.correctThree,
          },
        ];
        body = {
          description: values.description,
          duration: values.duration,
          title: values.title,
          type: "quiz",
          content_quizz: content,
          source: values.source,
          questions: JSON.stringify(question),
          lesson: [values.lesson_id],
        };

        // quizz
      } else if (type == 2) {
        // blog
        body = {
          description: values.description,
          duration: values.duration,
          title: values.title,
          source: values.source,
          type: "blog",
          content_blog: content,
          lesson: [values.lesson_id],
        };
      } else {
        body = {
          description: values.description,
          duration: values.duration,
          title: values.title,
          type: "code",
          content_code: content,
          source: values.source,
          solution_key: values.solution_key,
          lesson: [values.lesson_id],
        };
        if (typeExersice == "html") {
          body.type_exercise = JSON.stringify({ html: exerciseHtml });
        } else if (typeExersice == "html-css") {
          body.type_exercise = JSON.stringify({
            html: exerciseHtml,
            css: exerciseCss,
          });
        } else if (typeExersice == "javascript") {
          body.type_exercise = JSON.stringify({
            javascript: exercise,
          });
        } else if (typeExersice == "python") {
          body.type_exercise = JSON.stringify({
            python: exercise,
          });
        } else if (typeExersice == "java") {
          body.type_exercise = JSON.stringify({
            java: exercise,
          });
        }
      }

      body._id = values._id;
      if (changeType) {
        if (changeTypeLesson) {
          mutate({
            body,
            change: true,
            changeLesson: true,
            lessonIdOld: typeOldLesson,
          });
        } else {
          mutate({ body, change: true, changeLesson: false });
        }
      } else {
        if (changeTypeLesson) {
          mutate({
            body,
            change: false,
            changeLesson: true,
            lessonIdOld: typeOldLesson,
          });
        } else {
          mutate({ body, change: false, changeLesson: false });
        }
      }
    }
  };
  const onRemove = (sub_lesson: any) => {
    mutate(sub_lesson);
  };
  return {
    register,
    onFinish,
    onRemove,
    handleSubmit,
    errors,
    reset,
    setValue,
  };
};
