export const postFetch = (data) => {
  const res = fetch(data?.api, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data?.data),
  }).then((response) => response.json());

  return res;
};
