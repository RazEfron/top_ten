export default function setHeaders(headers) {
  if (localStorage.jwt) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.jwt}`,
    };
  } else {
    return headers;
  }
}
