export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //profile and avatar
  async getProfile() {
    return fetch(this._baseUrl + "/users/me/", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  async patchProfileAvatar(newLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newLink,
      }),
    }).then(this._checkResponse);
  }
  //update profile info
  async patchProfile(nameVar, bioVar) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    }).then(this._checkResponse);
  }
  //CARD ROUTES
  // get all cards
  async getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  //create new card
  async postCards(name, link) {
    console.log("Sending data:", { name, link });
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }
  async deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  async likeCardStatus(cardID, isLiked) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
          ...this._headers,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    } catch (err) {
      console.error(`Failed to update like status: ${err.message}`);
      throw err; // Rethrow to handle in the caller function
    }
  }

  // async cardLikeStatus(cardID, isLiked) {
  //     return (fetch( this._baseUrl + `/cards/${cardID}/likes`,
  //         {
  //           method: isLiked ?"DELETE" : "PUT",
  //           headers: {
  //             authorization: this._headers.authorization,
  //             "Content-Type": "application/json",
  //           },
  //         })
  //         .then((res) => {
  //           if (res.ok)
  //             return res.json();
  //           return Promise.reject(`Like Error:  + ${res.status}`);
  //         })
  //         .catch((err) => {
  //           console.error("PUT Like Error:", err);
  //         })
  //       );
  // }

  //     async cardUnlikeStatus(cardId) {
  //         return (fetch
  //           (this._baseUrl + `/cards/${cardId}/likes`,
  //             {
  //               method: "DELETE",
  //               headers: {
  //                 authorization: this._headers.authorization,
  //                 "Content-Type": "application/json",
  //               },
  //             })
  //             .then((res) => {
  //               if (res.ok)
  //                 return res.json();
  //               return Promise.reject(`Error: ${res.status}`);
  //             })
  //             .catch((err) => {
  //               console.error("DELETE Unlike Error: ", err);
  //             })
  // );
  //     }
}
