import axios from "axios";

const SendAxiosMsg = async (method, url, options) => {
    try {
        if (method === "get") {
            return await axios.get(url);
        } else {
            const formData = new FormData();

            const keys = Object.keys(options);

            keys.forEach(key => {
                formData.append(key, options[key]);
            });

            return await axios.post(url, formData);
        }
    } catch (error) { console.log(error); }

};

export default SendAxiosMsg;
