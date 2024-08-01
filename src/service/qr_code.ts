import axios from "../core/api";
export const getbanks = async () => {
  try {
    const response = await axios.get(`/qr_code/banks`);
    return response;
  } catch (error) {
    console.log(`getbanks`, error);
  }
};

export const generateQrCode = async (value: any) => {
  try {
    const response = await axios.post(`/qr_code/generate-qr`, value);
    return response;
  } catch (error) {
    console.log(`generateQrCode`, error);
  }
};
