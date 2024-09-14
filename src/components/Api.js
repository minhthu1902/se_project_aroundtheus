export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //profile and avatar
  async getProfile() {
    return fetch(this._baseUrl + "/users/me/", {
      method: "GET",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log("Error");
        return Promise.reject(`Error : ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        return result;
      });
    // .catch((err) => console.error(err));
  }

  async patchProfileAvatar(newLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newLink,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status} + ${res.message}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //update profile info
  async patchProfile(nameVar, bioVar) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
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
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error getting initial cards: ${res.status}`);
    });
  }
  //create new card
  async postCards(name, link) {
    console.log("Sending data:", { name, link });
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log("Card created successfully:", result);
        return result;
      })
      .catch((err) => {
        console.error("POST Card Error:", err);
      });
  }
  async deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      });
  }
  async likeCardStatus(cardID, isLiked) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
          authorization: this._headers.authorization,
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
  //           );
  //     }
}
