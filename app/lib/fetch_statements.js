import { apiURL } from "@/app/lib/general_variables";

/**
 * @param {Object} formData 
 * 
 * @returns {string|Error} - The response from the server or an error message.
 */
const send_signin_info = async (formData) => {
	const response = await fetch(apiURL + "/sign-in-forms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ data: formData }),
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return JSON.stringify(response);
	}
};

/**
 * @param {Object} formData 
 * 
 * @returns {string|Error} - The response from the server or an error message.
 */
const send_contact_info = async (formData) => {
	const response = await fetch(apiURL + "/contact-forms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ data: formData }),
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		const resJSON = await response.json();
		const { data } = resJSON;

		return JSON.stringify(data);
	}
};

const select_all_media = async () => {
	const response = await fetch(apiURL + "/portal/media?request_type=all");

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		const resJSON = await response.json();
		const { data } = resJSON;

		return data;
	}
};

const select_single_media = async (id) => {
	const response = await fetch(
		apiURL + "/portal/media?request_type=single&media_id=" + id
	);

	// if (!response.ok) {
	// 	throw new Error("Network response was not ok");
	// } else {
	// const resJSON = await response.json();
	// const { data } = resJSON;

	return response.data;
	// }
};

const get_all_media = async () => {
	const response = await select_all_media();
	const resJSON = await response.json();
	const { data } = resJSON;

	return data;
};

export default send_signin_info;

export {
	send_contact_info,
	select_all_media,
	select_single_media,
	get_all_media,
};
