const _apiUrl = "/api/beer";

export const getAllBeers = () => {
  return fetch(_apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("An unknown error occurred while trying to get beers.");
    }
  });
};
