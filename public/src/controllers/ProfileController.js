import BaseController from './BaseController.js';

class ProfileController extends BaseController {
  constructor(model, view, fb, tappay) {
    super(model, view, fb, tappay);
  }

  async init() {
    super.init();
    const profile = await this.fb.init();
    if (profile) {
      this.view.renderProfile(profile);
      this.view.bindClickLogoutButton(this.handleClickLogoutButton.bind(this));
    } else {
      window.location.href = '/';
    }
  }

  async handleClickLogoutButton() {
    await this.fb.logout();
    window.alert('登出成功！');
    window.location.href = '/';
  }
}

export default ProfileController;
