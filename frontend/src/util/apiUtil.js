function setHeaders(headers) {
  if (localStorage.jwtToken) {
    return {
      ...headers,
      Authorization: localStorage.jwtToken,
    };
  } else {
    return { ...headers, language: localStorage.language };
  }
}

function genericFetchRequset(type, endpoint, data = {}, onSuccess, onError) {
  debugger;
  let params = {
    method: type,
    headers: setHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: data,
  };

  if (type === "GET") {
    delete params.body;
  } else if (
    (type === "POST" || type === "PUT") &&
    !endpoint.startsWith("/dish")
  ) {
    params.body = JSON.stringify(data);
  } else {
    params.headers = setHeaders({});
  }

  return fetch(endpoint, params)
    .then((res) => res.json().then((data) => onSuccess(data)))
    .catch((err) => onError(err));
}

module.exports = {
  get: genericFetchRequset.bind(null, "GET"),
  post: genericFetchRequset.bind(null, "POST"),
  put: genericFetchRequset.bind(null, "PUT"),
  delete: genericFetchRequset.bind(null, "DELETE"),
};
