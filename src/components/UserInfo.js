export default class userInfo {
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

  }
  getUserInfo() {
    //object with user info
    return {
      profileTitle: this._profileTitleElement.textContent,
      profileDescription: this._profileDescriptionElement.textContent,
      avatar: this._profileAvatarElement.src,
    };
  }
  setUserInfo(name, about) {
    this._profileTitleElement.textContent = name;
    this._profileDescriptionElement.textContent = about;
  }
  setUserAvatar(avatar) {
    if (this._profileAvatarElement) {
      this._profileAvatarElement.src = avatar;
    }
  }
}
