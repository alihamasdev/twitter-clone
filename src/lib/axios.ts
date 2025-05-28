import { forbidden, notFound, unauthorized } from "next/navigation";
import _axios, { AxiosError } from "axios";

import { baseUrl } from "@/utils/contants";

const axios = _axios.create({
	baseURL: baseUrl,
	withCredentials: true
});

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error: AxiosError) {
		const { status } = error;

		if (status === 401) {
			return unauthorized();
		}

		if (status === 403) {
			return forbidden();
		}

		if (status === 404) {
			return notFound();
		}

		return Promise.reject(error);
	}
);

export { axios };
