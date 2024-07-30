import axios from "../core/api";
export const getLesson = async () => {
  try {
    const response = await axios.get(`/lesson`);
    return response.data;
  } catch (error) {
    console.log(`get_Lesson`, error);
  }
};
export const addLesson = async (value: typeLesson) => {
  try {
    const response = await axios.post(`/lesson`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Lesson`, error);
  }
};
export const updateLesson = async (value: any) => {
  try {
    const response = await axios.put(`/lesson/${value._id}`, {lesson:{
      title: value.title,
      description: value.description,
      duration: value.duration,
      courses_id: value.courses_id,
      sub_lesson: value.sub_lesson,
      
    },
    changeCourses:value.changeCourses,
    coursesOld:value.coursesOld
  });
    return response.data;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const updateArrangeLesson = async (value: any) => {
  try {
    const response = await axios.put(`/lesson/arrange/${value._id}`, value.sub_lesson);
    return response;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const deleteLesson = async (id?: string,idCourses?:string) => {
  try {
    const response = await axios.delete(`/lesson/${id}/${idCourses}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Lesson`, error);
  }
};
