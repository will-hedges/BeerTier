export const getAll = (resource) => {
  const apiUrl = `/api/${resource}`;

  return fetch(`/api/${resource}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(
        `An unknown error occurred while sending a GET to ${apiUrl}`
      );
    }
  });
};

export const getById = (resource, id) => {
  const apiUrl = `/api/${resource}/${id}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(
        `An unknown error occurred while sending a GET to ${apiUrl}`
      );
    }
  });
};
