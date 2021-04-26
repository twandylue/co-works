import api from './Api.js';

class Fb {
  constructor() {
    this.jwtToken = undefined;
  }

  loadSdk() {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  async init() {
    await new Promise((resolve) => {
      window.fbAsyncInit = resolve;
      this.loadSdk();
    });

    window.FB.init({
      appId: '700590737403665',
      cookie: true,
      xfbml: true,
      version: 'v10.0',
    });

    const response = await new Promise((resolve) => {
      window.FB.getLoginStatus(resolve);
    });

    return await this.handleLoginStatus(response);
  }

  async login() {
    const response = await new Promise((resolve) => {
      window.FB.login(resolve, { scope: 'public_profile,email' });
    });
    return await this.handleLoginStatus(response);
  }

  async handleLoginStatus(response) {
    if (response.status === 'connected') {
      const { data } = await api.signin({
        provider: 'facebook',
        access_token: response.authResponse.accessToken,
      });
      this.jwtToken = data.access_token;
      const profile = data.user;
      return profile;
    }
  }

  async logout() {
    await new Promise((resolve) => {
      window.FB.logout(resolve);
    });
  }
}

export default Fb;
