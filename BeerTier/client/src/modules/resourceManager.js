export const getAll = (controller) => {
  const apiUrl = `/api/${controller}`;

  return fetch(`/api/${controller}`, {
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

export const getById = (controller, id) => {
  const apiUrl = `/api/${controller}/${id}`;

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
