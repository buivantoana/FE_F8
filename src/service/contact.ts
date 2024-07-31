import axios from "../core/api";
export const getContact = async () => {
  try {
    const response = await axios.get(`/contact`);
    return response;
  } catch (error) {
    console.log(`get_Contact`, error);
  }
};
;
export const addContact = async (value: any) => {
  try {
    const response = await axios.post(`/contact`, value);
    return response;
  } catch (error) {
    console.log(`add_Contact`, error);
  }
};
export const updateContact = async (value: any) => {
  try {
    const response = await axios.put(`/contact/${value._id}`, {
      reply: value.reply,
     
    });
    return response;
  } catch (error) {
    console.log(`update_Contact`, error);
  }
};

