function setHeaders(headers) {
  
  if (localStorage.jwtToken) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.jwtToken}`,
    };
  } else {
    return {};
  }
}

function genericRequest(type, endpoint, data = {}, onSuccess, onError) {
    debugger
    fetch(endpoint, {
      method: type,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        debugger
        res.json().then((data) => onSuccess(data));
        })
      .catch((err) => {
        debugger
        onError(err)});
}


module.exports = {
    get: genericRequest.bind(null, 'GET'),
    post: genericRequest.bind(null, 'POST'),
    put: genericRequest.bind(null, 'PUT'),
    delete: genericRequest.bind(null, 'DELETE')
}