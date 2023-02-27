import axios from "axios";

const fetchList = async () => {
  const URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  try {
    let response = await axios.get(URL);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      return;
    } else {
      console.log("Some error occurred. Please check your backend.Thankyou");
      return;
    }
  }
};

export { fetchList };
