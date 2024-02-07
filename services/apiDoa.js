import axios from "axios";

// get api all doa
export const getAllDoa = async () => {
  const res = await axios.get("https://doa-doa-api-ahmadramadhan.fly.dev/api");
  return res.data;
};

// get api search
export const searchDoa = async (query) => {
  const res = await axios.get(
    "https://doa-doa-api-ahmadramadhan.fly.dev/api/doa/" + query
  );
  return res.data;
};
