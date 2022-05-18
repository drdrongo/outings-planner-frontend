import { getJwt } from "../service/jwt";

declare global {
	interface Window {
		http: any;
	}
}

interface httpObj {
	makeRequest: Function;
	get: Function;
	post: Function;
	update: Function;
	delete: Function;
}

var http: httpObj = {
	makeRequest: () => {},
	post: () => {},
	get: () => {},
	delete: () => {},
	update: () => {},
};

function removeEmptyItems(object: object): object {
	if (!object) return {};

	Object.entries(object).forEach(([k, v]) => {
		if (v == null) {
			delete object[k as keyof object];
		}
	});
	return object;
}

http.makeRequest = async function (method: string, api: string, body: object) {
	const jwt = getJwt();

	if (api.startsWith('/')) {
		api = process.env.REACT_APP_API_BASE + api;
	}

	let jsonBody: string = '';
	const hasBody: boolean = ['POST', 'UPDATE'].includes(method) && !!body;

	if (['GET', 'DELETE'].includes(method)) {
		const params = new URLSearchParams({ ...body });
		if (params && Object.keys(params).length > 0) {
			api += ('?' + params);
		}
	} else if (hasBody) {
		body = removeEmptyItems(body);
		jsonBody = JSON.stringify(body);
	}

	const response = await fetch(api, {
		method,
		headers: {
			mode: 'cors',
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			...(jwt && { 'Authorization': jwt })
		},
		...(hasBody && { body: jsonBody }),
	}).then(response => {
    return response.json();
  })
  .catch(error => {
    return error;
  });
  
  return response;
};

http.get = async function (api: string, params: object) {
	return await http.makeRequest('GET', api, params);
};

http.post = async function (api: string, body: object) {
	return await http.makeRequest('POST', api, body);
};

http.update = async function (api: string, body: object) {
	return await http.makeRequest('UPDATE', api, body);
};

http.delete = async function (api: string, params: object) {
	return await http.makeRequest('DELETE', api, params);
};

export default http;
