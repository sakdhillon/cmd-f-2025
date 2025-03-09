import axios from "axios";

export const getInfo = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/profile/info`);
    console.log("Raw response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching user info:", err);
    alert(err);
    return null;
  }
};

export const getMed = async (userID, medName) => {
  try {
    const res = await axios.get(`http://localhost:8080/addmeds/edit?userID=${userID}&med=${medName}`);
    console.log("Fetched medication:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching medication:", err);
    alert(err);
    return null;
  }
};


export const addMed = async ({ inputData }) => {
  try {
    const res = await axios.post('http://localhost:8080/addmeds/add', inputData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      // Server responded with a status code other than 2xx
      console.error('Error adding medication:', err.response.data);
      return err.response.data; // You can return the error response for further use
    } else if (err.request) {
      // The request was made but no response was received
      console.error('No response received:', err.request);
    } else {
      // Something else triggered the error
      console.error('Error message:', err.message);
    }
  }
};



export const editMed = async ({ inputData }) => {
  try {
    const res = await axios.post('http://localhost:8080/addmeds/edit', inputData);
    return res.data;
  } catch (err) {
    console.error('Error adding medication:', err);
    throw err;
  }
};


module.exports = { getInfo, getMed, addMed, editMed }