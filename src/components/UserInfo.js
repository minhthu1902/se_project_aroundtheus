export default class UserInfo {
  //pass in selector's as argument
  constructor(profileTitleSelector, profileDescriptionSelector) {
    this._profileTitleElement = document.querySelector(profileTitleSelector);
    this._profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileTitleElement.textContent,
      description: this._profileDescriptionElement.textContent,
    };
  }
  setUserInfo(userName, userDescription) {
    this._profileTitleElement.textContent = userName;
    this._profileDescriptionElement.textContent = userDescription;
  }
}
