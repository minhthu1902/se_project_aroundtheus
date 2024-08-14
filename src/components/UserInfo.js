export default class UserInfo {
  //pass in selector's as argument
  constructor({ 
    profileTitleSelector, profileDescriptionSelector,
    profileAvatarSelector }) 
  {
    this._profileTitleElement = document.querySelector(profileTitleSelector);
    this._profileDescriptionElement = document.querySelector(
      profileDescriptionSelector
    );
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);

    if (!this._profileTitleElement) {
      console.error(`Element not found for the selector: ${profileTitleSelector}`);
    }
    if (!this._profileDescriptionElement) {
        console.error(`Element not found for the selector: ${profileDescriptionSelector}`);
    }
    if (!this._profileAvatarElement) {
        console.error(`Element not found for the selector: ${profileAvatarSelector}`);
    }

  }
  getUserInfo() {
    //object with user info
    return {
      profileTitle: this._profileTitleElement.textContent,
      profileDescription: this._profileDescriptionElement.textContent,
      profileAvatar: this._profileAvatarElement.src,
    };
  }
  setUserInfo(userName, userDescription) {
    this._profileTitleElement.textContent = userName;
    this._profileDescriptionElement.textContent = userDescription;
  }
  setUserAvatar(userAvatar) {
    this._profileAvatarElement.src = userAvatar;
  }
}
