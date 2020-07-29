function setHeaders() {
  if (localStorage.jwt) {
    return {
      Authorization: `Bearer ${localStorage.jwt}`,
    };
  } else {
    return null;
  }
}

function genericRequest(type, endpoint, data, onSuccess, onError) {
    fetch(endpoint, {
        method: type,
        headers: setHeaders(),
        body: JSON.stringify(data)
    })
        .then(res => onSuccess(res))
        .catch(err => onError(err))
}


module.exports = {
    get: genericRequest.bind(null, 'GET'),
    post: genericRequest.bind(null, 'POST'),
    put: genericRequest.bind(null, 'PUT'),
    delete: genericRequest.bind(null, 'DELETE')
}