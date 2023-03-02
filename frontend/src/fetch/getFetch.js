export const getFetch = async (api) => {
  var res = await fetch(api, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response?.message);
      }
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
};
