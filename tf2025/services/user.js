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

module.exports = {getInfo}