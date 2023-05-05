import { getToken } from "./authManager";

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

export const postObjToApi = (resource, obj) => {
  const apiUrl = `/api/${resource}`;
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          `An unknown error happened while sending a POST to ${apiUrl}`
        );
      }
    });
  });
};

export const putObjToApi = (resource, obj, id) => {
  const apiUrl = `/api/${resource}/${id}`;
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          `An unknown error happened while sending a PUT to ${apiUrl}`
        );
      }
    });
  });
};

export const deleteFromApi = (resource, obj, id) => {
  const apiUrl = `/api/${resource}/${id}`;
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          `An unknown error occurred while sending a DELETE to ${apiUrl}`
        );
      }
    });
  });
};
