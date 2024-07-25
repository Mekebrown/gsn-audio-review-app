import { apiURL } from "@/app/lib/general_variables";

export const send_signin_info = async (formData) => {
	const response = await fetch(apiURL + "/signin", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return JSON.stringify(response);
	}
};

export const select_all_media = async () => {
	const response = await fetch(apiURL + "/portal/media?request_type=all");

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return response.media;
	}
};

export const send_contact_info = async (formData) => {
	for (let ind of formData) {
		if (ind in ["name", "email", "subject"]) {
			formData.append(ind, ind.value);
		} else if (ind === "subjectDropdown") {
			formData.append("subject_cat", ind.subjectDropdown);
		} else if (ind === "contactMsg") {
			formData.append("message", ind.contactMsg);
		}
	}

	// Send the info and retrieve response
	const response = await fetch(apiURL + "/contact", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	} else {
		return JSON.stringify(response);
	}
};

export const get_all_media = async () => {
	const response = await select_all_media();

	return response;
};
