import axios from "axios";

// get api all doa
export const getAllDoa = async () => {
  const res = await axios.get("https://doa-doa-api-ahmadramadhan.fly.dev/api");
  return res.data;
};
