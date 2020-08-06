function setHeaders(headers) {
  
  if (localStorage.jwtToken) {
    let bla =  {
      ...headers,
      Authorization: localStorage.jwtToken,
    };
    
    return bla
  } else {
    return headers;
  }
}

function genericPostPutRequest(type, endpoint, data = {}, onSuccess, onError) {
    
    fetch(endpoint, {
      method: type,
      headers: setHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    })
      .then((res) => {
        ;
        res.json().then((data) => onSuccess(data));
      })
      .catch((err) => {
        ;
        onError(err);
      });
}

function genericRequest(type, endpoint, onSuccess, onError) {
  fetch(endpoint, {
    method: type,
    headers: setHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  })
    .then((res) => {
      res.json().then((data) => onSuccess(data));
    })
    .catch((err) => {
      onError(err);
    });
}


module.exports = {
  get: genericRequest.bind(null, "GET"),
  post: genericPostPutRequest.bind(null, "POST"),
  put: genericPostPutRequest.bind(null, "PUT"),
  delete: genericRequest.bind(null, "DELETE"),
};