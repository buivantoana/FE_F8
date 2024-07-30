import axios from "../core/api";
export const getNote = async () => {
  try {
    const response = await axios.get(`/note`);
    return response;
  } catch (error) {
    console.log(`get_note`, error);
  }
};
export const getNoteLessonAndCourses = async (value:any) => {
  try {
    const response = await axios.get(`/note/${value.courses_id}/${value.lesson_id}/${value.user_id}`);
    return response;
  } catch (error) {
    console.log(`get_note`, error);
  }
};
export const addNote = async (value: any) => {
  try {
    const response = await axios.post(`/note`, value);
    return response;
  } catch (error) {
    console.log(`add_note`, error);
  }
};
export const updateNote = async (value: any) => {
  try {
    const response = await axios.put(`/note/${value._id}`, {
      courses_id: value.courses_id,
      sub_lesson_id: value.sub_lesson_id,
      content: value.content,
      user_id: value.user_id,
      time: value.time,
    });
    return response;
  } catch (error) {
    console.log(`update_note`, error);
  }
};
export const deleteNote = async (id?: string) => {
  try {
    const response = await axios.delete(`/note/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_note`, error);
  }
};
