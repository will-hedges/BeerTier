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

export const postObjToApi = (controller, obj) => {
  const apiUrl = `/api/${controller}`;
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

export const putObjToApi = (controller, obj, id) => {
  const apiUrl = `/api/${controller}/${id}`;
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

export const deleteFromApi = (controller, obj) => {
  const apiUrl = `/api/${controller}/${obj.id}`;
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
    // re-route to /beer
    deleteFromApi("beer", trimmedBeerObj).then(
      (window.location.href = "/beer")
    );
  }
};

export const deleteComment = (commentObj) => {
  const trimmedCommentObj = {
    id: commentObj.id,
    beerId: commentObj.beerId,
    content: commentObj.content,
    userProfileId: commentObj.userProfile.id,
    createDateTime: commentObj.createDateTime,
  };

  const confirmed = window.confirm(
    "Are you sure you want to delete this comment?"
  );

  if (confirmed) {
    deleteFromApi("comment", trimmedCommentObj).then(
      window.location.reload(true)
    );
  }
};

export const deleteStyle = (styleObj) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete the style "${styleObj.name}"?`
  );
  if (confirmed) {
    deleteFromApi("style", styleObj).then(window.location.reload(true));
  }
};
