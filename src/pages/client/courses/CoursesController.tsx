import { useQuery } from "react-query";
import CoursesView from "./CoursesView";

import { getCategoriesCourses } from "@/service/categories";
import { useNavigate } from "react-router-dom";
import { useCoursesContext } from "@/App";

const CoursesController = () => {
  const { data } = useQuery("courses_categories", {
    queryFn: () => getCategoriesCourses(),
  });
  const navigate = useNavigate();
  const context: any = useCoursesContext();
  let checkRegisterCourses =
    Object.keys(context.state).length > 0 &&
    context.state.progress &&
    context.state.progress.length &&
    context.state.progress.map((item: any) => item.courses_id[0]);
  const handleRouter = (id: any, check: any) => {
    if (check) {
      navigate(`/learning/${id}`);
    } else {
      navigate(`/courses/${id}`);
    }
  };
  return (
    <>
      <CoursesView
        data={data !== undefined ? data : []}
        checkRegisterCourses={checkRegisterCourses}
        handleRouter={handleRouter}
      />
    </>
  );
};

export default CoursesController;
