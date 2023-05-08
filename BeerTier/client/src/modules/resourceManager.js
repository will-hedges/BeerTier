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

export const deleteFromApi = (resource, obj) => {
  const apiUrl = `/api/${resource}/${obj.id}`;
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

// specific delete handlers here
// for forming specific request bodies
export const deleteBeer = (beerObj) => {
  // make sure we pass an object with the required properties
  const trimmedBeerObj = {
    id: beerObj.id,
    name: beerObj.name,
    breweryId: beerObj.brewery.id,
    createDateTime: beerObj.createDateTime,
    userProfileId: beerObj.userProfile.id,
  };

  const confirmed = window.confirm(
    "Are you sure you want to delete this beer?"
  );
  if (confirmed) {
    deleteFromApi("beer", trimmedBeerObj).then(window.location.reload(true));
  }
};
