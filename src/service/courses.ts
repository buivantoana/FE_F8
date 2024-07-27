import axios from "../core/api";
export const getCourses = async () => {
  try {
    const response = await axios.get(`/courses`);
    return response.data;
  } catch (error) {
    console.log(`get_Courses`, error);
  }
};

export const searchCourses = async (search:any) => {
  try {
    const response = await axios.get(`/courses/search/${search}`);
    return response;
  } catch (error) {
    console.log(`get_Courses`, error);
  }
};
export const getOneCourses = async (id: any) => {
  try {
    console.log(id);
    const response = await axios.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_Courses`, error);
  }
};
export const getMyCourses = async (id: any) => {
  try {
    const response = await axios.get(`/courses/my_courses/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Courses`, error);
  }
};
export const addCourses = async (value: typeCourses) => {
  try {
    const response = await axios.post(`/courses`, value);
    return response.data;
  } catch (error) {
    console.log(`add_Courses`, error);
  }
};
export const updateCourses = async (value: typeCourses) => {
  try {
    const response = await axios.put(`/courses/${value._id}`, {
      title: value.title,
      description: value.description,
      price: value.price,
      image: value.image,
      instructor: value.instructor,
      category_id: value.category_id,
      result_courses: value.result_courses,
      courses_requirements: value.courses_requirements,
    });
    return response.data;
  } catch (error) {
    console.log(`update_Courses`, error);
  }
};
export const updateArrangeCourses = async (value: any) => {
  try {
    const response = await axios.put(
      `/courses/arrange/${value._id}`,
      value.lesson
    );
    return response;
  } catch (error) {
    console.log(`update_Lesson`, error);
  }
};
export const deleteCourses = async (id?: string) => {
  try {
    const response = await axios.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.log(`delete_Courses`, error);
  }
};
