export default function fetchRest(dispatch, restPath, fetchBegin, fetchSuccess, fetchFailure) {
  dispatch(fetchBegin());

  return fetch(restPath)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      dispatch(fetchSuccess(json));

      return json;
    })
    .catch(error => dispatch(fetchFailure(error)));
}
